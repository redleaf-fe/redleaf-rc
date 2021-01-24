import React from 'react';
import { ConfigProvider } from 'redleaf-rc';

import '../../doc.less';

const GrandChildComp2 = () => {
  return (
    <ConfigProvider.Consumer>
      {val => {
        return (
          <div style={{ color: val.color }}>
            <p>name: {val.obj.name}</p>
            <p>age: {val.obj.age}</p>
          </div>
        );
      }}
    </ConfigProvider.Consumer>
  );
};

const ChildComp2 = () => <GrandChildComp2 />;

const ConfigProvider2 = () => {
  return (
    <>
      <ConfigProvider.Provider color="red" obj={{ name: 'aa', age: 11 }}>
        <ChildComp2 />
      </ConfigProvider.Provider>
      <ConfigProvider.Provider color="orange" obj={{ name: 'bb', age: 22 }}>
        <ChildComp2 />
      </ConfigProvider.Provider>
    </>
  );
};

export default () => <ConfigProvider2 />;
