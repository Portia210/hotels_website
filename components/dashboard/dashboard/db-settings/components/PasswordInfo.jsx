import usePasswordValidator from '@/hooks/usePasswordValidator';
import useTrans from '@/hooks/useTrans';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PasswordInstruct from './PasswordInstruct';

const PasswordInfo = () => {
  const { t } = useTrans();
  const { validate } = usePasswordValidator();
  const { user } = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  const onUpdatePassword = async e => {
    e.preventDefault();
    try {
      const data = {};
      for (const key of e.target) {
        if (key?.name) data[key.name] = key.value;
      }
      const { isValid, message } = validate(data.newPassword);
      if (!isValid) return setErrorMsg(message);
      if (data.newPassword !== data.newPasswordCheck) {
        setErrorMsg(t('Dashboard.SetPassword.passwordNotMatch'));
      } else {
        await user.updatePassword({
          newPassword: data.newPassword,
          currentPassword: data?.currentPassword,
        });
        toast.success('Successfully updated password', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      let message = t('Dashboard.SetPassword.passwordNotMatch');
      if (error?.errors[0]?.longMessage) {
        message = error.errors[0].longMessage;
      }
      setErrorMsg(message);
    }
  };

  return (
    <div className="row flex-column-reverse flex-lg-row y-gap-10">
      <form className="col-md-8 col-sm-12" onSubmit={onUpdatePassword}>
        <div className="row x-gap-20 y-gap-20">
          {!user?.passwordEnabled && (
            <div>
              <h4 className="text-20 fw-600 lh-1 mb-20">
                {t('Dashboard.SetPassword.setPasswordLabel')}
              </h4>
            </div>
          )}
          {user?.passwordEnabled && (
            <div className="col-12">
              <div className="form-input ">
                <input type="password" name="currentPassword" required />
                <label className="lh-1 text-16 text-light-1">
                  {t('Dashboard.SetPassword.currentPassword')}
                </label>
              </div>
            </div>
          )}
          {/* End col-12 */}

          <div className="col-12">
            <div className="form-input ">
              <input type="password" name="newPassword" required />
              <label className="lh-1 text-16 text-light-1">
                {t('Dashboard.SetPassword.newPassword')}
              </label>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
            <div className="form-input ">
              <input type="password" name="newPasswordCheck" required />
              <label className="lh-1 text-16 text-light-1">
                {t('Dashboard.SetPassword.newPasswordAgain')}
              </label>
            </div>
          </div>
          {/* End col-12 */}
          {errorMsg && (
            <div>
              <p className="text-red-1">{errorMsg}</p>
            </div>
          )}
          <div className="col-12">
            <div className="row x-gap-10 y-gap-10">
              <div className="col-auto">
                <button
                  type="submit"
                  className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                >
                  {t('Dashboard.General.saveChanges')}
                  <div className="icon-arrow-top-right ml-15" />
                </button>
              </div>
              <div className="col-auto">
                <button className="button h-50 px-24 -blue-1 bg-blue-1-05 text-blue-1">
                  {t('Dashboard.General.cancel')}
                </button>
              </div>
            </div>
          </div>
          {/* End col-12 */}
        </div>
      </form>
      <div className="col-md-4 col-sm-12">
        <PasswordInstruct />
      </div>
    </div>
  );
};

export default PasswordInfo;
