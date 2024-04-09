import React from "react"
import SideMenu from "../components/side-menu"

const MainLayout = ({children}: { children: React.ReactNode}) => {
  return (
    <div className="App relative flex gap-6 min-h-screen">
      <SideMenu />
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  )
}

export default MainLayout