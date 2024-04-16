
import { NavLink } from 'react-router-dom'
import { VersionMenu } from './VersionMenu'
import { Suspense, useEffect, useState } from 'react'

const links = [
  { name: 'Home', path: '/', iconPath: <path d="M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"></path> },
  { name: 'Champions', path: '/champions', iconPath:  <path d="M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z"></path>},
]

const SideMenu = () => {
  const [minimized, setMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('minimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [width, setWidth] = useState<number>(minimized ? 0 : 260);

  useEffect(() => {
    localStorage.setItem('minimized', JSON.stringify(minimized));
    
    let intervalId: number | undefined = undefined;
  
    if (minimized) {
      intervalId = setInterval(() => {
        setWidth((prevWidth) => {
          if (prevWidth <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return parseFloat((prevWidth - 6.9).toFixed(4)); // Decrease width by 0.0001 every 1ms
        });
      }, 1);
    } else {
      intervalId = setInterval(() => {
        setWidth((prevWidth) => {
          if (prevWidth >= 260) {
            clearInterval(intervalId);
            return 260;
          }
          return parseFloat((prevWidth + 6.9).toFixed(4)); // Increase width by 0.0001 every 1ms
        });
      }, 1);
    }
  
    return () => clearInterval(intervalId); // Clean up on unmount
  }, [minimized]);

  const toggleMinimize = () => {
    setMinimized((prevMinimized) => !prevMinimized);
  }
  
  const asideStyle: React.CSSProperties = {
    width: `${width.toFixed(4)}px`, // Update the width of the aside
    visibility: width > 0 ? 'visible' : 'hidden', // Hide the aside when width is 0
  };

  return (
    <>
      <button
        className="fixed left-0 top-1/2 z-40 bg-transparent "
        onClick={toggleMinimize}
        style={{
          transform: `translateX(${width.toFixed(4)}px) translateY(-50%) translateZ(0) rotate(${width > 0 ? 180 : 0}deg)`,
        }}
      >   
      <Suspense fallback={<div></div>}>
          <ArrowIcon  />
      </Suspense>
      </button>
      <aside
        className="sticky top-0 h-screen min-h-screen flex-shrink-0 overflow-x-hidden bg-[#303033] text-slate-300 "
        style={asideStyle}
      >
        <div className="flex h-full w-[260px] flex-col overflow-x-hidden p-8">
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
                          className="mb-1"
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
        </div>
      </aside>
    </>
  )
}

export default SideMenu


const ArrowIcon = () => {
  const [ state, setState ] = useState('open');
  const [ bgColor, setBgColor ] = useState('#a1a1a1');


  const handleMouseEnter = () => {
    setBgColor('#676767');
    if (state === 'open') {
      setState('delayed-closed');
      
    } else if (state === 'closed') {
      setState('delayed-open');
    }
  };

  const handleMouseLeave = () => {
    setBgColor('#a1a1a1');

    if (state === 'delayed-closed') {
      setState('open');
    } else if (state === 'delayed-open') {
      setState('closed');
    }
  };

  const getRotation = (div: 'top' | 'bottom') => {
    switch (state) {
      case 'open':
        return 0;
      case 'delayed-open':
      case 'closed':
        return div === 'top' ? -15 : 15;
      case 'delayed-closed':
        return div === 'top' ? -15 : 15;
      default:
        return 0;
    }
  };

  return (
    <span className="" data-state={state} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex h-[72px] w-8 items-center justify-center">
        <div className="flex h-6 w-6 flex-col items-center">
          <div
            className="h-3 w-1 rounded-full"
            style={{
              background: bgColor,
              transform: `translateY(0.15rem) rotate(${getRotation('top')}deg) translateZ(0px)`,
              transition : 'transform 0.2s ease',
            }}
          ></div>
          <div
            className="h-3 w-1 rounded-full"
            style={{
              background: bgColor,
              transform: `translateY(-0.15rem) rotate(${getRotation('bottom')}deg) translateZ(0px)`,
              transition : 'transform 0.2s ease',

            }}
          ></div>
        </div>
        <span
          style={{
            position: 'absolute',
            border: '0px',
            width: '1px',
            height: '1px',
            padding: '0px',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0px, 0px, 0px, 0px)',
            whiteSpace: 'nowrap',
            overflowWrap: 'normal',
          }}
        >
          Open sidebar
        </span>
      </div>
    </span>
  )
}