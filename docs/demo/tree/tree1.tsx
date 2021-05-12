import React from 'react';
import { Tree } from 'redleaf-rc';

import treeData from './data';
import '../../doc.less';

const Tree1 = () => (
  <Tree
    datasets={treeData}
    defaultValue="Rodentia"
    onOpen={({ meta }) => {
      console.log(meta, 'open');
    }}
    onClose={({ meta }) => {
      console.log(meta, 'close');
    }}
    onChange={({ meta }) => {
      console.log(meta, 'active');
    }}
  />
);

export default () => <Tree1 />;
