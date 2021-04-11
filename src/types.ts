export interface baseProps {
  [key: string]: any;
}

// 公用类型
export type popPosition =
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
export type cssTextAlign =
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify";
