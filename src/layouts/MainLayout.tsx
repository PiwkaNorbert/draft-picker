import React, { Suspense, lazy } from "react"
const SideMenu = lazy(() => import("../components/sidemenu/side-menu"))

const MainLayout = ({children}: { children: React.ReactNode}) => {
  return (
    <div className="App relative flex gap-6 min-h-screen">
      <Suspense fallback={
              <aside
               className="sticky top-0 h-screen min-h-screen flex-shrink-0 overflow-x-hidden bg-[#303033] text-slate-300 "
              >
              <div className="flex h-full w-[260px] flex-col overflow-x-hidden p-8">
              </div>
            </aside>
      }>
        <SideMenu />
      </Suspense>
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden p-10">
        {children}
      </div>
    </div>
  )
}

export default MainLayout