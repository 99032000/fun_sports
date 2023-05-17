"use client";

import { hobby_type } from "@/lib/api";
import { sports_type } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { AiOutlinePlus } from "react-icons/ai";
const HobbyDropDownList = ({
  hobbyList,
  setHobbyList,
  sports_types,
}: {
  hobbyList: hobby_type[];
  setHobbyList: Dispatch<SetStateAction<hobby_type[]>>;
  sports_types: sports_type[];
}) => {
  const handleHobbyListOnClick = (
    e: { preventDefault: () => void },
    type: sports_type
  ) => {
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
  return (
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
};

export default HobbyDropDownList;
