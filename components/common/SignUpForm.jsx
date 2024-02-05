"use client";

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CountryList from "./CountryList/CountryList";

const SignUpForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [pendingForEmailVerified, setPendingForEmailVerified] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const router = useRouter();
  const { signUp, setActive } = useSignUp();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {};
    for (let i = 0; i < event.target.length; i++) {
      if (event.target[i].name === "") continue;
      data[event.target[i].name] = event.target[i].value;
    }
    if (data.password !== data.confirmPassword) {
      return setErrorMsg("Password is not matched");
    }
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
      .then(async (result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          router.push("/");
        } else {
          await result.prepareVerification({
            strategy: "email_link",
            redirectUrl: `${window.location.origin}`,
          });
          setPendingForEmailVerified(true);
        }
      })
      .catch((err) => {
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
          <h1 className="text-22 fw-500">Welcome back</h1>
          <p className="mt-10">
            Already have an account yet?{" "}
            <Link href="/login" className="text-blue-1">
              Log in
            </Link>
          </p>
        </div>
        <p className="text-center fs-4 fw-500">
          Please check your email to verify your account
        </p>
      </div>
    );
  }

  return (
    <form className="row y-gap-15" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Already have an account yet?{" "}
          <Link href="/login" className="text-blue-1">
            Log in
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        {errorMsg && (
          <div>
            <p className="text-red-1">{errorMsg}</p>
          </div>
        )}
        <div className="form-input ">
          <input type="text" required name="email" />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input ">
          <input type="text" required name="firstName" />
          <label className="lh-1 text-14 text-light-1">First Name</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input ">
          <input type="text" required name="lastName" />
          <label className="lh-1 text-14 text-light-1">Last Name</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input ">
          <input type="password" required name="password" />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input ">
          <input type="password" required name="confirmPassword" />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input ">
          <input type="text" required name="primaryPhoneNumber" />
          <label className="lh-1 text-14 text-light-1">Phone number</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-6">
        <div className="form-input">
          <input type="text" name="agentNumber" />
          <label className="lh-1 text-14 text-light-1">Agent Number</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <label className="lh-1 text-14 text-light-1"                   
            style={{ marginTop: -8 }}
          >Country</label>
          <CountryList
            onCountrySelected={setSelectedCountry}
            selectedItem={selectedCountry}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="submit"
          href="#"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign Up <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default SignUpForm;
