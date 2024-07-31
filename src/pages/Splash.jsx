import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Splash = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const navigate = useNavigate();
  const items = [
    {
      title: "Explore",
      icon: "/svgs/search.svg",
      path: "#",
    },
    {
      title: "Play to Win",
      icon: "/svgs/parcel.svg",
      path: "#",
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
        className={`mt-[8.75rem] md:mt-[3rem] mx-auto ${
          isAnimating ? "animate-positionToCenter" : "animate-centerToPosition"
        }`}
        src="/images/logo-col.png"
        alt="Powered"
      />

      <div className={`mt-[5.25rem] md:mt:[2rem] `}>
        {items?.map((e, index) => (
          <div
            onClick={() => navigate(e.path)}
            key={index}
            className={`group rounded-[9rem] w-full bg-white montserrat text-xl font-semibold text-center py-3 px-3 border-[3px] mb-3 border-[#FFD076] flex items-center cursor-pointer hover:shadow-xl ${
              !isAnimating
                ? "opacity-100 scale-100 transition-all duration-700 delay-200"
                : "opacity-0 scale-50"
            }`}
          >
            <div className="flex flex-1 gap-2 items-center">
              <img src={e.icon} alt="" />
              <strong className="montserrat text-base font-semibold">
                {e.title}
              </strong>
            </div>
            <img
              className="group-hover:animate-bounceLR"
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
