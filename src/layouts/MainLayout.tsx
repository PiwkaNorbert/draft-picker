import React, { Suspense, lazy } from "react"
const SideMenu = lazy(() => import("../components/sidemenu/side-menu"))

const MainLayout = ({children}: { children: React.ReactNode}) => {
  return (
    <div className="App relative flex lg:flex-row flex-col min-h-screen bg-[#303033]">
      <Suspense fallback={
              <aside
               className="sticky top-0 h-screen min-h-screen flex-shrink-0 overflow-x-hidden  text-slate-300 "
              >
              <div className="flex h-full w-[260px] flex-col overflow-x-hidden p-8">
              </div>
            </aside>
      }>
        <SideMenu />
      </Suspense>
      <div className="relative flex h-full max-w-full bg-[#dbdbdb] flex-1 gap-8 lg:gap-0 flex-col overflow-hidden pl-10 p-4 lg:px-10 lg:py-5">
        {children}
      </div>
    </div>
  )
}

export default MainLayout