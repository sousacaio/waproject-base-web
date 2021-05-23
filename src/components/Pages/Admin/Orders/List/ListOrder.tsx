import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IOrder from 'interfaces/models/order';
import React, { memo } from 'react';

interface IProps {
  order: IOrder;
}

const ListOrders = memo((props: IProps) => {
  const { order } = props;
  return (
    <TableRow>
      <TableCell>{order.name}</TableCell>
      <TableCell>{order.description}</TableCell>
      <TableCell>{order.quantity}</TableCell>
      <TableCell>{order.value}</TableCell>
    </TableRow>
  );
});

export default ListOrders;
