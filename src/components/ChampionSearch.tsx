import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { tags as buttonTags } from "../constants";
import { useDebouncedCallback } from 'use-debounce'
import useChampionQuery from "../API/useChampionQuery"

const ChampionSearch: React.FC = () => {

  const [searchParams] = useSearchParams()
  const tags = searchParams.get('tag')?.split(',') || []
  const search = searchParams.get('search') || ''
  const query = {tags, search}



  const { status, error, isLoading } = useChampionQuery(query)

  const { pathname } = useLocation()
  const navigate  = useNavigate()

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value
      const params = new URLSearchParams(searchParams)

      if (search) {
        params.set('search', search)
      } else {
        params.delete('search')
      }
      navigate(`${pathname}?${params.toString()}`)
    },
    500
  )

const handleTags = useDebouncedCallback((newTag: string) => {
  const params = new URLSearchParams(searchParams)
  const existingTags = params.get('tag')?.split(',') || []
  
  let updatedTags;
  if (existingTags.includes(newTag)) {
    updatedTags = existingTags.filter(tag => tag !== newTag)
  } else {
    updatedTags = [...new Set([...existingTags, newTag])]
  }
  
  if (updatedTags.length > 0) {
    params.set('tag', updatedTags.join(','))
  } else {
    params.delete('tag')
  }
  navigate(`${pathname}?${params.toString()}`)
}, 50)

const championFilterByTags = searchParams.get('tag')?.split(',') || []

  if (status === 'error') {
    console.error(error)
    return null
  }
  if (isLoading) {
    return <div>Loading...</div>
  }



  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-5 lg:mb-10 gap-2 px-[18px] w-full max-w-full lg:max-w-[613px] mx-auto">
   
   <div role="search" className="relative grid text-[#aaa]">
      <svg
        className="absolute bottom-0 left-3 top-0 h-full items-center "
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
      </svg>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="prose-base block h-full w-full rounded-md border-0 border-border bg-card py-2 pl-10 pr-3.5 text-text-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-text-1 sm:leading-6 lg:w-40"
        type="text"
        id="search"
        aria-label="Search "
        placeholder="Search"
        onChange={(e) => {
          handleSearch(e)
        }}
        defaultValue={searchParams.get('search')?.toString() || ''}
        autoFocus
      />
    </div>
     <section className="flex gap-4 lg:gap-2 flex-1 flex-wrap lg:flex-nowrap justify-center lg:justify-end">
     {buttonTags.map((tag, index) => (
       <button
         key={index}
         className={`${championFilterByTags.includes(tag)
             ? `bg-gray-200 dark:text-bg/50 border-selected border-2 border-transparent`
             : ""} hover:bg-gray-100 rounded-full p-2 hover:border-selected hover:border-2 border-2 border-transparent`}
         onClick={() => handleTags(tag)}
       >
         <img
           src={`/${tag}.webp`}
           alt={tag}
           width={24}
           height={24}
           className=" w-6 h-6" />
       </button>
     ))}
   </section>
     
    </div>
  );
};

export default ChampionSearch;