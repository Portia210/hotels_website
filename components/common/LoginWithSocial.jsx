"use client";
import { useSignIn } from "@clerk/nextjs";

const LoginWithSocial = () => {
  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) return null;

  const signInWith = (strategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <>
      <div className="col-12">
        <button
          onClick={() => signInWith("oauth_google")}
          className="button col-12 -outline-red-1 text-red-1 py-15 rounded-8 "
        >
          <i className="icon-apple text-15 mr-10" />
          Google
        </button>
      </div>
    </>
  );
};

export default LoginWithSocial;
