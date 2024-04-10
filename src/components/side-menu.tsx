import { NavLink } from 'react-router-dom'
import useVersions from '../API/usePatches'
import { usePatch } from '../Utils/hooks/usePatch'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const links = [
  { name: 'Home', path: '/', iconPath: <path d="M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"></path> },
  { name: 'Champions', path: '/champions', iconPath:  <path d="M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z"></path>},
  //   { name: 'Draft', path: '/draft' },
  //   { name: 'About', path: '/about' },
]

const SideMenu = () => {
  return (
    <aside className="sticky top-0 flex h-screen min-h-screen min-w-[223px] max-w-[223px] flex-col bg-[#eaeaea] p-8">
      <h1>LoL Drafter</h1>
      {/* <LoginButton /> */}
      <nav>
        <ul className="grid">
          {links.map((link, index) => (
            <li key={index} className="hover:underline">
              <NavLink
                to={link.path}
                rel="noreferrer noopener"
                className={({ isActive, isPending }) =>
                  isPending
                    ? ' text-green-300'
                    : isActive
                      ? ' text-red-400 hover:text-opacity-80'
                      : ''
                }
              >
                <div className="p-2 hover:opacity-90 hover:transition-opacity">
                  <div className="flex items-center gap-3">
                    <span className="sr-only">{link.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      width="1.3em"
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      className='mb-1'
                    >
                        {link.iconPath}
                    </svg>
                    {link.name}
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* select with versions */}
      <VersionMenu />
    </aside>
  )
}

export default SideMenu

const VersionMenu = () => {
  const { data, isLoading, error } = useVersions()
  const { setPatch } = usePatch()

  if (isLoading) {
    return <div className="mt-auto">Loading...</div>
  }
  if (error) {
    return <div className="mt-auto">Error fetching versions</div>
  }

  return (
    <Select
      onValueChange={(e) => {
        setPatch(e)
      }}
    >
      <SelectTrigger className="mt-auto w-full bg-white">
        <SelectValue placeholder="Patch" />
      </SelectTrigger>
      <SelectContent>
        {data.length > 0 ? (
          data.map((patch: string) => (
            <SelectItem
              onChange={() => {
                console.log(patch)
              }}
              key={patch}
              value={patch}
            >
              {patch}
            </SelectItem>
          ))
        ) : (
          <SelectItem
            onChange={() => {
              console.log('Recent')
            }}
            key="Recent"
            value="Recent"
          >
            Recent
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}
