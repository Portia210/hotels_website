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
          message = err?.errors[0]?.longMessage || err;
        }
        console.error(message);
        setErrorMsg(t('Dashboard.SetPassword.passwordNotMatch'));
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
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Don&apos;t have an account yet?{' '}
          <Link href="/signup" className="text-blue-1">
            Sign up for free
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="email" required name="email" />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" required name="password" />
          <label className="lh-1 text-14 text-light-1">Password</label>
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
          Forgot your password?
        </a>
      </div>
      {/* End .col */}

      <div className="col-12" dir='ltr'>
        <button
          type="submit"
          href="#"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign In <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default LoginForm;
