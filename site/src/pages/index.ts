import { lazy } from "react";

export { default as Customize } from "./customize";
export { default as Statement } from "./statement";

export const Bubble = lazy(() => import("./bubble"));
export const Button = lazy(() => import("./button"));
export const ConfigProvider = lazy(() => import("./config-provider"));
export const Input = lazy(() => import("./input"));
export const Loading = lazy(() => import("./loading"));
export const Message = lazy(() => import("./message"));
export const Popover = lazy(() => import("./popover"));
export const Pagination = lazy(() => import("./pagination"));
export const Select = lazy(() => import("./select"));
// export const Table = lazy(() => import("./table"));

