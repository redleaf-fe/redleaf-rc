interface baseProps {
  [key: string]: any;
}

// 公用类型
type popPosition =
  | "topCenter"
  | "leftCenter"
  | "rightCenter"
  | "bottomCenter"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";

// 公用css类型
type cssTextAlign = "start" | "end" | "left" | "right" | "center" | "justify";
