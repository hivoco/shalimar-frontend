function Home() {
  return (
    <div className={` md:rounded-2xl  w-full  md:pt-[15vh] `}>
      <div className="flex flex-col gap-[9vh] h-full ">
        <div className="flex flex-1 flex-col justify-center items-center">
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
        <button className="rounded-[9rem]  mx-6 bg-white montserrat text-xl font-semibold text-center py-4 border-4 border-[#FFD076] mb-16">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
