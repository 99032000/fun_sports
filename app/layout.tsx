import SupabaseProvider from "@/components/providers/supabase-provider";
import NavBar from "@/components/navBar/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { getSession } from "@/lib/client/supabaseServer";
import prisma from "@/lib/client/prismaClient";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fun social sports",
  description: "Create your own social!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const userId = session?.user.id;
  const user = session?.user.id
    ? await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
    : null;
  return (
    <html lang="en" data-theme="cupcake">
      <SupabaseProvider session={session}>
        <body className="relative">
          <Image
            src="/images/background.jpg"
            fill
            alt="background"
            className=" -z-10 object-cover"
          />
          <Toaster />
          <NavBar session={session} user={user} />
          <section className="mx-auto mt-4 px-4 bg-transparent min-h-screen">
            {children}
          </section>
        </body>
      </SupabaseProvider>
    </html>
  );
}
