import React from 'react';
import { DateTime } from 'redleaf-rc';

import '../../doc.less';

const DateTime1 = () => (
  <>
    <DateTime type="time" className="block mb8" />
    <DateTime type="date" className="block mb8" />
    <DateTime type="month" className="block mb8" />
    <DateTime type="year" className="block mb8" />
    <DateTime type="date-time" className="block mb8" />
  </>
);

export default () => <DateTime1 />;
