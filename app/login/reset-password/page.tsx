"use client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ResetPassword from "@/components/login/ResetPassword";

//!TODO fix loading issue
const Page = () => {
  const router = useRouter();
  const supabase = useSupabase();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (!supabase.session) {
      router.push("/");
    }
  }, [supabase.session, router]);
  if (loading) {
    return "loading";
  }
  return <ResetPassword />;
};

export default Page;
