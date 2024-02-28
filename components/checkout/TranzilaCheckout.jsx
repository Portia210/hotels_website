'use client';

import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import { useUser } from '@clerk/nextjs';
import dayjs from 'dayjs';
import { useLocale } from 'next-intl';

export default function TranzilaCheckout() {
  const { user, isLoaded } = useUser();
  const locale = useLocale();

  if (!isLoaded) return null;

  const plan = {
    name: 'Plan B',
    id: '65c363371936ee997a061a4a',
    price: 20,
    currency: 1,
    duration: 12, // months
  };
  const json_purchase_data = JSON.stringify([
    {
      product_name: plan.id,
      product_quantity: 1,
      product_price: plan.price,
    },
  ]);

  const terminalName = `agentspc`;
  const recur_start_date = dayjs().format('YYYY-MM-DD').toString();

  const buyer = {
    json_purchase_data: encodeURIComponent(json_purchase_data),
    email: user.emailAddresses[0].emailAddress,
  };

  const params = new URLSearchParams({
    cred_type: 1,
    tranmode: 'N',
    lang: locale === 'he' ? 'il' : 'us',
    recur_start_date,
    success_url_address: `${TOURCOMPARE_BE_URL}/api/v1/payment/success`,
    fail_url_address: `${TOURCOMPARE_BE_URL}/api/v1/payment/failure`,
    notify_url_address: `${TOURCOMPARE_BE_URL}/api/v1/payment/notify`,
    currency: plan.currency,
    sum: Number(plan.price),
    recur_sum: Number(plan.price),
    recur_transaction: '4_approved',
    recur_payments: plan.duration,
    ...buyer,
  });

  const iframeUrl = `https://direct.tranzila.com/${terminalName}/iframenew.php?${params.toString()}`;
  return (
    <div>
      <iframe
        id="tranzila-frame"
        allowpaymentrequest="true"
        name="tranzila"
        src={iframeUrl}
        width="100%"
        height="1000px"
      ></iframe>
    </div>
  );
}
