import { useState } from "react";

function SelectLanguage({ setLanguage, language }) {
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

  // const [clickedDivIndex, setClickedDivIndex] = useState(null);

  // const handleClick = (index) => {
  //   setClickedDivIndex(index);
  //   // console.log(languages[index].name);

  //   setTimeout(() => {
  //     setLanguage(languages[index].name);
  //   }, 1 * 2000); // 2 sec lag so that the tick appears
  // };



  const languagesUI = languages.map((lang, index) => {
    return (
      <div
        onClick={() => {
          setTimeout(()=>setLanguage(lang?.name),500);
        }}
        key={index}
        className={`bg-white/35
        hover:bg-[#494949]/60 hover:border-[3px] hover:border-white    max-w-[136px] md:max-w-32 w-[136px] max-h-[116px]  flex flex-col gap-y-3 items-center justify-center  shadow-[0px_2px_6px_0px_#0000001A] rounded-[10px] py-[14px] px-8
        `}
      >
        <img className="h-12" src={lang.icon} alt="language icon" />

        <span className="text-white font-Poppins text-xl font-medium text-center select-none">
          {lang.name}
        </span>
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-11 py-8 h-svh justify-center transition-all duration-500 opacity-100 ease-in-out">
      <h1 className="font-Poppins text-[28.1px] font-semibold leading-[38.2px] text-center text-white select-none">
        Choose Language
      </h1>

      <div className="flex flex-wrap gap-5 items-center justify-center">
        {languagesUI}
      </div>
    </div>
  );
}

export default SelectLanguage;
