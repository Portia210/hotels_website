export const standardFeatures = t => [
  `25 ${t('Pricing.searchPerDay')}`,
  `500 ${t('Pricing.shortlinkPerMonth')}`,
  `${t('Pricing.generateCustomShortLinks')}`,
  `${t('Pricing.analyzeLinkPerformance')}`,
  `${t('Pricing.allFeatures')}`,
  `${t('Pricing.dedicatedSupport')}`,
  `${t('Pricing.cancelAnytime')}`,
];

export const advancedFeatures = t => [
  `50 ${t('Pricing.searchPerDay')}`,
  `1000 ${t('Pricing.shortlinkPerMonth')}`,
  `${t('Pricing.generateCustomShortLinks')}`,
  `${t('Pricing.deeperLinkInsight')}`,
  `${t('Pricing.allFeatures')}`,
  `${t('Pricing.dedicatedSupport')}`,
  `${t('Pricing.cancelAnytime')}`,
];

export const getFeature = (plan, t) => {
  if (plan === 'Standard') {
    return standardFeatures(t);
  }
  return advancedFeatures(t);
};

export const featureNameMapping = name => {
  switch (name) {
    case 'searchPerDay':
      return 'Searches per day';
    case 'shortlinkPerMonth':
      return 'Short links per month';
    case 'generateCustomShortLinks':
      return 'Generate custom short links';
    case 'analyzeLinkPerformance':
      return 'Analyze link performance';
    case 'allFeatures':
      return 'All features';
    case 'dedicatedSupport':
      return 'Dedicated support';
    case 'cancelAnytime':
      return 'Cancel anytime';
    case 'deeperLinkInsight':
      return 'Deeper link insight';
    default:
      return name;
  }
};
