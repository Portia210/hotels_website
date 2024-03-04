import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import dayjs from 'dayjs';

export const TerminalName = `agentspc`;

export const createIframeUrl = (plan, additionalInfo, locale) => {
  const recur_start_date = dayjs().format('YYYY-MM-DD').toString();

  const params = new URLSearchParams({
    cred_type: 1,
    tranmode: 'A',
    lang: locale === 'he' ? 'il' : 'us',
    recur_start_date,
    success_url_address: `${TOURCOMPARE_BE_URL}/api/v1/payment/success`,
    fail_url_address: `${TOURCOMPARE_BE_URL}/api/v1/payment/failure`,
    // notify_url_address: `${TOURCOMPARE_BE_URL}/api/v1/payment/notify`,
    notify_url_address: `https://a63a-222-254-2-160.ngrok-free.app/api/v1/payment/notify`,
    currency: plan.currency,
    sum: Number(plan.sum), // cost to upgrade from current plan to this plan
    recur_sum: Number(plan.price),
    recur_transaction: '4_approved',
    recur_payments: plan.duration,
    ...additionalInfo,
  });

  const iframeUrl = `https://direct.tranzila.com/${TerminalName}/iframenew.php?${params.toString()}`;
  return iframeUrl;
};
