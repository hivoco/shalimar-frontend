import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className={` relative md:rounded-2xl  w-full  md:pt-[15vh]  h-full `}>
      <div className="flex flex-col gap-[9vh]  h-full ">
        <div className="flex flex-1 flex-col justify-center items-center md:-mt-24 ">
          <img
            className="h-[11.375rem]"
            src="/svgs/logo.svg"
            alt="logo"
            srcSet=""
          />
          <img
            className="h-[5.93rem]"
            src="/images/logo-text.png"
            alt="logo-text"
            srcSet=""
          />
        </div>
        <button
          onClick={() => navigate("/explore-your-experience")}
          className="rounded-[9rem] absolute bottom-[70px] right-0 m-auto left-0  mx-6 bg-white montserrat text-xl font-semibold text-center py-4 border-[3px] border-[#FFD076] hover:shadow-md "
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
