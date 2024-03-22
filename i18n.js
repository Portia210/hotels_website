import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const messages = {
    ...(await import(`./messages/${locale}.json`)).default,
    ...(await import(`./messages/${locale}/common.json`)).default,
    ...(await import(`./messages/${locale}/dashboard.json`)).default,
    ...(await import(`./messages/${locale}/hotel.json`)).default,
    ...(await import(`./messages/${locale}/pricing.json`)).default,
    ...(await import(`./messages/${locale}/filterbar.json`)).default,
    ...(await import(`./messages/${locale}/dashboard-card.json`)).default,
    ...(await import(`./messages/${locale}/shortlink.json`)).default,
    ...(await import(`./messages/${locale}/login-form.json`)).default,
    ...(await import(`./messages/${locale}/contact.json`)).default,
    ...(await import(`./messages/${locale}/checkout.json`)).default,
    ...(await import(`./messages/${locale}/billing.json`)).default,
    ...(await import(`./messages/${locale}/thankyou.json`)).default,
    ...(await import(`./messages/${locale}/banned.json`)).default,
  };
  return { messages };
});
