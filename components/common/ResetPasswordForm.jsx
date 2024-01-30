import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const [errorMsg, setErrorMsg] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const onResetPassword = async (e) => {
    e.preventDefault();
    const data = {};
    for (const key of e.target) {
      if (key?.name) data[key.name] = key.value;
    }
    if (successfulCreation) {
      return signIn
        .attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: data.resetCode,
          identifier: data.email,
          password: data.newPassword,
        })
        .then((result) => {
          if (result.status === "complete") {
            setActive({ session: result.createdSessionId });
            router.push("/");
          }
        })
        .catch((err) => {
          let message = err?.message;
          if (err?.errors?.length > 0) {
            message = err?.errors[0]?.longMessage || err;
          }
          setErrorMsg(message);
        });
    }
    signIn
      .create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
      })
      .catch((err) => {
        let message = err?.message;
        if (err?.errors?.length > 0) {
          message = err?.errors[0]?.longMessage || err;
        }
        setErrorMsg(message);
      });
  };

  return (
    <form className="row y-gap-20" onSubmit={onResetPassword}>
      <div className="col-12">
        <h1 className="text-22 fw-500">
          {successfulCreation
            ? "Please enter your reset code and new password"
            : "A reset code will be sent to this email"}
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
            <label className="lh-1 text-14 text-light-1">Email</label>
          </div>
        </div>
      )}
      {successfulCreation && (
        <>
          <div className="col-12">
            <div className="form-input">
              <input type="text" required name="resetCode" />
              <label className="lh-1 text-14 text-light-1">Reset code</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-input">
              <input type="password" required name="newPassword" />
              <label className="lh-1 text-14 text-light-1">New Password</label>
            </div>
          </div>
        </>
      )}

      <div className="col-12">
        <button
          type="submit"
          href="#"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          {successfulCreation ? "Reset password" : "Send reset code"}
          <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
    </form>
  );
}
