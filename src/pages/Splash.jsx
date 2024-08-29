import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";

const Splash = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("uuId", uuidv4());
    console.log(sessionStorage.getItem("uuId"));
  }, []);

  
  const handleClick = (path) => {
    if (path === "/interaction") {
      navigate(path);
    } else {
      navigate(path);
    }
  };

  const items = [
    {
      title: "Explore Shalimar Products",
      icon: "/svgs/search.svg",
      path: "/interaction",
    },
    {
      title: "Play to Win",
      icon: "/svgs/parcel.svg",
      path: "/quiz",
    },
    {
      title: "Find nearest Dealer",
      icon: "/svgs/delear.svg",
      path: "/enter-your-location",
    },
    {
      title: "Find Trusted Painter",
      icon: "/svgs/paint.svg",
      path: "/get-painter-using-location",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Duration of the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full text-center p-[34px] md:p-6">
      <img
        className={`mt-[8.75rem] md:mt-[1rem] mx-auto ${
          isAnimating ? "animate-positionToCenter" : "animate-centerToPosition"
        }`}
        src="/images/logo-col.png"
        alt="Powered"
      />

      <div className={`mt-[5.25rem] md:mt:[2rem] `}>
        {items?.map((e, index) => (
          <div
            onClick={() =>
              ["Find Trusted Painter", "Play to Win"].includes(e.title)
                ? {}: handleClick(e.path)
            }

            key={index}
            className={`${
              ["Find Trusted Painter", "Play to Win"].includes(e.title)
                ? "bg-[#D6D6D6] border-[#D6D6D6] cursor-not-allowed"
                : "bg-white border-[#F7F7F7]/50"
            } group rounded-[9rem] w-full  font-Poppins text-xl font-semibold text-center py-3 px-3 border-2 mb-3  flex items-center cursor-pointer hover:shadow-xl ${
              !isAnimating
                ? "opacity-100 scale-100 transition-all duration-700 delay-200"
                : "opacity-0 scale-50"
            }`}
          >
            <div className="flex flex-1 gap-2 items-center">
              <img src={e.icon} alt="" />
              <div className="flex flex-col items-start">
                <strong className={`${ (index ===1 || index===3) && "text-[#969696]"}  text-left  font-Poppins text-base font-semibold`}>
                  {e.title}
                </strong>
                {["Find Trusted Painter", "Play to Win"].includes(e.title) && (
                  <span className="font-Poppins text-xs font-semibold ">
                    Coming Soon...{" "}
                  </span>
                )}
              </div>
            </div>
            <img
              className={`group-hover:animate-bounceLR ${ (index ===1 || index===3) && "opacity-50"}`}
              src="/svgs/arrow.svg"
              alt="arrow"
            />
          </div>
        ))}
      </div>

      <img
        className=" pb-[70px] pt-20 right-0 m-auto left-0"
        src="/images/powered.png"
        alt="Powered"
      />
    </div>
  );
};

export default Splash;
