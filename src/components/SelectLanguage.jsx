import { useState } from "react";

function SelectLanguage({ setLanguage, language,initialise }) {
  
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


  // 'hindi': 'hindi.txt',
  // 'tamil': 'tamil.txt',
  // 'marathi': 'marathi.txt',
  // 'bengali': 'bengali.txt',
  // 'telugu': 'telugu.txt',
  // 'kannada': 'kannda.txt',
  // 'malayalam' : 'malayalam.txt'


  const [clickedDivIndex, setClickedDivIndex] = useState(null);

  const handleClick = (index) => {
    setClickedDivIndex(index);
    // console.log(languages[index].name);


    setTimeout(() => {
      setLanguage(languages[index].name);
    }, 1 *1000); // 1 sec lag so that the tag appears
  };

  return (
    <div className="min-w-72 rounded-xl flex flex-col gap-[11px]  p-[17.5px] opacity-100  shadow-[0_2px_6px_0px_#00000040]  bg-white absolute top-1/2   md:translate-x-[1%]  -translate-y-1/2  z-50">
      <div className="py-[4.5px] flex  gap-[4.5px] items-center ">
        <img src="/svgs/globe.svg" alt="globe" />
        <p className=" font-Montserrat text-xs leading-[16.25px] font-normal  text-left text-[#1E1E1E]">
          Select your preferred <br /> mode of language
        </p>
      </div>

      <div className="flex flex-col gap-1 ">
        {languages.map((language, index) => {
          return (
            <div
              key={index}
              className="flex items-center py-[6px] gap-1  cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <img src={language?.icon} alt="language icon" />

              <div className="flex w-full justify-between items-center">
                <span className={`flex flex-col items-start font-Montserrat text-[11.22px] font-medium leading-[15.71px] text-center  ${index>1?"text-[#16161680]":"text-[#161616]"}`}>
                  {language?.name}

                  {index > 1 && (
                    <span className="text-[#161616] text-[8.4px] font-medium leading-3 text-center">
                      {" "}
                      Beta
                    </span>
                  )}
                </span>

                <div
                  className={`self- w-4 h-4 border rounded-sm flex items-center justify-center ${
                    clickedDivIndex === index
                      ? "bg- border-black"
                      : "border-black/50"
                  }`}
                >
                  {clickedDivIndex === index && (
                    <img src="/svgs/check.svg" alt="check" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="flex p-1 items-center">
        <button
          onClick={() => setLanguage("English")}
          className="w-1/2 font-medium font-Montserrat text-sm leading-[19.6px] text-center text-[#161616] py-2  "
        >
          English
        </button>


        <button
          onClick={() => setLanguage("Hindi")}
          className="w-1/2 font-normal  font-Eczar text-sm leading-[19.6px] text-center text-[#161616] py-2"
        >
          हिन्दी
        </button>
      </div> */}
    </div>
  );
}

export default SelectLanguage;
