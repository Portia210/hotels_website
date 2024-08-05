export const renderText = (t, key, value) => {
  if (key === 'distance' && value) {
    if (value.includes('from center')) {
      value = value.replace('from center', t(`Hotel.${key}`));
    } else if (value.includes('from map center')) {
      value = value.replace('from map center', t(`Hotel.${key}`));
    }
  }
  return value;
};

export const renderTextLocation = (t, value) => {
  if (value && value.includes('from location')) {
    value = value.replace('from location', t(`Hotel.location`));
  }
  return value;
};

export const toTravelorWithoutSession = url => {
  if (!url) return;
  const searchParams = new URLSearchParams(new URL(url).search);
  searchParams.delete('session');
  const updatedUrl = new URL(url);
  updatedUrl.search = searchParams.toString();
  window.open(updatedUrl.toString(), '_blank').focus();
};
