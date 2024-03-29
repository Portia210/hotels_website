'use client';
import useTrans from '@/hooks/useTrans';
import { useSignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

const LoginForm = () => {
  const router = useRouter();
  const { t, isReverse } = useTrans();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { signIn, setActive } = useSignIn();

  const onSignIn = e => {
    e.preventDefault();
    const data = {};
    for (const key of e.target) {
      if (key?.name) data[key.name] = key.value;
    }
    signIn
      .create({
        identifier: data.email,
        password: data.password,
      })
      .then(result => {
        if (result?.status === 'complete') {
          setActive({ session: result.createdSessionId });
          router.push('/');
        } else {
          console.log(result);
        }
      })
      .catch(err => {
        let message = err?.message;
        if (err?.errors?.length > 0) {
          const errorCode = err?.errors[0]?.code;
          if (errorCode === 'session_exists') return window.location.reload();
          message = err?.errors[0]?.longMessage || err;
        }
        console.error(message);
        setErrorMsg(t('Dashboard.SetPassword.passwordNotCorrect'));
      });
  };

  if (isForgotPassword) {
    return <ResetPasswordForm />;
  }
  return (
    <form
      className="row y-gap-20"
      onSubmit={onSignIn}
      dir={`${isReverse && 'rtl'}`}
    >
      <div className="col-12">
        <h1 className="text-22 fw-500">{t('LoginForm.welcome')}</h1>
        <p className="mt-10">
          {t('LoginForm.dontHaveAccount')}{' '}
          <Link href="/signup" className="text-blue-1">
            {t('LoginForm.signUpForFree')}
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="email" required name="email" />
          <label className="lh-1 text-14 text-light-1">
            {t('LoginForm.email')}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" required name="password" />
          <label className="lh-1 text-14 text-light-1">
            {t('LoginForm.password')}
          </label>
        </div>
        {errorMsg && (
          <div>
            <p className="text-red-1">{errorMsg}</p>
          </div>
        )}
      </div>
      {/* End .col */}

      <div className="col-12" onClick={() => setIsForgotPassword(true)}>
        <a href="#" className="text-14 fw-500 text-blue-1 underline">
          {t('LoginForm.forgotPassword')}
        </a>
      </div>
      {/* End .col */}

      <div className="col-12" dir="ltr">
        <button
          type="submit"
          href="#"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          {t('LoginForm.signin')} <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default LoginForm;
