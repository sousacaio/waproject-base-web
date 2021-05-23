import Toolbar from 'components/Layout/Toolbar';
import React, { Fragment, memo } from 'react';

const SampleOrder = memo((props: {}) => {
  return (
    <Fragment>
      <Toolbar title='Pedidos' />
    </Fragment>
  );
});
export default SampleOrder;
