interface baseProps {
  [key: string]: any;
}

interface IPagination {
  current: number | string;
  totalItem: number | string;
  pageSize: number | string;
}
