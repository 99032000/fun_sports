"use client";
import { Dispatch, SetStateAction } from "react";
import type { hobby_type } from "@/lib/api";
import { SportsLevelName } from "@/utility/Data_defination";
import { AiFillDelete } from "react-icons/ai";
const SportsLevel = ({
  hobby,
  setHobbyList,
}: {
  hobby: hobby_type;
  setHobbyList: Dispatch<SetStateAction<hobby_type[]>>;
}) => {
  const handleDelete = () => {
    setHobbyList((pre) => {
      return pre.filter((item) => item.sports_typeId !== hobby.sports_typeId);
    });
  };
  const handleSelect = (e: any) => {
    setHobbyList((pre) => {
      return pre.map((item) => {
        if (item.sports_typeId === hobby.sports_typeId) {
          return {
            ...item,
            level: parseInt(e.target.value),
          };
        }
        return item;
      });
    });
  };
  return (
    <div className=" my-4 flex flex-row  max-w-full justify-between">
      <div className=" flex flex-row gap-4 flex-1">
        <p className=" w-fit">{hobby.sports_name}</p>
        <select
          className="select md:select-sm w-full max-w-[150px] sm:max-w-[300px] md:max-w-[350px] select-primary select-xs"
          defaultValue={hobby.level}
          onChange={handleSelect}
        >
          <option disabled value={-1}>
            Choose a level
          </option>
          {SportsLevelName.map((sport, index) => (
            <option key={index} value={index}>
              {sport}
            </option>
          ))}
        </select>
      </div>
      <AiFillDelete
        className=" text-secondary w-6 h-6 cursor-pointer hover:text-secondary-focus"
        onClick={handleDelete}
      />
    </div>
  );
};

export default SportsLevel;
