import React from 'react';
import { Input } from 'redleaf-rc';
import '../../doc.less';

const Input2 = () => {
  return (
    <>
      <div className="mb8">
        <Input type="password" placeholder="输入密码" />
      </div>
      <div className="mb8">
        <Input type="int" placeholder="输入整数" />
      </div>
    </>
  );
};

export default () => <Input2 />;
