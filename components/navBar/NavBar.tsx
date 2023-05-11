"use client";

import { useSupabase } from "../providers/supabase-provider";
import { supabaseClient } from "@/lib/client/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
const NavBar = ({ session }: { session: Session | null }) => {
  // const { supabase } = useSupabase();
  const titleList = ["Home", "Market", "Contact me"];
  // const [session, setSession] = useState<Session | null>(null);
  const { supabase } = useSupabase();
  useEffect(() => {
    async function getData() {
      if (session) {
        const { user, error }: any = await supabaseClient
          .from("user")
          .select("email")
          .eq("id", session.user.id);
        console.log(user);
      }
    }
    getData();
  }, [supabase]);

  return (
    <div className="navbar bg-base-100 shadow-xl z-10">
      <div className="navbar-start">
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
            {titleList.map((title, index) => (
              <li key={index}>
                <Link href="/">{title}</Link>
              </li>
            ))}
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
        <ul className="menu menu-horizontal px-1">
          {titleList.map((title, index) => (
            <li key={index}>
              <Link href="/">{title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {session ? (
          <> avatar</>
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
