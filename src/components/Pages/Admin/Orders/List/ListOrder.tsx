import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { IOption } from 'components/Shared/DropdownMenu';
import TableCellActions from 'components/Shared/Pagination/TableCellActions';
import IOrder from 'interfaces/models/order';
import EditIcon from 'mdi-react/EditIcon';
import React, { memo, useMemo, useCallback } from 'react';

interface IProps {
  order: IOrder;
  onEdit: (order: IOrder) => void;
}

const ListOrders = memo((props: IProps) => {
  const { order, onEdit } = props;

  const handleEdit = useCallback(() => {
    onEdit(order);
  }, [onEdit, order]);

  const options = useMemo<IOption[]>(() => {
    return [{ text: 'Visualizar', icon: EditIcon, handler: handleEdit }];
  }, [handleEdit]);

  return (
    <TableRow>
      <TableCell>{order.name}</TableCell>
      <TableCell>{order.description}</TableCell>
      <TableCell>{order.quantity}</TableCell>
      <TableCell>{order.value}</TableCell>
      <TableCellActions options={options} />
    </TableRow>
  );
});

export default ListOrders;
