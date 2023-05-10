"use client";
import { useState, useRef, ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
const Page = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const signUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/signup");
  };
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-primary p-4">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-primary">
          DaisyUI
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
              ref={emailRef}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
              ref={passwordRef}
            />
          </div>
          <button className=" text-sm hover:text-secondary btn btn-link p-0">
            Forget Password?
          </button>
          <div className=" mt-8">
            <button className="btn btn-primary btn-block">Login</button>
            <button
              className="btn btn-secondary btn-block mt-4"
              onClick={signUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
