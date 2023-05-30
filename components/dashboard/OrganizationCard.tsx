/* eslint-disable @next/next/no-img-element */
"use client";

import { deleteOrganization } from "@/lib/api";
import type { organization, sports_type } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const OrganizationCard = ({
  organization,
  sports_types,
}: {
  organization: organization;
  sports_types: sports_type[];
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getSportsTypeName = (id: number) => {
    return sports_types.find((type) => type.id === id)?.name;
  };
  const handleDeleteOnClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const result = await deleteOrganization(organization.id);
    if (result.success) {
      router.refresh();
    } else {
      toast.error("fail to delete organization.");
    }
    document.getElementById("my-modal")?.click();
    setLoading(false);
  };
  const handleCloseOnClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    document.getElementById("my-modal")?.click();
  };

  const modalElement = () => (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete ?
          </h3>
          <div className="modal-action">
            <div className="flex gap-4 mt-8">
              <button
                className={
                  "btn sm:btn-sm md:btn-md btn-primary w-28 text-white "
                }
                onClick={handleCloseOnClick}
              >
                No
              </button>
              <button
                className={
                  "btn sm:btn-sm md:btn-md btn-secondary w-28 text-white " +
                  (loading && " loading")
                }
                onClick={handleDeleteOnClick}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <div className="card bg-base-100 max-w-md shadow-xl p-4 flex flex-col gap-4 w-full sm:min-w-[350px]">
      {modalElement()}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <h1 className=" text-2xl my-auto">{organization.name}</h1>
          {organization.avatar_url && (
            <img
              className=" rounded-full w-14 h-14"
              src={organization.avatar_url}
              alt="avatar"
            />
          )}
        </div>
        <div className="flex gap-8 justify-end">
          <div className="tooltip tooltip-primary" data-tip="Edit">
            <AiFillEdit className=" text-primary text-2xl cursor-pointer" />
          </div>
          <div className="tooltip tooltip-secondary" data-tip="Delete">
            <label htmlFor="my-modal">
              <AiFillDelete className=" text-secondary text-2xl cursor-pointer" />
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <h1>Sport type</h1>
        <h2>{getSportsTypeName(organization.sports_typeId)}</h2>
      </div>
      <div className="flex justify-between gap-4">
        <h1>Phone</h1>
        <h2>{organization.phone}</h2>
      </div>
      <div className="flex justify-between gap-4">
        <h1>Wechat</h1>
        <h2>{organization.wechatId}</h2>
      </div>
      <div className="">
        <h1>Description</h1>
        <h2 className=" mt-2 break-words">{organization.description}</h2>
      </div>
    </div>
  );
};

export default OrganizationCard;
