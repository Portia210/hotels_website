import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import AvatarUploader from "../../db-settings/components/AvatarUploader";
import { useEffect, useState } from "react";
import CountryList from "@/components/common/CountryList/CountryList";
import useTrans from "@/hooks/useTrans";
import { useLocale } from "next-intl";

const PersonalInfo = () => {
  const locale = useLocale();
  const isReverse = locale === "he";
  const { t } = useTrans();
  const [file, setFile] = useState(null);
  const { user } = useUser();
  const [selectedCountry, setSelectedCountry] = useState(
    user?.unsafeMetadata?.country
  );

  const onUpdateInfo = async (e) => {
    const toastId = toast.success("Updating user's profile", {
      position: "bottom-right",
      isLoading: true,
    });
    try {
      e.preventDefault();
      const data = {};
      for (const key of e.target) {
        if (key?.name) data[key.name] = key.value;
      }
      if (file) await user.setProfileImage({ file });
      await user.update({
        firstName: data?.firstName,
        lastName: data?.lastName,
        unsafeMetadata: {
          primaryPhoneNumber: data?.primaryPhoneNumber,
          agentNumber: data?.agentNumber,
          country: selectedCountry,
        },
      });
      toast.success("Successfully updated profile", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Oops something went wrong!", {
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

  useEffect(() => {
    if (user?.unsafeMetadata?.country)
      setSelectedCountry(user?.unsafeMetadata?.country);
  }, [user?.unsafeMetadata?.country]);

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
          <div className="row x-gap-20 y-gap-20 mb-5">
            <div className={`col-md-6 ${isReverse && "order-2"}`}>
              <div className="form-input ">
                <input
                  type="text"
                  name="firstName"
                  required
                  defaultValue={user?.firstName}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t("Dashboard.PersonalInfo.firstName")}
                </label>
              </div>
            </div>
            {/* End col-6 */}

            <div className={`col-md-6 ${isReverse && "order-1"}`}>
              <div className="form-input ">
                <input
                  type="text"
                  name="lastName"
                  required
                  defaultValue={user?.lastName}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t("Dashboard.PersonalInfo.lastName")}
                </label>
              </div>
            </div>
            {/* End col-6 */}
          </div>
          <div className="row x-gap-20 y-gap-20">
            <div className="col-md-6">
              <div className="form-input">
                <input
                  type="text"
                  name="emailAddress"
                  defaultValue={user?.primaryEmailAddress?.emailAddress}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t("Dashboard.PersonalInfo.email")}
                </label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className="form-input ">
                <input
                  type="text"
                  required
                  name="primaryPhoneNumber"
                  defaultValue={user?.unsafeMetadata?.primaryPhoneNumber}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t("Dashboard.PersonalInfo.phoneNumber")}
                </label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-6">
              <div className="form-input ">
                <input
                  type="text"
                  name="agentNumber"
                  defaultValue={user?.unsafeMetadata?.agentNumber}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t("Dashboard.PersonalInfo.agentNumber")}
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-input">
                <label
                  className="position-absolute lh-1 text-16 text-light-1"
                  style={{ marginTop: -8 }}
                >
                  {t("Dashboard.PersonalInfo.country")}
                </label>
                <CountryList
                  onCountrySelected={setSelectedCountry}
                  selectedItem={selectedCountry}
                />
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
            {t("Dashboard.General.saveChanges")}
            <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalInfo;
