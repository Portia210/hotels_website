import dayjs from 'dayjs';
import BillingTableActions from './BillingTableActions';

export const getColumns = () => [
  {
    header: '#',
    size: 50,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <span>{props?.row?.index + 1}</span>;
    },
  },
  {
    accessorKey: 'items',
    header: 'Item',
    size: 100,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      const items = props.getValue();
      return <span>{items?.planName}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    size: 100,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      const date = dayjs(props.getValue()).format('DD/MM/YYYY HH:mm:ss');
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: 'sum',
    header: 'Sum',
    size: 50,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      const row = props.row.original;
      const firstItemPrice = row?.items?.product_price || 0;
      return <span>{firstItemPrice} ₪</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Payment Status',
    size: 50,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      const isSuccess = props.getValue() === 'SUCCESS';
      if (isSuccess)
        return (
          <button className="btn badge rounded-pill text-bg-success text-12">
            Paid
          </button>
        );
      return (
        <button className="btn badge rounded-pill text-bg-danger text-12">
          Fail
        </button>
      );
    },
  },
  {
    header: 'Action',
    size: 100,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <BillingTableActions row={props?.row} />;
    },
  },
];
