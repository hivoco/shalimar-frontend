import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div
     className="box-border md:w-[360px]  md:h-[800px]   md:mt-20  md:rounded-2xl bg-white
     bg-[url('/gif/bg-gif.gif')] w-full  min-h-screen bg-[length:102vw_100vh] bg-center bg-no-repeat">
      <Outlet/>
    </div>
  )
}

export default Layout
