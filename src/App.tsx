import { useState, useCallback } from "react";
import "./App.css";
import { CharacterCard } from "./components/CharacterCard";
import { TeamMembers } from "./components/TeamMembers";
import useChampionQuery from "./API/useChampionQuery";
import TeamBans from "./components/TeamBans";
import { tags } from "./constants";

interface Champion {
  championName: string;
  [key: string]: any;
}

function App() {
  const draft_object = {
    Blue_ban1: null,
    Red_ban1: null,
    Blue_ban2: null,
    Red_ban2: null,
    Blue_ban3: null,
    Red_ban3: null,

    Blue_pick1: null,
    Red_pick1: null,
    Red_pick2: null,
    Blue_pick2: null,
    Blue_pick3: null,
    Red_pick3: null,

    Red_ban4: null,
    Blue_ban4: null,
    Red_ban5: null,
    Blue_ban5: null,

    Red_pick4: null,
    Blue_pick4: null,
    Blue_pick5: null,
    Red_pick5: null,
  };
  // use the draft_object to set the state of the draft and then use that state to render the draft in the correct order and with the correct champions
  const [draft, setDraft] = useState(draft_object);
  const {
    useChampionData,
    setChampionFilterByInput,
    championFilterByTags,
    setChampionFilterByTags,
  } = useChampionQuery();

  function fill_next_null(clicked_champ: string, currentDraft: any) {
    for (const [key, value] of Object.entries(currentDraft)) {
      if (value === null) {
        setDraft({
          ...currentDraft,
          [key]: clicked_champ,
        });
        break;
      }
    }
  }
  // check hte draft object and filter the blue bans and red bans into their own arrays and then pass those arrays to the TeamBans component
  const blueBans = Object.entries(draft)?.filter((key, _) => {
    return key[0].includes("Blue_ban");
  });

  const redBans = Object.entries(draft)?.filter((key, _) => {
    return key[0].includes("Red_ban");
  });
  // now for the redpicks and blue picks
  const bluePicks = Object.entries(draft)?.filter((key, _) => {
    return key[0].includes("Blue_pick");
  });
  const redPicks = Object.entries(draft)?.filter((key, _) => {
    return key[0].includes("Red_pick");
  });

  // remove the champion from the draft if the user right clicks on the champion
  const handleRightClick = (
    index: number,
    team: "red" | "blue",
    type: "ban" | "pick"
  ) => {
    if (["blue", "red"].includes(team) && ["ban", "pick"].includes(type)) {
      setDraft({
        ...draft,
        [`${team.charAt(0).toUpperCase() + team.slice(1)}_${type}${index + 1}`]:
          null,
      });
    }
  };
  const changeViewByInput = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) =>
      setChampionFilterByInput([...evt.target.value.split(" ")]),
    [setChampionFilterByInput]
  );

  const handleTagClick = (tag: string) => {
    if (championFilterByTags.includes(tag)) {
      // remove the tag from the filter if it's already in the filter
      setChampionFilterByTags((prevTags: string[]) =>
        prevTags.filter((t: string) => t !== tag)
      );
    } else {
      // add the tag to the filter
      setChampionFilterByTags((prevTags: string[]) => [...prevTags, tag]);
    }
  };
  // Fetch the champions

  if (useChampionData.isLoading) {
    return <div>Loading...</div>;
  }
  if (useChampionData.isError) {
    return <div>Error fetching champions</div>;
  }
  const mappedChampions: Champion[] = [];
  console.log(draft);

  // Iterate over the object keys (champion names)
  for (const championName in useChampionData.data.data) {
    if (useChampionData.data.data.hasOwnProperty(championName)) {
      const champion = useChampionData.data.data[championName];

      // Add additional properties or manipulate the data as needed
      // For example, you can add the champion name as a property
      champion.championName = championName;

      // Push the champion data to the mappedChampions array
      mappedChampions.push(champion);
    }
  }

  return (
    <div className="App ">
      <section className="snap-start">
        <h1>League of Legends Draft</h1>
        <TeamBans
          blueBans={blueBans}
          redBans={redBans}
          version={useChampionData.data.version}
          handleRightClick={handleRightClick}
        />
        <section className="grid grid-cols-[112px_1fr_112px] pt-10 gap-4 justify-between">
          <TeamMembers
            bluePicks={bluePicks}
            redPicks={redPicks}
            version={useChampionData.data.version}
            handleRightClick={handleRightClick}
          >
            <div className="grid">
              <input
                className={` h-9 w-full rounded-full place-self-center mb-10 border-2 bg-bg px-3 py-1 text-sm sm:w-80 `}
                placeholder="Search"
                type="text"
                name="tagSearch"
                onChange={(e) => changeViewByInput(e)}
              />
              <button
                className="hidden w-[96.81px] justify-end sm:flex "
                onClick={() => {
                  setChampionFilterByTags(["Tank"]);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm108.34,72.28A15.92,15.92,0,0,0,144,139.17v55.49L112,216V139.17a15.92,15.92,0,0,0-4.32-10.94L40,56H216Z"></path>
                </svg>
              </button>
              <button
                className="hidden w-[96.81px] justify-end sm:flex "
                onClick={() => {
                  setChampionFilterByTags(["Tank"]);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm108.34,72.28A15.92,15.92,0,0,0,144,139.17v55.49L112,216V139.17a15.92,15.92,0,0,0-4.32-10.94L40,56H216Z"></path>
                </svg>
              </button>
              {tags.map((tag, index) => (
                <button
                  key={index}
                  className="hidden w-[96.81px] justify-end sm:flex "
                  onClick={() => {
                    setChampionFilterByTags([tag]);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm108.34,72.28A15.92,15.92,0,0,0,144,139.17v55.49L112,216V139.17a15.92,15.92,0,0,0-4.32-10.94L40,56H216Z"></path>
                  </svg>
                </button>
              ))}
              <div className=" overflow-y-scroll   mx-auto  flex-grow basis-0 h-[644px]">
                <div className="grid max-[500px]:grid-cols-1 grid-cols-2 sm:grid-cols-4 lg:min-w-[45rem] md:grid-cols-6 gap-4 items-center justify-center ">
                  {mappedChampions.map((champion, index) => {
                    return (
                      <CharacterCard
                        key={index}
                        character={champion}
                        version={useChampionData.data.version}
                        fill_next_null={fill_next_null}
                        draft={draft}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </TeamMembers>
        </section>
      </section>

      <section className=" h-screen snap-start pt-10">
        {" "}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex facere
        tenetur vero consequatur sapiente ducimus dolore molestiae repellat
        excepturi quam veniam reprehenderit quaerat, placeat corrupti obcaecati
        assumenda suscipit officiis dolorum. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Ex facere tenetur vero consequatur
        sapiente ducimus dolore molestiae repellat excepturi quam veniam
        reprehenderit quaerat, placeat corrupti obcaecati assumenda suscipit
        officiis dolorum. Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Ex facere tenetur vero consequatur sapiente ducimus dolore
        molestiae repellat excepturi quam veniam reprehenderit quaerat, placeat
        corrupti obcaecati assumenda suscipit officiis dolorum. Lorem, ipsum
        dolor sit amet consectetur adipisicing elit. Ex facere tenetur vero
        consequatur sapiente ducimus dolore molestiae repellat excepturi quam
        veniam reprehenderit quaerat, placeat corrupti obcaecati assumenda
        suscipit officiis dolorum. Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Ex facere tenetur vero consequatur sapiente ducimus
        dolore molestiae repellat excepturi quam veniam reprehenderit quaerat,
        placeat corrupti obcaecati assumenda suscipit officiis dolorum. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Ex facere tenetur
        vero consequatur sapiente ducimus dolore molestiae repellat excepturi
        quam veniam reprehenderit quaerat, placeat corrupti obcaecati assumenda
        suscipit officiis dolorum. Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Ex facere tenetur vero consequatur sapiente ducimus
        dolore molestiae repellat excepturi quam veniam reprehenderit quaerat,
        placeat corrupti obcaecati assumenda suscipit officiis dolorum. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Ex facere tenetur
        vero consequatur sapiente ducimus dolore molestiae repellat excepturi
        quam veniam reprehenderit quaerat, placeat corrupti obcaecati assumenda
        suscipit officiis dolorum. Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Ex facere tenetur vero consequatur sapiente ducimus
        dolore molestiae repellat excepturi quam veniam reprehenderit quaerat,
        placeat corrupti obcaecati assumenda suscipit officiis dolorum. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Ex facere tenetur
        vero consequatur sapiente ducimus dolore molestiae repellat excepturi
        quam veniam reprehenderit quaerat, placeat corrupti obcaecati assumenda
        suscipit officiis dolorum. Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Ex facere tenetur vero consequatur sapiente ducimus
        dolore molestiae repellat excepturi quam veniam reprehenderit quaerat,
        placeat corrupti obcaecati assumenda suscipit officiis dolorum. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Ex facere tenetur
        vero consequatur sapiente ducimus dolore molestiae repellat excepturi
        quam veniam reprehenderit quaerat, placeat corrupti obcaecati assumenda
        suscipit officiis dolorum. Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Ex facere tenetur vero consequatur sapiente ducimus
        dolore molestiae repellat excepturi quam veniam reprehenderit quaerat,
        placeat corrupti obcaecati assumenda suscipit officiis dolorum. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Ex facere tenetur
        vero consequatur sapiente ducimus dolore molestiae repellat excepturi
        quam veniam reprehenderit quaerat, placeat corrupti obcaecati assumenda
        suscipit officiis dolorum.
      </section>
    </div>
  );
}

export default App;
