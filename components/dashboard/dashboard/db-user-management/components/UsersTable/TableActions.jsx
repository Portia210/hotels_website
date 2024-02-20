import useUsers from '@/hooks/useUsers';
import { UserStatus } from '@/utils/roleCheck';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import ActionModal from './ActionModal';

export default function TableActions({ row }) {
  const { updateUserStatus } = useUsers();
  const modalData = {
    title: `${row.status === UserStatus.ACTIVE ? 'Ban' : 'Unban'} User`,
    body: `Are you sure you want to ${
      row.status === UserStatus.ACTIVE ? 'Ban' : 'Unban'
    } user ${row.email}?`,
  };

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

  const onConfirm = () => {
    const status =
      row.status === UserStatus.BANNED ? UserStatus.ACTIVE : UserStatus.BANNED;
    updateUserStatus(row.clerkId, status).then(() => {
      toast.success('Success', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    });
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
          title={row.status === UserStatus.ACTIVE ? 'Ban' : 'Unban'}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        >
          {row.status === UserStatus.ACTIVE && (
            <div
              type="button"
              className="cursor-pointer text-warning"
              data-bs-toggle="modal"
              data-bs-target={`#actionModal${row.clerkId}`}
            >
              <i className="bi bi-slash-circle text-16"></i>
            </div>
          )}
          {row.status === UserStatus.BANNED && (
            <div
              type="button"
              className="cursor-pointer text-info"
              data-bs-toggle="modal"
              data-bs-target={`#actionModal${row.clerkId}`}
            >
              <i className="bi bi-plus-circle text-16"></i>
            </div>
          )}
        </span>
      </div>
      <ActionModal
        id={row.clerkId}
        title={modalData.title}
        body={modalData.body}
        onConfirm={onConfirm}
      />
    </div>
  );
}
