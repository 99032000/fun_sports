import SignUp from "../../components/signUp/SignUp";
import prisma from "@/lib/client/prismaClient";

const Page = async () => {
  const response = await prisma.sports_type.findMany();
  return <SignUp sports_types={response} />;
};

export default Page;
