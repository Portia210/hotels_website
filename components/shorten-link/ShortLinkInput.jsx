'use client';

import useIsMobile from '@/hooks/useIsMobile';
import useShortenLink from '@/hooks/useShortenLink';
import useTrans from '@/hooks/useTrans';
import { useEffect, useState } from 'react';

export default function ShortLinkInput() {
  const { t, isReverse } = useTrans();
  const isMobile = useIsMobile();
  const { shortenLink, isValidURL } = useShortenLink();
  const [linkInput, setLinkInput] = useState('');
  const [result, setResult] = useState('');
  const [errorMsg, setErroMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const renderTooltip = () => {
    const Tooltip = require('bootstrap/js/dist/tooltip');
    const shortenLinkToolTip = document.getElementById('shortenLinkTooltip2');
    new Tooltip(shortenLinkToolTip, {
      container: 'body',
      trigger: 'hover focus',
      title: t('ShortLinkPage.copyLinkTooltip') || 'Copy link',
    });
  };

  const handleShortenLink = async () => {
    if (!linkInput) return;
    if (!isValidURL(linkInput)) {
      setErroMsg('Invalid URL');
      return;
    } else {
      setErroMsg();
    }
    try {
      setLoading(true);
      const link = await shortenLink(linkInput);
      setResult(link);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onCopyLink = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    const Tooltip = require('bootstrap/js/dist/tooltip');
    const toolTipElement = document.getElementById('shortenLinkTooltip2');
    const toolTip = Tooltip.getInstance(toolTipElement);
    toolTip.setContent({ '.tooltip-inner': 'Copied!' });
  };

  useEffect(() => {
    renderTooltip();
  }, []);

  return (
    <div className="w-100 d-flex flex-column">
      <div
        id="shortenLinkTooltip2"
        type="button"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={onCopyLink}
        className="text-center text-primary text-25"
      >
        {result && (
          <>
            <span>{result}</span>
            <span className="ml-10 rounded-full">
              <i className="bi bi-clipboard"></i>
            </span>
          </>
        )}
      </div>
      <div className="bg-white px-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-100 lg:mt-30">
        <div
          className="d-flex justify-content-between lh-lg lg:mt-10 lg:lh-sm"
          dir={`${isReverse && 'rtl'}`}
        >
          <input
            type="text"
            id="linkInput"
            className={`text-primary text-truncate text-20`}
            required
            autoComplete="off"
            value={linkInput}
            placeholder={t('ShortLinkPage.shortLinkInputPlaceholder')}
            onInput={e => setLinkInput(e.target.value)}
          />
          <div
            onClick={handleShortenLink}
            className="d-flex align-items-center"
            style={{ height: isMobile ? 40 : 80 }}
          >
            {loading ? (
              <div className="spinner-border text-primary" role="status" />
            ) : (
              <i
                className={`bi bi-arrow-${
                  isReverse ? 'left' : 'right'
                }-circle text-40 text-primary`}
              ></i>
            )}
          </div>
        </div>
      </div>
      {errorMsg && (
        <div className="px-10 lg:px-20">
          <span className="text-red-1">{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
