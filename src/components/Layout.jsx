import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const { pathname } = useLocation();
  // console.log(pathname);

  const isScrollRequired =
    pathname === "/get-your-nearest-dealers" ||
    pathname==="/enter-your-location" ||
    pathname === "/get-your-nearest-painters";
  // use "/" begore the path

  // console.log(isScrollRequired);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const height = isScrollRequired
    ? `min-h-[${windowHeight}px]`
    : `max-h-[${windowHeight}px]`;

  return (
    <div
      // style={{ maxHeight: `${windowHeight}px` }}
      className={`
        ${
          isScrollRequired
            ? "overflow-y-scroll bg-cover  "
            : "overflow-y-hidden"
        } ${height} box-border md:w-80 md:my-1 md:rounded-2xl bg-[url('/gif/bg-gif.gif')] w-full overflow-x-hidden scrollbar-hide md:h-[98vh] bg-[length:102vw_100vh] md:bg-cover  bg-center bg-no-repeat flex justify-center items-center md:mx-auto `}
    >
      <Outlet />
    </div>
  );
}

export default Layout;
