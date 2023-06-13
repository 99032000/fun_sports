"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabase } from "@/components/providers/supabase-provider";
import { passwordSchema } from "@/utility/ZodFormat";
import toast from "react-hot-toast";
const ResetPassword = () => {
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const sessionContext = useSupabase().session;
  const [loading, setLoading] = useState(false);
  // auth variables
  const auth = supabase.auth;
  const router = useRouter();
  useEffect(() => {
    if (!sessionContext) {
      router.push("/login");
    }
  }, [sessionContext, router]);
  const handleResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      !passwordConfirmRef.current!.value ||
      !passwordConfirmRef.current!.value
    ) {
      toast.error("Please enter your password");
      return;
    }

    if (passwordRef.current!.value !== passwordConfirmRef.current!.value) {
      toast.error("Passwords do not match");
      return;
    }
    if (!passwordSchema.safeParse(passwordRef.current!.value).success) {
      toast.error("Password is not valid, must be at least 8 characters");
      return;
    }
    setLoading(true);
    const { error } = await auth.updateUser({
      password: passwordRef.current!.value,
    });
    setLoading(false);
    if (error) {
      toast.error("something wrong " + error.message);
      return;
    }
    router.push("/");
  };
  return (
    <div className="relative flex flex-col justify-center h-[85vh] overflow-hidden p-4">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 className="md:text-3xl text-xl font-semibold text-center text-primary">
          Reset password
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Password"
              className="w-full input input-bordered input-primary  sm:input-lg input-sm"
              ref={passwordRef}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered input-primary sm:input-lg input-sm"
              ref={passwordConfirmRef}
            />
          </div>
        </form>
        <div className=" mt-8">
          <button
            className="btn btn-primary btn-block md:text-lg text-sm text-white"
            onClick={handleResetPassword}
          >
            {loading && <span className="loading loading-spinner"></span>}
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
