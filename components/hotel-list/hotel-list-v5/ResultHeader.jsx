import useTrans from '@/hooks/useTrans';
import { useEffect } from 'react';

export default function ResultHeader({ loading, isExpired, totalResult }) {
  const { t, isReverse } = useTrans();

  const refetch = () => {
    if (!isExpired) return;
    setTimeout(() => {
      document?.getElementById('hotelSearchBtn')?.click();
    }, 3000);
  };

  useEffect(() => {
    refetch();
  }, [isExpired]);

  if (isExpired) {
    return <h3>Results are not updated, searching again...</h3>;
  }

  const renderHotelFound = () => {
    const text = t('ResultHeader.hotelsFound');
    return text.replace('x', totalResult);
  };
  return (
    <>
      {loading && (
        <div className="d-flex align-items-center x-gap-10">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">
              {t('ResultHeader.loading')}...
            </span>
          </div>
          {totalResult > 0 ? (
            <h3>{renderHotelFound()}</h3>
          ) : (
            <h3 dir={isReverse ? 'rtl' : 'ltr'}>
              {t('ResultHeader.loading')}...
            </h3>
          )}
        </div>
      )}
      {!loading && totalResult === 0 && !isExpired && <h3>No hotels found</h3>}
      {!loading && totalResult > 0 && (
        <h3 className="text-24 fw-600 text-dark-1">{renderHotelFound()}</h3>
      )}
    </>
  );
}
