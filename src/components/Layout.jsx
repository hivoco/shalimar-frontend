import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // const { pathname } = useLocation();

  // const isScrollRequired =
  //   pathname === "/get-your-nearest-dealers" ||
  //   pathname === "/enter-your-location" ||
  //   pathname === "/get-your-nearest-painters";

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowHeight(window.innerHeight);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div className="bg-[url('/bgs/1.png')] md:w-80 md:my-1 md:rounded-2xl  w-full h-svh  scrollbar-hide md:h-[98vh] bg-cover bg-center bg-no-repeat  md:mx-auto">
      <Outlet />
    </div>
  );
}

export default Layout;
