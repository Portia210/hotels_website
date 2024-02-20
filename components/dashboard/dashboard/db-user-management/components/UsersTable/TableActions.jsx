import { useEffect } from 'react';

export default function TableActions({ row }) {
  const renderTooltip = () => {
    const Tooltip = require('bootstrap/js/dist/tooltip');
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );

    [...tooltipTriggerList].map(tooltipTriggerEl => {
      const tootTip = Tooltip.getInstance(tooltipTriggerEl);
      if (tootTip) return;
      return new Tooltip(tooltipTriggerEl);
    });
  };

  const onUpdateUser = () => {
    console.log('Update user', row);
  };

  const onBanUser = () => {
    console.log('Ban user', row);
  };

  useEffect(() => {
    renderTooltip();
  }, []);

  return (
    <div>
      <div className="d-flex x-gap-10">
        <span
          type="button"
          title="Edit"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        >
          <div onClick={onUpdateUser} className="cursor-pointer text-primary">
            <i className="bi bi-pencil-square text-16"></i>
          </div>
        </span>
        <span
          type="button"
          title="Ban"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        >
          <div onClick={onBanUser} className="cursor-pointer text-warning">
            <i className="bi bi-slash-circle text-16"></i>
          </div>
        </span>
      </div>
    </div>
  );
}
