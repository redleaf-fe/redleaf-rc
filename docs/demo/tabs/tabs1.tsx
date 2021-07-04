import React from 'react';
import { Tabs } from 'redleaf-rc';

import datasets from './data';
import '../../doc.less';

const Tabs1 = () => <Tabs datasets={datasets} />;

export default () => <Tabs1 />;
