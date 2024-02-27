'use client';

import { useLocale } from 'next-intl';

export default function TranzilaCheckout() {
  const locale = useLocale();
  const terminalName = `agentspctok`;
  const params = new URLSearchParams({
    cred_type: '1',
    tranmode: 'AK',
    lang: locale === 'he' ? 'il' : 'us',
    success_url_address: `http://localhost:3002/api/v1/payment/success`,
    fail_url_address: 'http://localhost:3002/api/v1/payment/failure',
    notify_url_address: 'http://localhost:3002/api/v1/payment/notify',
    currency: 1,
    sum: 20,
    recur_sum: 20,
    recur_transaction: '4_approved',
    recur_payments: 12,
  });
  const iframeUrl = `https://direct.tranzila.com/${terminalName}/iframenew.php?${params.toString()}`;
  return (
    <>
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
    </>
  );
}
