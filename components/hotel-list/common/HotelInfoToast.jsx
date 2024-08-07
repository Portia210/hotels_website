import useHotelInfoToast from '@/hooks/useHotelInfoToast';
import useTrans from '@/hooks/useTrans';
import useSearchStore from '@/store/useSearchStore';
import { renderGuestText } from '@/utils/convertRoomInfo';
import { useEffect, useState } from 'react';
import HotelStars from './HotelStars';

export default function HotelInfoToast({ id, hotel, price }) {
  const { t, isReverse } = useTrans();
  const searchInput = useSearchStore(state => state.searchInput);
  const [shortLink, setShortLink] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const { hideToast, dateFormat, shortenLink, onCopyInfo } =
    useHotelInfoToast();

  const hideToolTip = elementId => {
    if (!elementId) throw Error('hideToolTip elementId is required');
    const Tooltip = require('bootstrap/js/dist/tooltip');
    const toolTipElement = document.getElementById(elementId);
    const element = Tooltip.getInstance(toolTipElement);
    element.hide();
  };

  const handleShortenLink = async hotel => {
    if (shortLink) return;
    const link = await shortenLink(hotel.travelorLink);
    setShortLink(link);
    hideToolTip(`shortenLinkTooltip_${id}`);
  };

  const handleCopyText = () => {
    onCopyInfo(hotel, price, searchInput, shortLink);
    setIsCopied(true);
  };

  useEffect(() => {
    if (hotel?.travelorLink) {
      setShortLink(null);
      setIsCopied(false);
    }
  }, [hotel?.travelorLink]);

  useEffect(() => {
    setIsCopied(false);
  }, [shortLink]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        hideToolTip(`copyHotelInfoTooltip_${id}`);
      }, 500);
    }
  }, [isCopied]);

  return (
    <div
      className="toast-container position-fixed bottom-0 start-0 p-3 w-fit"
      style={{ zIndex: 20, width: 'fit-content', minHeight: 250 }}
    >
      <div
        id={`liveToast_${id}`}
        className="toast hide bg-white"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">{hotel?.title}</strong>
          <button
            id={`shortenLinkTooltip_${id}`}
            onClick={() => handleShortenLink(hotel)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            className={`button -blue-1 bg-white size-30 rounded-full shadow-2 me-2 ${
              shortLink && 'active'
            }`}
          >
            <i className="bi bi-link-45deg"></i>
          </button>
          <button
            id={`copyHotelInfoTooltip_${id}`}
            onClick={handleCopyText}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            className={`button -blue-1 bg-white size-30 rounded-full shadow-2 ${
              isCopied && 'active'
            }`}
          >
            <i className="bi bi-clipboard"></i>
          </button>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={hideToast}
          ></button>
        </div>
        <div
          className={`toast-body d-flex flex-column ${
            isReverse ? 'align-items-end' : ''
          }`}
        >
          <p>
            {t('SearchBox.dates')}: {dateFormat(searchInput)}
          </p>
          <div
            className={`d-flex text-14 text-light-1 ${
              isReverse ? 'flex-row-reverse justify-content-end' : ''
            }`}
          >
            <p>{t('Hotel.guestReviews')}</p>
            <span
              className={`flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white ${
                isReverse ? 'mr-10' : 'ml-10'
              }`}
            >
              {hotel?.rate ?? <i className="bi bi-hand-thumbs-up"></i>}
            </span>
          </div>
          <HotelStars stars={hotel?.stars} />
          <p>
            {renderGuestText(t('SearchBox'), 'Adults', searchInput?.adults)}{' '}
            {renderGuestText(
              t('SearchBox'),
              'Childrens',
              searchInput?.childrens,
            )}
          </p>
          <div
            className="d-flex x-gap-5 align-items-center"
            dir={`${isReverse && 'rtl'}`}
          >
            <p>{t('Hotel.price')}</p>
            <p>{price}</p>
          </div>
          {shortLink && (
            <div
              className="d-flex x-gap-5 align-items-center"
              dir={`${isReverse && 'rtl'}`}
            >
              <p>{t('Hotel.link')}</p>
              <a href={shortLink} target="_blank">
                <p className="text-primary">{shortLink}</p>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
