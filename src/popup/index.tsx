import React, { ReactNode, ReactElement, useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import Trigger, { TriggerProps } from '../trigger';
import Bubble, { BubbleProps } from '../bubble';
import Button from '../button';
import { baseProps } from '../types';
import { prefixCls } from '../constants';

import './style.less';

export interface PopupProps extends baseProps {
  children: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  triggerProps?: Omit<TriggerProps, 'children' | 'content'>;
  bubbleProps?: Omit<BubbleProps, 'children'>;
}

const Popup = (props: PopupProps): ReactElement => {
  const { bubbleProps, triggerProps, children, onOk, onCancel } = props;
  const [visible, setVisible] = useState(false);

  return (
    <Trigger
      {...triggerProps}
      onShow={() => {
        setVisible(true);
      }}
      onHide={() => {
        setVisible(false);
      }}
      visible={visible}
      content={
        <Bubble
          {...bubbleProps}
          className={cls(`${prefixCls}-popup-content`, bubbleProps?.className)}
        >
          <Button
            style={{ marginRight: '16px' }}
            onClick={() => {
              onOk?.();
              setVisible(false);
            }}
          >
            确定
          </Button>
          <Button
            type="default"
            onClick={() => {
              onCancel?.();
              setVisible(false);
            }}
          >
            取消
          </Button>
        </Bubble>
      }
    >
      {children}
    </Trigger>
  );
};

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  triggerProps: PropTypes.object,
  bubbleProps: PropTypes.object
};

Popup.defaultProps = {
  triggerProps: {
    type: 'click',
    topOffset: '-10px'
  }
};

export default Popup;
