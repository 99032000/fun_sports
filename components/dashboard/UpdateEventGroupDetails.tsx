"use client";
import { event_group } from "@/lib/api";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  group: event_group[];
  setGroup: Dispatch<SetStateAction<event_group[]>>;
};
const UpdateEventGroupDetails = ({ group, setGroup }: Props) => {
  const handleGroupAddOnClick = () => {
    setGroup((pre) => [
      ...pre,
      {
        name: "",
        amount: 1,
        booking_amount: 0,
      },
    ]);
  };
  const handleGroupName = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setGroup((pre) => {
      pre[index].name = e.target.value;
      return pre;
    });
  };
  const handleGroupAmount = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setGroup((pre) => {
      const amount = parseInt(e.target.value);
      if (amount) pre[index].amount = amount;
      else pre[index].amount = 0;
      return pre;
    });
  };

  return (
    <>
      <div className="flex gap-4 md:mt-8 mt-4 w-full">
        <div className="flex gap-4">
          <h2 className=" my-auto text-sm sm:text-lg">Group details*</h2>
          <AiOutlinePlus
            className="w-6 h-6 bg-primary text-white rounded-full cursor-pointer"
            onClick={handleGroupAddOnClick}
          />
        </div>
      </div>
      <div className=" min-w-full">
        {group.length > 0 ? (
          group.map((item, index) => {
            return (
              <div className="flex gap-4" key={index}>
                <div className=" md:mt-8 mt-4">
                  {index === 0 && (
                    <h2 className=" my-auto text-sm sm:text-lg mb-2">Name:*</h2>
                  )}
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm max-w-sm input-primary"
                    defaultValue={item.name}
                    onChange={(e) => handleGroupName(e, index)}
                  />
                </div>
                <div className="md:mt-8 mt-4">
                  {index === 0 && (
                    <h2 className=" my-auto text-sm sm:text-lg mb-2">
                      Amount:*
                    </h2>
                  )}
                  <input
                    type="number"
                    className="input input-bordered w-full input-sm max-w-[100px] input-primary"
                    defaultValue={item.amount}
                    min={item.booking_amount}
                    onChange={(e) => handleGroupAmount(e, index)}
                  />
                </div>
                <div className="md:mt-8 mt-4">
                  {index === 0 && (
                    <h2 className=" my-auto text-sm sm:text-lg mb-2">
                      Booked:*
                    </h2>
                  )}
                  <input
                    type="number"
                    className="input input-bordered w-full input-sm max-w-[100px] input-primary"
                    defaultValue={item.booking_amount}
                    disabled
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="mockup-code  bg-primary text-primary-content mt-4">
            <pre data-prefix=">">
              <code>Click the add icon to add your group :)</code>
            </pre>
            <pre data-prefix=">">
              <code>Waiting...</code>
            </pre>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateEventGroupDetails;
