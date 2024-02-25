import { TOURCOMPARE_BE_URL } from '@/constants/environment';
import { useAuth } from '@clerk/nextjs';
import axios, { isAxiosError } from 'axios';
import { useLocale } from 'next-intl';
import { useState } from 'react';

const useDestinationGallery = () => {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchCountryCities = async (place, type = 'countries') => {
    const token = await getToken();
    let data = {};
    if (type === 'countries') {
      data = { countries: place };
    } else {
      data = { city: place };
    }
    try {
      setLoading(true);
      const language = locale === 'he' ? 'iw' : 'en';
      const response = await axios.post(
        `${TOURCOMPARE_BE_URL}/api/v1/mapapi/popular-destinations?language=${language}`,
        data,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchTouristAttractions = async city => {
    return fetchCountryCities(city, 'city')
  };

  return {
    fetchCountryCities,
    fetchTouristAttractions,
    loading,
  };
};
export default useDestinationGallery;
