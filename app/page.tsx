"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { headers, cookies } from "next/headers";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
export const revalidate = 0;

export default function Home() {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const auth = supabase.auth;
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetch("/api/posts");
      const posts = await data.json();
      console.log(posts);
      return posts;
    };
    fetchPosts().then((response) => setPost(response));
  }, []);
  const signUp = () => {
    auth
      .signUp({
        email: "damon.pengyu.chen@gmail.com",
        password: "112123123",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signIn = () => {
    auth
      .signInWithPassword({
        email: "damon.pengyu.chen@gmail.com",
        password: "112123123",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signOut = () => {
    auth
      .signOut()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main>
      <button className=" mr-2" onClick={signUp}>
        Signup
      </button>
      <button onClick={signIn} className=" mr-2">
        SignIn
      </button>
      <button onClick={signOut}>SignOut</button>
      {post.map((post) => JSON.stringify(post))}
    </main>
  );
}
