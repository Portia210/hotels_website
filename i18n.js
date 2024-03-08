import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const messages = {
    ...(await import(`./messages/${locale}.json`)).default,
    ...(await import(`./messages/${locale}/dashboard.json`)).default,
    ...(await import(`./messages/${locale}/hotel.json`)).default,
    ...(await import(`./messages/${locale}/pricing.json`)).default,
    ...(await import(`./messages/${locale}/filterbar.json`)).default,
  };
  return { messages };
});
