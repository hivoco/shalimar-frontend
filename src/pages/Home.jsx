import React from "react";

function Home() {
  return (
    <div
      className={`bg-[url('/gif/bg-gif.gif')] bg-cover bg-no-repeat h-full md:rounded-2xl p-6 `}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-1 flex-col justify-center items-center ">
          <img src="/svgs/logo.svg" alt="logo" srcSet="" />
          <img src="/images/logo-text.png" alt="logo-text" srcSet="" />
        </div>
        <button className="rounded-full w-full bg-white montserrat text-xl font-semibold text-center p-4 border-4 border-[#FFD076] mb-[70px] ">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
