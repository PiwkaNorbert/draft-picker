import React from "react"
import SideMenu from "../components/sidemenu/side-menu"

const MainLayout = ({children}: { children: React.ReactNode}) => {
  return (
    <div className="App relative flex gap-6 min-h-screen">
      <SideMenu />
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden p-10">
        {children}
      </div>
    </div>
  )
}

export default MainLayout