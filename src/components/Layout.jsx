import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div
      className="box-border md:w-80  md:my-1    md:rounded-2xl bg-white
     bg-[url('/gif/bg-gif.gif')] w-full h-screen  md:h-[98vh]  bg-[length:102vw_100vh] md:bg-cover  bg-center overflow-y-scroll scrollbar-hide    bg-no-repeat flex justify-center items-center mx-auto"
    >
      <Outlet />
    </div>
  );
}

export default Layout
