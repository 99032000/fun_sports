"use client";
import { deleteHobby, hobby_type, updateUser, updateUserBody } from "@/lib/api";
import type { hobby, sports_type, user } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import SportsLevel from "../signUp/SportsLevelSelector";
import HobbyDropDownList from "../signUp/HobbyDropDown";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profile = ({
  user,
  sports_types,
}: {
  user:
    | (user & {
        hobby: (hobby & {
          sports_type: {
            name: string;
          };
        })[];
      })
    | null;
  sports_types: sports_type[];
}) => {
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [hobbyList, setHobbyList] = useState<hobby_type[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    nameRef.current!.value = user!.name ?? "";
    phoneRef.current!.value = user!.phone ?? "";
    const hobbies = user!.hobby;
    if (hobbies) {
      const filteredHobbies = hobbies.map((hobby) => {
        return {
          sports_typeId: hobby.sports_typeId,
          sports_name: hobby.sports_type.name,
          level: hobby.level,
        };
      });
      setHobbyList(filteredHobbies);
    }
  }, [user]);

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

  const handleSaveOnClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //! user.phone may be null
    // check add or change hobbies
    const updateHobbies = hobbyList.filter((item) => {
      const comparedList = user!.hobby.filter((localItem) => {
        return (
          localItem.sports_typeId === item.sports_typeId &&
          localItem.level === item.level
        );
      });
      return comparedList.length === 0;
    });
    // check delete hobbies
    const deleteHobbies = user!.hobby.filter((item) => {
      const comparedList = hobbyList.filter((localItem) => {
        return localItem.sports_typeId === item.sports_typeId;
      });
      return comparedList.length === 0;
    });

    // if no change hobbies and user info return toast
    if (
      (user!.name ?? "") === nameRef.current?.value &&
      (user!.phone ?? "") === phoneRef.current?.value &&
      updateHobbies.length === 0 &&
      deleteHobbies.length === 0
    ) {
      toast.error("Emm... you didn't change anything");
      return;
    }
    setLoading(true);
    // update user

    const body: updateUserBody = {
      userId: user!.id,
      userInfo: {},
      hobbies: [],
    };
    if (
      (user!.name ?? "") !== nameRef.current?.value ||
      (user!.phone ?? "") !== phoneRef.current?.value ||
      updateHobbies.length > 0
    ) {
      if ((user!.name ?? "") !== nameRef.current!.value)
        body.userInfo.name = nameRef.current!.value;
      if ((user!.phone ?? "") !== phoneRef.current!.value)
        body.userInfo.phone = phoneRef.current!.value;
      if (updateHobbies.length > 0) body.hobbies = updateHobbies;
      const updateUserResponse = await updateUser(body);
      if (!updateUserResponse.success) {
        toast.error(updateUserResponse.error);
      } else {
        toast.success("user updated successfully");
      }
    }
    // delete hobbies
    if (deleteHobbies.length > 0) {
      const promises = deleteHobbies.map((item) => {
        return deleteHobby(item.id);
      });
     const res = await Promise.all(promises);
     const filteredResult = res.filter((item) => !item.success);
     if (filteredResult.length === 0)
       toast.success("hobbies deleted successfully");
     else toast.error("Something went wrong, please try again");
    }
    router.refresh();
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
            <a>Profile</a>
          </li>
        </ul>
      </div>
      <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
        <div>
          <div className="flex justify-between">
            <h1 className=" text-xl">User detail</h1>
            <Link href={"/login/reset-password"}>
              <button className="btn btn-accent text-white text-xs sm:text-sm btn-xs sm:btn-sm md:btn-md">
                reset password
              </button>
            </Link>
          </div>
          <div className="flex flex-row gap-4 mt-8">
            <h2 className=" my-auto">Email:</h2>
            <h2 className=" my-auto">{user?.email}</h2>
          </div>
          <div className="flex flex-row gap-4 mt-8">
            <h2 className=" my-auto">Phone:</h2>
            <input
              type="phone"
              placeholder={user?.phone ?? ""}
              className="input input-bordered w-full input-sm max-w-sm input-primary"
              ref={phoneRef}
            />
          </div>
          <div className="flex flex-row gap-4 mt-8">
            <h2 className=" my-auto">Name:</h2>
            <input
              type="text"
              placeholder={user?.name ?? ""}
              className="input input-bordered w-full input-sm max-w-sm input-primary"
              ref={nameRef}
            />
          </div>
        </div>
        <div className="divider"></div>
        <div className=" relative">
          <HobbyDropDownList
            hobbyList={hobbyList}
            setHobbyList={setHobbyList}
            sports_types={sports_types}
          />
          {sports_level()}
        </div>
        <div className="flex justify-between mt-16">
          <button
            className={
              "btn btn-xs sm:btn-sm md:btn-md btn-primary w-28 text-white " +
              (loading && " loading")
            }
            onClick={handleSaveOnClick}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
