"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { emailSchema, passwordSchema } from "@/utility/ZodFormat";
import toast from "react-hot-toast";
const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [supabase] = useState(() => createBrowserSupabaseClient());
  // auth variables
  const auth = supabase.auth;
  const router = useRouter();
  const handleSignUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/signup");
  };
  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    // if no email or password, return
    if (!email || !password) return;
    // check if email is valid and password is valid
    if (!emailSchema.safeParse(email).success) {
      toast.error("Email is not valid");
      return;
    }

    if (!passwordSchema.safeParse(password).success) {
      toast.error("Password is not valid");
      return;
    }

    const result = await auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(result);
    if (result.error) {
      toast.error(result.error.message);
      return;
    }
    router.replace("/");
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
            <button
              className="btn btn-primary btn-block"
              onClick={handleSignIn}
            >
              Login
            </button>
            <button
              className="btn btn-secondary btn-block mt-4"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
