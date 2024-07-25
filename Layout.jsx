import { useEffect, useState } from "react";
import Popup from "./src/components/Popup";
import { useLocation, useNavigate } from "react-router-dom";

function Layout({ children, bg, splashScreenNo }) {
  const { pathname } = useLocation();
  const [isBtnVisible, setBtnVisibility] = useState(false);

  useEffect(
    function () {
      pathname !== "/" && setBtnVisibility(true);
    },
    [pathname]
  );

  const navigate = useNavigate();
  const [isopen, setisopen] = useState(false);

  const handlePopup = () => {
    setisopen(!isopen);
  };

  return (
    <div
      className={`w-screen h-screen overflow-x-hidden  bg-cover   bg-no-repeat `}
      style={{
        backgroundImage: `url(${bg})`,
        // backgroundSize:`100% 100%`
      }}
    >
      <div className="flex justify-between items-center pt-12 px-6">
        <div className=" flex items-center">
          {isBtnVisible && (
            <button onClick={() => navigate(-1)} className=" mr-[-1px]">
              <img src="/svgs/back-arrow.svg" alt="back button" />
            </button>
          )}

          <img
            onClick={() => navigate("/")}
            className=""
            src="/svgs/Tata-gluco-logo.svg"
            alt="Tata-gluco-logo"
          />
        </div>

        <button>
          <img
            onClick={() => handlePopup()}
            src="/svgs/exit-btn.svg"
            alt="exit button image"
          />
          {/* EXIT BUTTON */}
        </button>
      </div>
      {children}
      {(splashScreenNo === 3 || splashScreenNo === 4) && (
        <img
          className="absolute bottom-0 left-0"
          src="/svgs/veg-n-terms.svg"
          alt="veg"
        />
      )}

      {isopen && (
        <Popup>
          <div className="flex flex-col  justify-between items-center gap-6 py-4 px-6 ">
              <div className="flex flex-col gap-2  justify-between items-center  ">
                  <div className="flex flex-col gap-3">
                  <img src="/gifs/exit.gif" className="w-[100px]" alt="Exit" />
                  <small className="font-DarkerGrotesque font-bold text-[28px] leading-[24px] text-left  tracking-[-0.26px]">Exit Game</small>
                  </div>

                  <p className="font-Inter font-normal text-[12px] leading-[16px] text-center">
                    Are you sure you want to exit the game? <br />
                    Exiting now will result in loss of progress.
                  </p>
              </div>

            <div className="font-Inter text-[12px] font-medium leading-[14.52px] text-center flex justify-between items-center gap-3 w-full ">
              <div
                onClick={() => handlePopup()}
                className="outlined-btn  border cursor-pointer text-[#1D55FD]  rounded-[6.41px] flex justify-center items-center  py-[13.95px] px-4 w-1/2 "
              >
                <span className="font-medium text-base cursor-pointer">
                  No
                </span>
              </div>
              <div
              
                onClick={() => navigate("/")}
                className=" shadow-[2.56px_3.85px_0px_0px_black] text-white cursor-pointer rounded-[6.41px] flex items-center justify-center w-1/2
                   py-[13.95px] px-[52px] purple-btn"
              >
                <span className="font-medium text-base">Yes</span>
              </div>
            </div>


          </div>

        </Popup>
      )}
    </div>
  );
}
export default Layout;
