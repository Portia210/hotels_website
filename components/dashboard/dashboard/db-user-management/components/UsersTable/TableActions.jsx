import useUsers from '@/hooks/useUsers';
import eventEmitter from '@/utils/eventEmitter';
import { UserStatus } from '@/utils/roleCheck';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import ActionModal from './ActionModal';

const getBanText = status => {
  if (status === UserStatus.ACTIVE) {
    return 'Ban';
  }
  return 'Unban';
};

export default function TableActions({ row }) {
  const { updateUserStatus } = useUsers();

  const banText = getBanText(row.status);

  const modalData = {
    title: `${banText} User`,
    body: `Are you sure you want to ${banText} user ${row.email}?`,
  };

  const renderTooltip = () => {
    const Tooltip = require('bootstrap/js/dist/tooltip');
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );

    [...tooltipTriggerList].map(tooltipTriggerEl => {
      return new Tooltip(tooltipTriggerEl, {
        title: banText,
      });
    });
  };

  const onUpdateUser = () => {
    console.log('Update user', row);
  };

  const onConfirm = async () => {
    const status =
      row.status === UserStatus.BANNED ? UserStatus.ACTIVE : UserStatus.BANNED;
    await updateUserStatus(row.clerkId, status);
    toast.success('Success', {
      position: 'bottom-right',
      autoClose: 3000,
    });
    eventEmitter.emit('updateUserStatus', {
      clerkId: row.clerkId,
      status,
    });
  };

  useEffect(() => {
    renderTooltip();
  }, [row?.status]);

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
        <span type="button" data-bs-toggle="tooltip" data-bs-placement="top">
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
