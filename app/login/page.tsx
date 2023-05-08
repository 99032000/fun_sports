import { GetServerSideProps } from "next";

const page = () => {
  return (
    <div className=" w-screen h-screen flex justify-center align-middle">
      <div className="card lg:card-side bg-base-100 shadow-xl ">
        <figure>
          <img src="/images/badmintion.png" alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default page;
