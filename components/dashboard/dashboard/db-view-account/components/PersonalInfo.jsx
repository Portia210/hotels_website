import CountryList from '@/components/common/CountryList/CountryList';
import AvatarUploader from '@/components/dashboard/dashboard/db-settings/components/AvatarUploader';
import UserPlansDropdown from '@/components/dashboard/dashboard/db-user-management/components/UsersTable/UserPlansDropdown';
import useTrans from '@/hooks/useTrans';
import useUserPlans from '@/hooks/useUserPlans';
import useUsers from '@/hooks/useUsers';
import { UserStatus } from '@/utils/roleCheck';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const PersonalInfo = ({ clerkId }) => {
  const router = useRouter();
  const { t, isReverse } = useTrans();
  const { getUserById, updateUserStatus } = useUsers();
  const { upgradeUserPlan } = useUserPlans();
  const [user, setUser] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const [newPlan, setNewPlan] = useState();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['fetchUser'],
    queryFn: () => getUserById(clerkId),
  });

  const upgradePlanMutation = useMutation({
    mutationFn: () => {
      return upgradeUserPlan(newPlan, clerkId);
    },
    onSuccess: async () => {
      toast.success('Plan upgrade Successfully', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      await refetch();
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: () => {
      return updateUserStatus(clerkId, UserStatus.DELETED);
    },
    onSuccess: () => {
      toast.success('User deteled', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      router.push('/dashboard/db-user-management');
    },
  });

  const onUpdateInfo = async e => {
    const toastId = toast.success("Updating user's profile", {
      position: 'bottom-right',
      isLoading: true,
    });
    try {
      e.preventDefault();
      const data = {};
      for (const key of e.target) {
        if (key?.name) data[key.name] = key.value;
      }
      await user.update({
        firstName: data?.firstName,
        lastName: data?.lastName,
        unsafeMetadata: {
          primaryPhoneNumber: data?.primaryPhoneNumber,
          agentNumber: data?.agentNumber,
          country: selectedCountry,
        },
      });
      toast.success('Successfully updated profile', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Oops something went wrong!', {
        position: 'bottom-right',
        hideProgressBar: true,
        autoClose: 3000,
      });
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const upgradePlan = async () => {
    if (!newPlan || upgradePlanMutation.isLoading) return;
    upgradePlanMutation.mutate();
  };

  const deleteUser = async () => {
    if (deleteAccountMutation.isLoading) return;
    deleteAccountMutation.mutate();
  };

  useEffect(() => {
    if (data) {
      setUser(data);
      setSelectedCountry(data.country);
    }
  }, [data]);

  useEffect(() => {
    console.log('New plan', newPlan);
  }, [newPlan]);

  if (isLoading) return null;

  return (
    <>
      <div>
        <AvatarUploader imageUrl={user?.imageUrl} readOnly={true} />
        {/* End AvatarUploader*/}

        <div className="border-top-light mt-30 mb-30" />

        <div className="col-xl-9">
          <div className="row x-gap-20 y-gap-20 mb-5">
            <div className={`col-md-6 ${isReverse && 'order-2'}`}>
              <div className="form-input ">
                <input
                  type="text"
                  name="firstName"
                  disabled
                  defaultValue={user?.firstName}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t('Dashboard.PersonalInfo.firstName')}
                </label>
              </div>
            </div>
            {/* End col-6 */}

            <div className={`col-md-6 ${isReverse && 'order-1'}`}>
              <div className="form-input ">
                <input
                  type="text"
                  name="lastName"
                  disabled
                  defaultValue={user?.lastName}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t('Dashboard.PersonalInfo.lastName')}
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
                  disabled
                  defaultValue={user?.email}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t('Dashboard.PersonalInfo.email')}
                </label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className="form-input ">
                <input
                  type="text"
                  disabled
                  name="primaryPhoneNumber"
                  defaultValue={user?.phoneNumber}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t('Dashboard.PersonalInfo.phoneNumber')}
                </label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-6">
              <div className="form-input ">
                <input
                  type="text"
                  name="agentNumber"
                  defaultValue={user?.agentNumber}
                />
                <label className="lh-1 text-16 text-light-1">
                  {t('Dashboard.PersonalInfo.agentNumber')}
                </label>
              </div>
            </div>

            <div className="col-6">
              <div className="form-input">
                <label
                  className="position-absolute lh-1 text-16 text-light-1"
                  style={{ marginTop: -8 }}
                >
                  {t('Dashboard.PersonalInfo.country')}
                </label>
                <CountryList
                  onCountrySelected={setSelectedCountry}
                  selectedItem={selectedCountry}
                />
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-6">
              <div className="form-input">
                <label className="lh-1 text-16">Plan</label>
                <UserPlansDropdown
                  value={newPlan || user?.subscription?.name}
                  onChange={val => setNewPlan(val)}
                />
              </div>
            </div>
            {/* End col-6 */}
          </div>
        </div>
        {/* End col-xl-9 */}

        <div className="d-inline-block pt-30 mr-10">
          <button
            type="submit"
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          >
            {t('Dashboard.General.saveChanges')}
            <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
        <div className="d-inline-block pt-30 mr-10">
          <button
            onClick={upgradePlan}
            disabled={upgradePlanMutation.isLoading}
            className="button h-50 px-24 -dark-1 bg-green-2 text-white"
          >
            Upgrade Plan
            <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
        <div className="d-inline-block pt-30">
          <button
            onClick={deleteUser}
            disabled={deleteAccountMutation.isLoading}
            className="button h-50 px-24 -dark-1 bg-red-1 text-white"
          >
            Delete Account
            <div className="icon-trash ml-15" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
