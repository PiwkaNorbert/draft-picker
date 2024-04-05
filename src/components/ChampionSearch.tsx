import { useCallback } from "react";
import useChampionQuery from "../API/useChampionQuery";
import { tags } from "../constants";

export const ChampionSearch: React.FC = () => {


  const { setChampionFilterByInput, championFilterByTags, setChampionFilterByTags,
  } = useChampionQuery();

  const changeViewByInput = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => setChampionFilterByInput([...evt.target.value.split(" ")]),
    [setChampionFilterByInput]
  );


  const handleTagClick = (tag: string) => {
    if (championFilterByTags.includes(tag)) {
      // remove the tag from the filter if it's already in the filter
      setChampionFilterByTags((prevTags: string[]) => prevTags.filter((t: string) => t !== tag)
      );
    } else {
      // add the tag to the filter
      setChampionFilterByTags((prevTags: string[]) => [...prevTags, tag]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center mb-10 gap-2 px-[18px] max-w-[613px] mx-auto">
      <input
        className={` h-9 rounded-full basis-1/3 place-self-center  border-2 bg-bg px-3 py-1 text-sm w-80 `}
        placeholder="Search"
        type="text"
        name="tagSearch"
        onChange={(e) => changeViewByInput(e)} />

      <section className="flex gap-2 flex-1 justify-end">
        {tags.map((tag, index) => (
          <button
            key={index}
            className={`${championFilterByTags.includes(tag)
                ? `bg-gray-200 dark:text-bg/50 border-selected border-2 border-transparent`
                : ""} hover:bg-gray-100 rounded-full p-2 hover:border-selected hover:border-2 border-2 border-transparent`}
            onClick={() => handleTagClick(tag)}
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
