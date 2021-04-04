import React from 'react';
import { Button, Dialog } from 'redleaf-rc';

import '../../doc.less';

const Dialog1 = () => (
  <>
    {/* <Dialog>asdasdasd</Dialog> */}
    <Button
      onClick={() => {
        Dialog.show({
          content: 'asdasdasd',
        });
      }}
    >
      open
    </Button>
  </>
);

export default () => <Dialog1 />;
