import { baseProps } from "../types";

export interface PanelProps extends baseProps {
  value: any;
  setValue: ({
    value,
    panelType,
    changeType,
  }: {
    value?: any;
    panelType?: string;
    changeType?: string;
  }) => void;
}
