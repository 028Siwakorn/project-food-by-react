import { Outlet } from "react-router"
import Navbar from "../components/Navbar"


const MainLayout = () => {
  return (
    <>
      <Navbar />
      
      {/* Content */}
      <div className="my-6">
        <Outlet />
      </div>

    </>
  )
}

export default MainLayout