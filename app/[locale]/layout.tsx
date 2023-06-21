import SupabaseProvider from "@/components/providers/supabase-provider";
import NavBar from "@/components/navBar/NavBar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getSession } from "@/lib/client/supabaseServer";
import prisma from "@/lib/client/prismaClient";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { createTranslator, NextIntlClientProvider } from "next-intl";

export const metadata = {
  title: "Fun social sports",
  description: "Create your own social!",
};
async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
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
  const messages = await getMessages(locale);

  return (
    <html lang={locale} data-theme="cupcake">
      <SupabaseProvider session={session}>
        <body className="relative">
          <NextIntlClientProvider locale={locale} messages={messages}>
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
          </NextIntlClientProvider>
        </body>
      </SupabaseProvider>
    </html>
  );
}
