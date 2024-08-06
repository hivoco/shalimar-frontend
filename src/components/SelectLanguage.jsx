function SelectLanguage({ setLanguage }) {
  return (
    <div className="opacity-100 rounded-[10px] shadow-[0_2px_6px_0px_#00000040]  bg-white absolute top-1/2 translate-x-[3%] md:translate-x-[1%]  -translate-y-1/2  z-50">
      {/* <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(0px)",
        }}
        className="absolute inset-0 blur-md "
      ></div> */}

      <div className="px-5 py-11 flex flex-col gap-2 items-center ">
        <img
          className=""
          src="/images/SelectLang.svg"
          alt="image hindi english "
        />

        <p className=" font-Montserrat text-[13px] font-normal leading-[18px] text-center text-[#1E1E1E]">
          Select your preferred mode of language
        </p>
      </div>

      <div className="flex p-1 items-center">
        <button
          onClick={() => setLanguage("English")}
          className="w-1/2  font-Montserrat text-sm leading-[19.6px] text-center text-[#161616] py-2  "
        >
          English
        </button>

        <span className="h-6 border-r-[1px] border-[#9A9A9ACC] mx-1"></span>

        <button
          onClick={() => setLanguage("Hindi")}
          className="w-1/2  font-Montserrat text-sm leading-[19.6px] text-center text-[#161616] py-2"
        >
          Hindi
        </button>
      </div>
    </div>
  );
}

export default SelectLanguage;
