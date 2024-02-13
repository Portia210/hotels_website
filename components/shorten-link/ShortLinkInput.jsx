"use client";

import useShortenLink from "@/hooks/useShortenLink";
import { useEffect, useState } from "react";

export default function ShortLinkInput() {
  const { shortenLink, isValidURL } = useShortenLink();
  const [linkInput, setLinkInput] = useState("");
  const [result, setResult] = useState("");
  const [errorMsg, setErroMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const renderTooltip = () => {
    const Tooltip = require("bootstrap/js/dist/tooltip");
    const shortenLinkToolTip = document.getElementById("shortenLinkTooltip2");
    new Tooltip(shortenLinkToolTip, {
      container: "body",
      trigger: "hover focus",
      title: "Copy link",
    });
  };

  const handleShortenLink = async () => {
    if (!linkInput) return;
    if (!isValidURL(linkInput)) {
      setErroMsg("Invalid URL");
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
    const Tooltip = require("bootstrap/js/dist/tooltip");
    const toolTipElement = document.getElementById("shortenLinkTooltip2");
    const toolTip = Tooltip.getInstance(toolTipElement);
    toolTip.setContent({ ".tooltip-inner": "Copied!" });
  };

  useEffect(() => {
    renderTooltip();
  }, []);

  return (
    <div className="d-flex flex-column">
      <div
        id="shortenLinkTooltip2"
        type="button"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={onCopyLink}
        className="text-center text-primary text-25"
      >
        <span>{result}</span>
      </div>
      <div className="mainSearch -w-900 bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-100">
        <div className="d-flex justify-content-between">
          <input
            type="text"
            id="linkInput"
            className={`text-success text-truncate`}
            required
            value={linkInput}
            placeholder={"Enter long link here"}
            onInput={(e) => setLinkInput(e.target.value)}
          />
          <div className="button-item">
            <button
              onClick={handleShortenLink}
              disabled={loading}
              className="mainSearch__submit button -dark-1 h-60 px-20 col-12 rounded-100 bg-blue-1 text-white"
            >
              {loading ? (
                <div className="d-flex align-items-center mr-5">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                </div>
              ) : (
                <i className="bi bi-link-45deg text-20 mr-5"></i>
              )}
              Shorten
            </button>
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
