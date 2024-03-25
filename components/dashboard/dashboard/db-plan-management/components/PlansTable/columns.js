import TableActions from './TableActions';

export const getColumns = () => [
  {
    header: '#',
    size: 50,
    cell: props => {
      const pageIndex = props.table.getState()?.pagination?.pageIndex || 0;
      return <span>{props.row.index + pageIndex + 1}</span>;
    },
  },
  {
    accessorKey: 'label',
    header: 'Name',
    size: 100,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <span>{props.getValue()}</span>;
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    size: 100,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <span>{props.getValue() + ' ₪'}</span>;
    },
  },
  {
    accessorKey: 'position',
    header: 'Position',
    size: 50,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <span>{props.getValue()}</span>;
    },
  },
  {
    accessorKey: 'isDefault',
    header: 'Default Plan',
    size: 50,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      if (props.getValue()) {
        return (
          <span className="badge bg-success text-white text-14">
            <i className="bi bi-check2"></i>
          </span>
        );
      }
    },
  },
  {
    accessorKey: 'isPromo',
    header: 'Promo Plan',
    size: 50,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      if (props.getValue()) {
        return (
          <span className="badge bg-success text-white text-14">
            <i className="bi bi-check2"></i>
          </span>
        );
      }
    },
  },
  {
    accessorKey: 'isCustomOffer',
    header: 'Custom Offer',
    size: 50,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      if (props.getValue()) {
        return (
          <span className="badge bg-success text-white text-14">
            <i className="bi bi-check2"></i>
          </span>
        );
      }
    },
  },
  {
    header: 'Actions',
    size: 100,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <TableActions row={props?.row?.original}/>;
    },
  },
];
