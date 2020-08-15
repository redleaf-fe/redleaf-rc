declare interface baseProps {
  [key: string]: any;
}

declare interface IPagination {
  current: number | string;
  totalItem: number | string;
  pageSize: number | string;
}
