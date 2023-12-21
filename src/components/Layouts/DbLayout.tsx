import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"

export default function DbLayout() {
  return (
    <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    </>
  )
}
