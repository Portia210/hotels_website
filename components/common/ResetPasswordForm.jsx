import useTrans from '@/hooks/useTrans';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordForm() {
  const { t, isReverse } = useTrans();
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const [errorMsg, setErrorMsg] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const onResetPassword = async e => {
    e.preventDefault();
    const data = {};
    for (const key of e.target) {
      if (key?.name) data[key.name] = key.value;
    }
    if (successfulCreation) {
      return signIn
        .attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code: data.resetCode,
          identifier: data.email,
          password: data.newPassword,
        })
        .then(result => {
          if (result.status === 'complete') {
            setActive({ session: result.createdSessionId });
            router.push('/');
          }
        })
        .catch(err => {
          let message = err?.message;
          if (err?.errors?.length > 0) {
            message = err?.errors[0]?.longMessage || err;
          }
          setErrorMsg(message);
        });
    }
    signIn
      .create({
        strategy: 'reset_password_email_code',
        identifier: data.email,
      })
      .then(_ => {
        setSuccessfulCreation(true);
      })
      .catch(err => {
        let message = err?.message;
        if (err?.errors?.length > 0) {
          if (
            err?.errors[0]?.message ===
            'reset_password_email_code is not allowed'
          ) {
            message =
              "We can't reset your password if you use a login method like Google";
          } else {
            message = err?.errors[0]?.longMessage || err;
          }
        }
        setErrorMsg(message);
      });
  };

  return (
    <form className="row y-gap-20" onSubmit={onResetPassword} dir={`${isReverse && 'rtl'}`}>
      <div className="col-12">
        <h1 className="text-22 fw-500">
          {successfulCreation
            ? t('ResetPasswordForm.pleaseEnterCode')
            : t('ResetPasswordForm.resetCodeMessage')}
        </h1>
        {errorMsg && (
          <div>
            <p className="text-red-1">{errorMsg}</p>
          </div>
        )}
      </div>
      {!successfulCreation && (
        <div className="col-12">
          <div className="form-input">
            <input type="email" required name="email" />
            <label className="lh-1 text-14 text-light-1">
              {t('LoginForm.email')}
            </label>
          </div>
        </div>
      )}
      {successfulCreation && (
        <>
          <div className="col-12">
            <div className="form-input">
              <input type="text" required name="resetCode" />
              <label className="lh-1 text-14 text-light-1">
                {t('ResetPasswordForm.resetCode')}
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-input">
              <input type="password" required name="newPassword" />
              <label className="lh-1 text-14 text-light-1">
                {t('ResetPasswordForm.newPassword')}
              </label>
            </div>
          </div>
        </>
      )}

      <div className="col-12">
        <button
          type="submit"
          href="#"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
          dir='ltr'
        >
          {successfulCreation
            ? t('ResetPasswordForm.resetPasswordButton')
            : t('ResetPasswordForm.resetCodeButton')}
          <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
    </form>
  );
}
