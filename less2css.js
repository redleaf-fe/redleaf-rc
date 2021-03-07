const fs = require("fs");
const through2 = require("through2");

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
    // 用css替换less
    file.contents = Buffer.from(file.contents.toString().replace(/\.less';/g, ".css';"));
    this.push(file);
    cb();
  });
};
