import React from 'react';

const Comp: React.FC = props => {
  return (
    <input
      onChange={e => {
        // 如果没有这一句，form就不会接收到值
        props?.onChange({ value: e.target.value, other: 'custom' });
      }}
    />
  );
};

export default Comp;
