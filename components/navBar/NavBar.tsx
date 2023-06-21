"use client";

import { useSupabase } from "../providers/supabase-provider";
import Image from "next/image";
import Link from "next-intl/link";
import type { Session } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import type { user } from "@prisma/client";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocalSwitcher";

const NavBar = ({
  session,
  user,
}: {
  session: Session | null;
  user: user | null;
}) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const pathName = usePathname();
  const t = useTranslations("navigation");

  const titleList = [
    { name: t("home"), href: "/" },
    { name: t("myEvent"), href: "/dashboard/event" },
    { name: t("myBooking"), href: "/dashboard/booking" },
    { name: t("contactMe"), href: "/contact-me" },
  ];
  const dashboardTitleList = [
    { name: t("home"), href: "/" },
    { name: t("profile"), href: "/dashboard" },
    { name: t("myEvent"), href: "/dashboard/event" },
    { name: t("myBooking"), href: "/dashboard/booking" },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    router.refresh();
  };
  const handleOnClick = () => {
    const doc = document.body;
    doc.blur();
  };
  const getTitles = () => {
    let titles = titleList;
    if (pathName.startsWith("/dashboard")) titles = dashboardTitleList;
    return titles.map((title, index) => (
      <li key={index} onClick={handleOnClick}>
        <Link href={title.href}>{title.name}</Link>
      </li>
    ));
  };
  //!TODO close dropdown after click on
  return (
    <div className="navbar bg-base-100 shadow-lg z-20">
      <div className="navbar-start z-50">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {getTitles()}
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl" href={"/"}>
          <Image
            src={"/images/logo.gif"}
            alt="logo"
            width={30}
            height={30}
            className=" mr-2"
          />
          Fun Social Sports
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{getTitles()}</ul>
      </div>
      <div className="navbar-end">
        <LocaleSwitcher />
        {session ? (
          <div className="dropdown dropdown-bottom dropdown-end cursor-pointer z-50">
            <div className="avatar placeholder" tabIndex={0}>
              <div className=" bg-primary text-white rounded-full w-12 hover:bg-primary-focus">
                <span className=" text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/dashboard"}>{t("dashboard")}</Link>
              </li>
              <li>
                <Link href={"/dashboard/booking"}>{t("myBooking")}</Link>
              </li>
              <li>
                <a onClick={handleSignOut}>{t("signout")}</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn btn-primary" href="/login">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
