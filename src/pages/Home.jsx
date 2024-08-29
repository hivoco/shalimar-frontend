import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className={`w-full  md:rounded-2xl md:pt-16  `}>
      <div className="flex flex-col gap-[9rem] pt-60 pb-[70px] md:p-0  ">
        <div className="flex flex-1 flex-col justify-center items-center ">
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
          className="rounded-[9rem]  mx-6 bg-white font-Poppins text-xl font-semibold text-center py-4  border-2 border-[#F7F7F7]/50  mb-16 hover:shadow-md"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
