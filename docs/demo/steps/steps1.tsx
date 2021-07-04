import React from 'react';
import { Steps } from 'redleaf-rc';

import datasets from './data';
import '../../doc.less';

const Steps1 = () => <Steps datasets={datasets} />;

export default () => <Steps1 />;
