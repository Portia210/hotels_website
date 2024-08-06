export const renderText = (t, location) => {
  if (location) {
    if (location.includes('from center')) {
      location = location.replace('from center', t(`Hotel.distance`));
    } else if (location.includes('from map center')) {
      location = location.replace('from map center', t(`Hotel.distance`));
    }else if (location.includes('from')) {
      location = location.replace('from', t(`Hotel.distance`));
    }
  }
  return location;
};

export const toTravelorWithoutSession = url => {
  if (!url) return;
  const searchParams = new URLSearchParams(new URL(url).search);
  searchParams.delete('session');
  const updatedUrl = new URL(url);
  updatedUrl.search = searchParams.toString();
  window.open(updatedUrl.toString(), '_blank').focus();
};
