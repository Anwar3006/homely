"use client";
import { PageLoader } from "@/components/Loader";
import SettingsForm from "@/components/SettingsForm";
import { useUserAuth, useUserAuthMutation } from "@/hooks/api/useUserAuth.hook";

const ManagerSettingsPage = () => {
  const { data: authUser, isPending } = useUserAuth();
  const { mutateAsync } = useUserAuthMutation();

  const { userInfo } = authUser?.data || {};

  if (isPending) return <PageLoader />;

  const initialData = {
    name: userInfo?.name,
    email: userInfo?.email,
    phoneNumber: userInfo?.phoneNumber,
  };

  const handleSubmit = async (data: typeof initialData) => {
    try {
      await mutateAsync({
        cognitoId: userInfo?.cognitoId,
        ...data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SettingsForm
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="manager"
    />
  );
};

export default ManagerSettingsPage;
