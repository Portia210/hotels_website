export const planContents = t => {
  return [
    {
      header: `${t('Pricing.plans.standard')}`,
      value: 'Standard',
      price: 80,
      currency: '₪',
      features: [
        `25 ${t('Pricing.searchPerDay')}`,
        `500 ${t('Pricing.shortlinkPerMonth')}`,
        `${t('Pricing.generateCustomShortLinks')}`,
        `${t('Pricing.analyzeLinkPerformance')}`,
        `${t('Pricing.allFeatures')}`,
        `${t('Pricing.dedicatedSupport')}`,
        `${t('Pricing.cancelAnytime')}`,
      ],
      outline: false,
    },
    {
      header: `${t('Pricing.plans.advanced')}`,
      value: 'Advanced',
      price: 150,
      currency: '₪',
      features: [
        `50 ${t('Pricing.searchPerDay')}`,
        `1000 ${t('Pricing.shortlinkPerMonth')}`,
        `${t('Pricing.generateCustomShortLinks')}`,
        `${t('Pricing.deeperLinkInsight')}`,
        `${t('Pricing.allFeatures')}`,
        `${t('Pricing.dedicatedSupport')}`,
        `${t('Pricing.cancelAnytime')}`,
      ],
      outline: false,
    },
  ];
};
