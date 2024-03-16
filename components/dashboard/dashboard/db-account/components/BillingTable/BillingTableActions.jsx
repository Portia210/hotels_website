import { TRANZILA_INVOICE_URL } from '@/constants/invoice';
import useInvoice from '@/hooks/useInvoice';
import { useMutation } from '@tanstack/react-query';

export default function BillingTableActions({ row }) {
  const { getInvoice } = useInvoice();

  const viewInvoiceMutation = useMutation({
    mutationFn: () => {
      return getInvoice(row?.original?._id);
    },
    onSuccess: data => {
      if (data.retrieval_key)
        window.open(`${TRANZILA_INVOICE_URL}/${data.retrieval_key}`, '_blank');
    },
  });

  const onViewInvoice = () => {
    viewInvoiceMutation.mutate();
  };

  if (viewInvoiceMutation.isPending) {
    return (
      <div className="text-center">
        <span className="btn badge rounded-pill text-bg-primary">
          Loading...
        </span>
      </div>
    );
  }
  return (
    <div className="text-center" onClick={() => onViewInvoice()}>
      <span className="btn badge rounded-pill text-bg-primary">Invoice</span>
    </div>
  );
}
