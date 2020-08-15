const marked = require("marked");
const _template = require("lodash/template");
const fs = require("fs");
const prettier = require("prettier");
const through2 = require("through2");

const templ = fs.readFileSync("./doc-templ.tpl").toString();

module.exports = function markdown() {
  return through2.obj(function (file, encoding, cb) {
    // 如果文件为空，不做任何操作，转入下一个操作
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    // 插件不支持对stream直接操作，抛出异常
    if (file.isStream()) {
      this.emit("error");
      return cb();
    }
    const obj = marked.lexer(file.contents.toString());
    const list = obj.map(render);
    const renders = [];
    const nav = [];
    const imports = [];
    const components = [];
    list.forEach((v) => {
      const type = toString.call(v);
      if (type === "[object String]") {
        renders.push(v);
        // 右边导航
        const matchRes = v.match(/<h3 id="(.+?)">/)
        if(matchRes){
          nav.push(`<a className="right-nav" href="#${matchRes[1]}">${matchRes[1]}</a>`)
        }
      } else if (type === "[object Object]") {
        if (v.type === "code") {
          if (v.lang === "import") {
            imports.push(v.text);
          } else if (v.lang === "component") {
            components.push(v.text.split('// --')[1]);
            const comp = v.text.match("<!--(.+?)-->");
            comp &&
              renders.push(
                `<CodeViewer source={\`${
                  v.text
                }\`}><${comp[1].trim()} /></CodeViewer>`
              );
          }
        }
      }
    });
    const compiled = _template(templ);
    const source = prettier.format(
      compiled({
        imports: imports.join("\n"),
        components: components.join("\n"),
        renders: [...renders, `<div className="right-nav-contain">${nav.join("\n")}</div>`].join("\n"),
      })
    );
    file.contents = Buffer.from(source);
    this.push(file);
    cb();
  });
};

function render(item) {
  const { type, depth, text, ordered, header, cells } = item;
  switch (type) {
    case "heading":
      return depth === 3
        ? `<h3 id="${text}">${text}</h3>`
        : `<h${depth}>${text}</h${depth}>`;
    case "code":
      return item;
    case "paragraph":
      return renderGroup(item, "tokens").join("\n");
    case "list":
      const listWrap = ordered ? "ol" : "ul";
      return `<${listWrap}>\n${renderGroup(item, "items").join(
        "\n"
      )}\n</${listWrap}>`;
    case "table":
      return `<table className="table">\n<thead>\n<tr>${header
        .map((v) => `<th>${v}</th>`)
        .join("\n")}</tr>\n</thead>\n<tbody>${cells
        .map((v) => `<tr>${v.map((vv) => `<td>${vv}</td>`).join("\n")}</tr>`)
        .join("\n")}</tbody>\n</table>`;
    case "space":
      return `<br />`;
    default:
      return "";
  }

  function renderGroup(item, key) {
    return item[key].map(renderParagraphItem);

    function renderParagraphItem(v) {
      const { type, text, href } = v;
      switch (type) {
        case "strong":
          return `<strong>${text}</strong>`;
        case "text":
          return `<span>${text}</span>`;
        case "link":
          return `<a target="_blank" href="${href}" rel="noopener onreferrer">${text}</a>`;
        case "codespan":
          return `<span className="codespan">${text}</span>`;
        case "list_item":
          return `<li>${text.replace(/\n/g, "")}</li>`;
        default:
          return "";
      }
    }
  }
}
