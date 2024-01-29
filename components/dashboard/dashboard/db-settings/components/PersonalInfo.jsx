import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import AvatarUploader from "./AvatarUploader";
import { sleep } from "@/utils/sleep";
import { useState } from "react";

const PersonalInfo = () => {
  const [file, setFile] = useState(null);
  const { user } = useUser();

  const onUpdateInfo = async (e) => {
    const toastId = toast.success("Updating user's profile", {
      position: "bottom-right",
      isLoading: true,
    });

    try {
      e.preventDefault();

      const data = {};
      for (const key of e.target) {
        if (key?.name) {
          data[key.name] = key.value;
        }
      }
      if (file) await user.setProfileImage({ file });
      await user.update({
        firstName: data?.firstName,
        lastName: data?.lastName,
        unsafeMetadata: {
          primaryPhoneNumber: data?.primaryPhoneNumber,
          agentNumber: data?.agentNumber,
          country: data?.country,
        },
      });
      toast.success("Successfully updated profile", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Oops something went wrong! That's on us.", {
        position: "bottom-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const onUpdateProfileImage = async (file) => {
    setFile(file);
  };

  return (
    <>
      <form onSubmit={onUpdateInfo}>
        <AvatarUploader
          imageUrl={user?.imageUrl}
          updateProfileImage={onUpdateProfileImage}
        />
        {/* End AvatarUploader*/}

        <div className="border-top-light mt-30 mb-30" />

        <div className="col-xl-9">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-md-6">
              <div className="form-input ">
                <input
                  type="text"
                  name="firstName"
                  required
                  defaultValue={user?.firstName}
                />
                <label className="lh-1 text-16 text-light-1">First Name</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className="form-input ">
                <input
                  type="text"
                  name="lastName"
                  required
                  defaultValue={user?.lastName}
                />
                <label className="lh-1 text-16 text-light-1">Last Name</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className="form-input">
                <input
                  type="text"
                  name="emailAddress"
                  defaultValue={user?.primaryEmailAddress?.emailAddress}
                />
                <label className="lh-1 text-16 text-light-1">Email</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className="form-input ">
                <input
                  type="text"
                  required
                  name="primaryPhoneNumber"
                  defaultValue={user?.primaryPhoneNumber}
                />
                <label className="lh-1 text-16 text-light-1">
                  Phone Number
                </label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-6">
              <div className="form-input ">
                <input type="text" name="agentNumber" required />
                <label className="lh-1 text-16 text-light-1">
                  Agent number
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-input">
                <input type="text" name="country" required />
                <label className="lh-1 text-16 text-light-1">Country</label>
              </div>
            </div>
            {/* End col-6 */}
          </div>
        </div>
        {/* End col-xl-9 */}

        <div className="d-inline-block pt-30">
          <button
            type="submit"
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          >
            Save Changes <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalInfo;
