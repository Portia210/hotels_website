import dayjs from 'dayjs';
import TableActions from './TableActions';
import { UserStatus } from '@/utils/roleCheck';
import useUserPlanStore from '@/store/useUserPlansStore';

export const columns = [
  {
    header: '#',
    size: 50,
    cell: props => {
      const pageIndex = props.table.getState()?.pagination?.pageIndex || 0;
      return <span>{props.row.index + pageIndex + 1}</span>;
    },
  },
  {
    header: 'Full name',
    size: 200,
    cell: props => {
      const firstName = props.row.original.firstName;
      const lastName = props.row.original.lastName;
      const fullName = `${firstName} ${lastName}`;
      return <span>{fullName}</span>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 200,
    cell: props => {
      return <span>{props.getValue()}</span>;
    },
  },
  {
    accessorKey: 'agentNumber',
    header: 'Agent Number',
    size: 180,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <span>{props.getValue()}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 100,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      if (props.getValue() === UserStatus.ACTIVE) {
        return (
          <span className="badge bg-success text-white text-14">Active</span>
        );
      } else if (props.getValue() === UserStatus.BANNED) {
        return (
          <span className="badge bg-warning text-white text-14">Banned</span>
        );
      } else if (props.getValue() === UserStatus.DELETED) {
        return (
          <span className="badge bg-danger text-white text-14">Deleted</span>
        );
      }
      return (
        <span className="badge bg-secondary text-white text-14">Unknown</span>
      );
    },
  },
  {
    accessorKey: 'subscription',
    header: 'Plan',
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      const plans = useUserPlanStore.getState().plans;
      const label = plans.find(plan => plan._id === props.getValue())?.label;
      return <span>{label}</span>;
    },
  },
  {
    header: 'Monthly Payment',
    size: 200,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <span>0$</span>;
    },
  },
  {
    header: 'Total Payment',
    size: 150,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <span>0$</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    size: 100,
    header: 'Joined Date',
    cell: props => {
      const formatValue = dayjs(props.getValue()).format('DD/MM/YYYY');
      return <span>{formatValue}</span>;
    },
  },
  {
    header: 'Actions',
    size: 120,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <TableActions row={props.row.original} />;
    },
  },
];
