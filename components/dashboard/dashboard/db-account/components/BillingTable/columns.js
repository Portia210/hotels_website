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
    header: 'Product',
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
      const date = dayjs(props.getValue()).format('DD/MM/YYYY');
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
    accessorKey: 'isActive',
    header: 'Active',
    size: 50,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      const isActive = props.getValue();
      if (isActive) return <i className="bi bi-check-lg text-success"></i>;
      return <i className="bi bi-x-lg text-danger"></i>;
    },
  },
  {
    accessorKey: 'billingCycle',
    header: 'Billing Cycle',
    size: 50,
    meta: {
      headerAlign: 'center',
      align: 'center',
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
