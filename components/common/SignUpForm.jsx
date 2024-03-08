'use client';

import usePasswordValidator from '@/hooks/usePasswordValidator';
import useSignUpForm from '@/hooks/useSignUpForm';
import useTrans from '@/hooks/useTrans';
import { useSignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PasswordInstruct from '../dashboard/dashboard/db-settings/components/PasswordInstruct';
import CountryList from './CountryList/CountryList';

const SignUpForm = () => {
  const router = useRouter();
  const { t, isReverse } = useTrans();
  const { signUp, setActive } = useSignUp();
  const { checkEmailAgentNumber } = useSignUpForm();
  const { validate } = usePasswordValidator();
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingForEmailVerified, setPendingForEmailVerified] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();

  const handleSubmit = async event => {
    event.preventDefault();
    let data = {};
    for (let i = 0; i < event.target.length; i++) {
      if (event.target[i].name === '') continue;
      data[event.target[i].name] = event.target[i].value;
    }
    const { isValid, message } = validate(data.password);
    if (!isValid) return setErrorMsg(message);
    if (data.password !== data.confirmPassword) {
      return setErrorMsg(t('Dashboard.SetPassword.passwordNotMatch'));
    }
    const invalidMsg = await checkEmailAgentNumber(
      data.email,
      data.agentNumber,
    );
    if (invalidMsg) return setErrorMsg(invalidMsg);
    await signUp
      .create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        unsafeMetadata: {
          primaryPhoneNumber: data?.primaryPhoneNumber,
          agentNumber: data?.agentNumber,
          country: selectedCountry,
        },
      })
      .then(async result => {
        if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          router.push('/');
        } else {
          await result.prepareVerification({
            strategy: 'email_link',
            redirectUrl: `${window.location.origin}`,
          });
          setPendingForEmailVerified(true);
        }
      })
      .catch(err => {
        let message = err?.message;
        if (err?.errors?.length > 0) {
          message = err?.errors[0]?.longMessage || err;
        }
        setErrorMsg(message);
      });
  };

  if (pendingForEmailVerified) {
    return (
      <div className="row y-gap-50">
        <div className="col-12">
          <h1 className="text-22 fw-500">{t('LoginForm.welcome')}</h1>
          <p className="mt-10">
            {t('LoginForm.alreadyHaveAccount')}{' '}
            <Link href="/login" className="text-blue-1">
              {t('LoginForm.signin')}
            </Link>
          </p>
        </div>
        <p className="text-center fs-4 fw-500">
          {t('LoginForm.verifyEmailMessage')}
        </p>
      </div>
    );
  }

  return (
    <form
      className="row y-gap-15"
      onSubmit={handleSubmit}
      dir={`${isReverse && 'rtl'}`}
    >
      <div className="col-12">
        <h1 className="text-22 fw-500">{t('LoginForm.welcome')}</h1>
        <p className="mt-10">
          {t('LoginForm.alreadyHaveAccount')}{' '}
          <Link href="/login" className="text-blue-1">
            {t('LoginForm.signin')}
          </Link>
        </p>
      </div>
      {/* End .col */}
      {errorMsg && (
        <div className="col-12">
          <PasswordInstruct />
        </div>
      )}
      <div className="col-12">
        {errorMsg && (
          <div>
            <p className="text-red-1">{errorMsg}</p>
          </div>
        )}
        <div className="form-input ">
          <input type="text" required name="email" />
          <label className="lh-1 text-14 text-light-1">
            {t('LoginForm.email')}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input ">
          <input type="text" required name="firstName" />
          <label className="lh-1 text-14 text-light-1">
            {t('LoginForm.firstname')}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input ">
          <input type="text" required name="lastName" />
          <label className="lh-1 text-14 text-light-1">
            {t('LoginForm.lastname')}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input ">
          <input type="password" required name="password" />
          <label className="lh-1 text-14 text-light-1">
            {t('LoginForm.password')}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input ">
          <input type="password" required name="confirmPassword" />
          <label className="lh-1 text-14 text-light-1">
            {t('LoginForm.confirmPassword')}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input ">
          <input type="text" required name="primaryPhoneNumber" />
          <label className="lh-1 text-14 text-light-1">
            {t('LoginForm.phoneNumber')}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input">
          <input type="text" name="agentNumber" />
          <label className="lh-1 text-14 text-light-1">
            {t('LoginForm.agentNumber')}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <label
            className="lh-1 text-14 text-light-1"
            style={{ marginTop: -8 }}
          >
            {t('LoginForm.country')}
          </label>
          <CountryList
            onCountrySelected={setSelectedCountry}
            selectedItem={selectedCountry}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-12" dir={`ltr`}>
        <button
          type="submit"
          href="#"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          {t('LoginForm.signup')} <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default SignUpForm;
