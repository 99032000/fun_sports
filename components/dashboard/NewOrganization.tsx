/* eslint-disable @next/next/no-img-element */
"use client";
import { upsertOrganization, upsertOrganizationBody } from "@/lib/api";
import type { sports_type } from "@prisma/client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next-intl/client";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
type props = {
  userId: string;
  sports_types: sports_type[];
};

function NewOrganization({ userId, sports_types }: props) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const wechatRef = useRef<HTMLInputElement>(null);
  const sportsTypeRef = useRef<HTMLSelectElement>(null);
  const uploadAvatarRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [viewAvatar, setViewAvatar] = useState<any | undefined>(undefined);
  const uploadImages = async (e: any) => {
    if (e.target.files.length > 0) {
      setViewAvatar(e.target.files[0]);
    } else {
      setViewAvatar(undefined);
    }
  };

  const handleSaveButtonClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const name = nameRef.current!.value;
    const phone = phoneRef.current!.value;
    const sportsType = parseInt(sportsTypeRef.current!.value);
    const description = descriptionRef.current!.value;
    const avatar = uploadAvatarRef.current!.value;
    const wechatId = wechatRef.current!.value;
    // check input fields
    if (!name) {
      toast.error("name can't be empty.");
      return;
    }
    if (!phone) {
      toast.error("phone can't be empty.");
      return;
    }
    if (sportsType < 0) {
      toast.error("sports type can't be empty.");
      return;
    }
    if (!description) {
      toast.error("description can't be empty.");
      return;
    }
    // create a new organization
    setLoading(true);
    const body: upsertOrganizationBody = {
      name,
      wechatId,
      phone,
      sports_typeId: sportsType,
      description,
      userId,
    };
    const result = await upsertOrganization(body);
    if (!result.success) {
      toast.error("something wrong...");
      setLoading(false);
      return;
    }
    toast.success("create organization successfully");
    // upload the avatar image
    if (!avatar) {
      setLoading(false);
      return;
    }
    const uploadResult = await supabase.storage
      .from("public")
      .upload(`${userId}/${result.data.id}/avatar`, viewAvatar);
    if (uploadResult.error) {
      toast.error("something wrong when uploading avatar");
      return;
    }

    const getUrl = supabase.storage
      .from("public")
      .getPublicUrl(uploadResult.data!.path);
    const upsertResult = await upsertOrganization({
      id: result.data.id as number,
      avatar_url: getUrl.data.publicUrl,
    });
    if (upsertResult.success) {
      toast.success("upload avatar successful");
      router.replace("/dashboard/event");
    } else {
      toast.error("upload avatar failed");
    }

    setLoading(false);
  };
  return (
    <div className="">
      <div className="text-sm md:text-lg breadcrumbs">
        <ul>
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Event</a>
          </li>
          <li>
            <a>New Organization</a>
          </li>
        </ul>
      </div>
      <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
        <h1 className=" text-xl">New Organization</h1>
        <div className="grid grid-cols-1 grid-flow-row-dense auto-cols-max gap-4 lg:grid-cols-2">
          <div className="flex flex-row gap-4 mt-8">
            <h2 className=" my-auto text-sm sm:text-lg">Name:*</h2>
            <input
              className="input input-bordered w-full input-sm max-w-sm input-primary"
              ref={nameRef}
            />
          </div>
          <div className="flex flex-row gap-4 md:mt-8 mt-4">
            <h2 className=" my-auto text-sm sm:text-lg">Phone:*</h2>
            <input
              type="phone"
              className="input input-bordered w-full input-sm max-w-sm input-primary"
              ref={phoneRef}
            />
          </div>
          <div className="flex flex-row gap-4 md:mt-8 mt-4">
            <h2 className=" my-auto text-sm sm:text-lg">WeChat:</h2>
            <input
              type="phone"
              className="input input-bordered w-full input-sm max-w-sm input-primary"
              ref={wechatRef}
            />
          </div>
          <div className="flex flex-row gap-4 md:mt-8 mt-4">
            <h2 className=" my-auto text-sm sm:text-lg">Sports_type:*</h2>
            <select
              className="select w-full max-w-max sm:max-w-[300px] md:max-w-[350px] select-primary select-sm"
              defaultValue={-1}
              ref={sportsTypeRef}
            >
              <option disabled value={-1}>
                Choose a sport
              </option>
              {sports_types.map((sport, index) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-8 flex-wrap">
          <h2 className=" my-auto text-sm sm:text-lg">Upload avatar:</h2>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs file-input-sm md:file-input-md"
            onChange={uploadImages}
            accept="image/*"
            ref={uploadAvatarRef}
          />
        </div>
        {viewAvatar && (
          <div className="mt-8">
            <img
              src={URL.createObjectURL(viewAvatar)}
              alt="your image"
              className=" w-24 h-24 rounded-full"
            />
          </div>
        )}
        <div className="flex flex-row gap-4 mt-8 flex-wrap">
          <h2 className=" my-auto">Description:*</h2>
          <textarea
            placeholder="Describe your organization"
            className="textarea textarea-bordered textarea-lg w-full max-w-lg textarea-primary"
            ref={descriptionRef}
          ></textarea>
        </div>
        <div>
          <button
            className={
              "btn btn-primary my-8 shadow" +
              (loading ? " disabled loading" : "")
            }
            onClick={handleSaveButtonClick}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewOrganization;
