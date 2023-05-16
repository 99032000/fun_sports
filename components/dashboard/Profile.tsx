import type { user } from "@prisma/client";

const Profile = ({ user }: { user: user | null }) => {
  return <div>{JSON.stringify(user)}</div>;
};

export default Profile;
