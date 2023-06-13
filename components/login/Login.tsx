"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { emailSchema, passwordSchema } from "@/utility/ZodFormat";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
const Login = ({ redirectUrl }: { redirectUrl: string | undefined }) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [supabase] = useState(() => createBrowserSupabaseClient());
  // auth variables
  const auth = supabase.auth;
  const router = useRouter();
  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (loading) {
      return;
    }
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
    setLoading(true);
    const result = await auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.replace("/");
  };
  const handleForgotPasswordClick = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    // if no email, return
    if (!email) return;
    // check if email is valid
    if (!emailSchema.safeParse(email).success) {
      toast.error("Email is not valid");
      return;
    }
    const result = await auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    if (result.error) {
      toast.error(result.error.message);
      return;
    }
    toast.success("Email has sent, please check your email");
  };
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-transparent p-4">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <div className="flex gap-4 justify-center">
          <h1 className="text-3xl font-semibold text-center text-primary">
            Login
          </h1>
          <Image
            src="/images/bird-parrot.gif"
            width={36}
            height={6}
            alt="parrot"
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
              autoComplete="on"
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
          <button
            className=" text-sm hover:text-secondary btn btn-link p-0 text-gray-800"
            onClick={handleForgotPasswordClick}
          >
            Forget Password?
          </button>
          <div className="">
            <button
              className={
                "btn btn-primary my-4 shadow btn-block" +
                (loading ? " btn-disabled" : "")
              }
              onClick={handleSignIn}
            >
              {loading && <span className="loading loading-spinner"></span>}
              Login
            </button>
            <Link href="signup">
              <button className="btn btn-secondary btn-block">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
