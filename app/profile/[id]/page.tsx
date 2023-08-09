import { UserProfile } from "@/common.types";
import ProfilePage from "@/components/ProfilePage";
import { getUserProjects } from "@/lib/actions";

type Props = {
  params: {
    id: string;
  };
};

const userProfile = async ({ params }: Props) => {
  const res = (await getUserProjects(params.id, 100)) as { user: UserProfile };

  if (!res.user)
    return (
      <p className="no-result-text">Failed to load the user information</p>
    );

  return <ProfilePage user={res?.user} />;
};

export default userProfile;
