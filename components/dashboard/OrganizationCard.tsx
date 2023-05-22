import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const OrganizationCard = () => {
  return (
    <div className="card bg-base-100 max-w-md shadow-xl p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className=" text-xl">Name</h1>
        <div className="flex gap-8 justify-end">
          <div className="tooltip tooltip-primary" data-tip="Edit">
            <AiFillEdit className=" text-primary text-2xl cursor-pointer" />
          </div>
          <div className="tooltip tooltip-secondary" data-tip="Delete">
            <AiFillDelete className=" text-secondary text-2xl cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <h1>Sport type</h1>
        <h2>test</h2>
      </div>
      <div className="flex justify-between">
        <h1>Phone</h1>
        <h2>test</h2>
      </div>
      <div className="flex justify-between">
        <h1>Wechat</h1>
        <h2>test</h2>
      </div>
      <div className="">
        <h1>Description</h1>
        <h2>
          test testtesttesttesttesttesttesttesttesttesttest
          testtesttesttesttesttesttesttesttesttesttest
          testtesttesttesttesttesttesttesttesttesttest
          testtesttesttesttesttesttesttesttesttest
        </h2>
      </div>
    </div>
  );
};

export default OrganizationCard;
