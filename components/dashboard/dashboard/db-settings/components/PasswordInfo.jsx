import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "react-toastify";

const PasswordInfo = () => {
  const { user } = useUser();
  const [errorMsg, setErrorMsg] = useState("");

  const onUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const data = {};
      for (const key of e.target) {
        if (key?.name) data[key.name] = key.value;
      }
      if (data.newPassword !== data.newPasswordCheck) {
        setErrorMsg(`Passwords doesn’t match`);
      } else {
        await user.updatePassword({
          newPassword: data.newPassword,
          currentPassword: data?.currentPassword,
        });
        toast.success("Successfully updated password", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      let message = `Current Passwords doesn’t correct`;
      if (error?.errors[0]?.longMessage) {
        message = error.errors[0].longMessage;
      }
      setErrorMsg(message);
    }
  };

  return (
    <form className="col-xl-9" onSubmit={onUpdatePassword}>
      <div className="row x-gap-20 y-gap-20">
        {!user?.passwordEnabled && (
          <div>
            <h4 className="text-20 fw-600 lh-1 mb-20">Set Password</h4>
          </div>
        )}
        {user?.passwordEnabled && (
          <div className="col-12">
            <div className="form-input ">
              <input type="password" name="currentPassword" required />
              <label className="lh-1 text-16 text-light-1">
                Current Password
              </label>
            </div>
          </div>
        )}
        {/* End col-12 */}

        <div className="col-12">
          <div className="form-input ">
            <input type="password" name="newPassword" required />
            <label className="lh-1 text-16 text-light-1">New Password</label>
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-12">
          <div className="form-input ">
            <input type="password" name="newPasswordCheck" required />
            <label className="lh-1 text-16 text-light-1">
              New Password Again
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
                Save Changes <div className="icon-arrow-top-right ml-15" />
              </button>
            </div>
            <div className="col-auto">
              <button className="button h-50 px-24 -blue-1 bg-blue-1-05 text-blue-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* End col-12 */}
      </div>
    </form>
  );
};

export default PasswordInfo;
