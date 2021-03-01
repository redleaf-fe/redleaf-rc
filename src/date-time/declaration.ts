export interface PanelProps extends baseProps {
  value: any;
  uncontrolled: string;
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
