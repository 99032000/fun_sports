"use client";
import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { getUserByEmail } from "@/lib/api";
import { emailSchema, passwordSchema } from "@/utility/ZodFormat";
import type { sports_type } from "@prisma/client";
import SportsLevel from "./SportsLevelSelector";
import { AiOutlinePlus } from "react-icons/ai";
import { updateUser } from "@/lib/api";
import type { updateUserBody, hobby_type } from "@/lib/api";
import { useRouter } from "next/navigation";

const Page = ({ sports_types }: { sports_types: sports_type[] }) => {
  // input reference
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  // state variables
  const [loading, setLoading] = useState(false);
  const [warningList, setWarningList] = useState<String[]>([]);
  const [hobbyList, setHobbyList] = useState<hobby_type[]>([]);
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();
  // auth variables
  // const session = supabase.auth.getSession();
  const auth = supabase.auth;

  // sign up function
  const signUp = async (email: string, password: string, name: string) => {
    setLoading((pre) => !pre);
    const userResponse = await getUserByEmail(email);
    if (userResponse.success && userResponse.data) {
      setLoading((pre) => !pre);
      toast.error("the email is already in use, haiyah");
      return;
    }
    const result = await auth.signUp({
      email: email,
      password: password,
    });
    if (result.error) {
      setLoading((pre) => !pre);
      toast.error(result.error.message);
      return;
    }
    //----------------------------------------------------------------

    const body: updateUserBody = {
      userId: result.data.user!.id,
      userInfo: {},
      hobbies: [],
    };
    body.userInfo = { name: nameRef.current!.value };
    body.hobbies = hobbyList;

    const updateUserResponse = await updateUser(body);
    if (!updateUserResponse.success) {
      toast.error(updateUserResponse.error);
    }
    setLoading((pre) => !pre);
    toast.success(
      "registered successfully, have fun!. Please confirm your email"
    );
    router.replace("/login");
  };

  // validate rules

  // handler submit function button
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirm = confirmRef.current?.value;
    let tmpList = [];

    // check if all fields are filled and valid
    if (!name) tmpList.push("Name is required");
    if (!passwordSchema.safeParse(password).success)
      tmpList.push("Password is invalid, must be at least 6 characters");
    if (password !== confirm) {
      tmpList.push("Passwords do not match");
    }
    if (!confirm) tmpList.push("Confirm password is required");
    const result = emailSchema.safeParse(email);
    if (!result.success) tmpList.push("Email is invalid");
    setWarningList(tmpList);
    if (tmpList.length === 0) {
      signUp(email!, password!, name!);
    }
  };
  //handle hobby plus button
  const handleHobbyListOnClick = (e: MouseEvent, type: sports_type) => {
    e.preventDefault();
    // init list
    if (
      hobbyList.filter((item) => item.sports_name === type.name).length === 0
    ) {
      setHobbyList((pre) => [
        ...pre,
        { sports_typeId: type.id, sports_name: type.name, level: -1 },
      ]);
    }
  };

  const hobbyDropDownList = () => (
    <label className="label">
      <span className="text-base label-text">Hobbies</span>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-circle btn-sm btn-primary mb-1">
          <AiOutlinePlus className="w-6 h-6 text-white" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {sports_types.map((type) => {
            return (
              <li
                key={type.id}
                onClick={(e) => handleHobbyListOnClick(e, type)}
              >
                <a>{type.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
  );
  const sports_level = () => {
    return hobbyList.map((hobby) => {
      return (
        <SportsLevel
          key={hobby.sports_typeId}
          hobby={hobby}
          setHobbyList={setHobbyList}
        />
      );
    });
  };
  return (
    <div className="relative flex flex-col justify-center h-full overflow-hidden bg-base-100 p-4 ">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-primary">
          Fun Social
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Name*</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full input input-bordered input-primary"
              ref={nameRef}
            />
          </div>
          <div>
            {hobbyDropDownList()}
            {sports_level()}
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Email*</span>
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
              <span className="text-base label-text">Password*</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
              ref={passwordRef}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered input-primary"
              ref={confirmRef}
            />
          </div>
        </form>
        {warningList.length > 0
          ? warningList.map((warning, index) => (
              <div key={index} className="alert alert-warning shadow-lg mt-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{warning}</span>
                </div>
              </div>
            ))
          : null}
        <button
          className={
            "btn btn-block btn-primary my-8 shadow" +
            (loading ? " disabled loading" : "")
          }
          onClick={handleSubmit}
        >
          Sign Up
        </button>

        <span>
          Already have an account ?
          <Link href="login" className=" text-primary ml-4">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Page;
