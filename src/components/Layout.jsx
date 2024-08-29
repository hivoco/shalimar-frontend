import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const { pathname } = useLocation();

  const isScrollRequired =
    pathname === "/get-your-nearest-dealers" ||
    pathname === "/enter-your-location" ||
    pathname === "/get-your-nearest-painters";

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        maxHeight: !isScrollRequired ? `${windowHeight}px` : "",
        minHeight: isScrollRequired ? `${windowHeight}px` : "",
      }}
      className={`${
        isScrollRequired ? "overflow-y-scroll bg-cover" : "overflow-y-hidden"
      }  box-border md:w-80 md:my-1 md:rounded-2xl bg-[url('/bgs/1.png')] w-full overflow-x-hidden scrollbar-hide md:h-[98vh] bg-cover  md:bg-cover  bg-center bg-no-repeat flex justify-center items-center md:mx-auto`}
    >
      {/* <p>{windowHeight}</p> */}
      <Outlet />
    </div>
  );
}

export default Layout;
