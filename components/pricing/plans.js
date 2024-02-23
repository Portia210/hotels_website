export const planContents = (t) => {
  return [
    {
      header: `${t('Pricing.plans.standard')}`,
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
      buttonLabel: `${t('Pricing.getStarted')}`,
      outline: true,
    },
    {
      header: `${t('Pricing.plans.advanced')}`,
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
      buttonLabel: `${t('Pricing.getStarted')}`,
      outline: false,
    },
    {
      header: `${t('Pricing.plans.custom')}`,
      price: 'Contact us',
      features: [
        'Everything in Advanced',
        'Unlimited short links',
        `${t('Pricing.dedicatedSupport')}`,
        `${t('Pricing.allFeatures')}`,
      ],
      buttonLabel: 'Contact Sales',
      outline: false,
    },
  ];
};
