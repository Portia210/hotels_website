import dayjs from 'dayjs';
import BillingTableActions from './BillingTableActions';

export const getColumns = t => [
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
    header: t('Billing.kindOfPlanLbl'),
    size: 100,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      const items = props.getValue();
      const planName =
        t(`DashboardCard.Plan.${items?.planName?.toLowerCase()}`) ||
        items?.planName;
      return <span>{planName}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: t('Billing.paymentDateLbl'),
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
    header: t('Billing.paymentSumLbl'),
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
    header: t('Billing.paymentStatusLbl'),
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
            {t('Billing.paymentStatusPaid')}
          </button>
        );
      return (
        <button className="btn badge rounded-pill text-bg-danger text-12">
          {t('Billing.paymentStatusFail')}
        </button>
      );
    },
  },
  {
    header: t('Billing.invoiceInfoLbl'),
    size: 100,
    meta: {
      headerAlign: 'center',
      align: 'center',
    },
    cell: props => {
      return <BillingTableActions t={t} row={props?.row} />;
    },
  },
];
