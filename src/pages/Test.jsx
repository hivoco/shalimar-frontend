const Test = () => {
  const languages = [
    { icon: "/svgs/english.svg", name: "English" },
    { icon: "/svgs/hindi.svg", name: "Hindi" },
    { icon: "/svgs/tamil.svg", name: "Tamil" },
    { icon: "/svgs/marathi.svg", name: "Marathi" },
    { icon: "/svgs/bengali.svg", name: "Bengali" },
    { icon: "/svgs/kannada.svg", name: "Kannada" },
    { icon: "/svgs/telugu.svg", name: "Telugu" },
    { icon: "/svgs/malayalam.svg", name: "Malayalam" },
  ];

  const languagesUI = languages.map((language, index) => {
    return (
      <div
        key={index}
        className="hover:bg-[#494949]/60 hover:border-[3px] hover:border-white  max-w-[136px] md:max-w-32 w-[136px] max-h-[116px]  flex flex-col gap-y-3 items-center justify-center bg-white/35 shadow-[0px_2px_6px_0px_#0000001A] rounded-[10px] py-[14px] px-8"
      >
        <img className="h-12" src={language.icon} alt="language icon" />

        {/* <svg
          width="48"
          height="48"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.90938"
            y="2.01729"
            width="50.4"
            height="50.4"
            rx="25.2"
            stroke="white"
            stroke-width="2.4"
          />
          <path
            d="M31.5497 33.3798H22.661L21.1337 37.7173H17.4988L25.1046 16.4577H29.1366L36.7424 37.7173H33.077L31.5497 33.3798ZM30.6028 30.6613L27.1206 20.6729L23.6079 30.6613H30.6028Z"
            fill="white"
          />
        </svg> */}

        <span className="text-white font-Poppins text-xl font-medium text-center select-none">
          {language.name}
        </span>
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-11 py-8 h-svh justify-center">
      <h1 className="font-Poppins text-[28.1px] font-semibold leading-[38.2px] text-center text-white select-none">
        Choose Language
      </h1>

      <div className="flex flex-wrap gap-5 items-center justify-center">
        {languagesUI}
      </div>
    </div>
  );
};

export default Test;
