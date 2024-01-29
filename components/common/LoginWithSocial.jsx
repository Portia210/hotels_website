"use client";
import { useSignIn } from "@clerk/nextjs";

const LoginWithSocial = () => {
  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) return null;

  const signInWith = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      if (error?.errors?.length > 0) {
        console.error(error?.errors[0].longMessage);
      } else {
        console.error(error?.errors);
      }
    }
  };

  return (
    <>
      <div className="col-12" onClick={signInWith}>
        <button
          type="submit"
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
