import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import { CharacterCard } from "./components/CharacterCard";
import { TeamMembers } from "./components/TeamMembers";
import useChampionQuery from "./API/useChampionQuery";
import TeamBans from "./components/TeamBans";
import { tags } from "./constants";
import Graphs from "./components/Graphs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Root } from "./types/data";
import { TeamAvg } from "./types/util";



interface Champion {
  championName?: string;
  [key: string]: any;
}

interface DraftObject {
  Blue_ban1: string | null;
  Red_ban1: string | null;
  Blue_ban2: string | null;
  Red_ban2: string | null;
  Blue_ban3: string | null;
  Red_ban3: string | null;

  Blue_pick1: string | null;
  Red_pick1: string | null;
  Red_pick2: string | null;
  Blue_pick2: string | null;
  Blue_pick3: string | null;
  Red_pick3: string | null;

  Red_ban4: string | null;
  Blue_ban4: string | null;
  Red_ban5: string | null;
  Blue_ban5: string | null;

  Red_pick4: string | null;
  Blue_pick4: string | null;
  Blue_pick5: string | null;
  Red_pick5: string | null;
}

function App() {
  const draft_object: DraftObject = {
    // Blue_ban1: null,
    // Red_ban1: null,
    // Blue_ban2: null,
    // Red_ban2: null,
    // Blue_ban3: null,
    // Red_ban3: null,

    // Blue_pick1: null,
    // Red_pick1: null,
    // Red_pick2: null,
    // Blue_pick2: null,
    // Blue_pick3: null,
    // Red_pick3: null,

    // Red_ban4: null,
    // Blue_ban4: null,
    // Red_ban5: null,
    // Blue_ban5: null,

    // Red_pick4: null,
    // Blue_pick4: null,
    // Blue_pick5: null,
    // Red_pick5: null,
    
      "Blue_ban1": "Amumu",
      "Red_ban1": "Azir",
      "Blue_ban2": "Alistar",
      "Red_ban2": "AurelionSol",
      "Blue_ban3": "Akshan",
      "Red_ban3": "Ashe",
      "Blue_pick1": "Akali",
      "Red_pick1": "Aphelios",
      "Red_pick2": "Annie",
      "Blue_pick2": "Ahri",
      "Blue_pick3": "Aatrox",
      "Red_pick3": "Anivia",
      "Red_ban4": "Bard",
      "Blue_ban4": "Caitlyn",
      "Red_ban5": "Belveth",
      "Blue_ban5": "Camille",
      "Red_pick4": "Blitzcrank",
      "Blue_pick4": "Cassiopeia",
      "Blue_pick5": "Chogath",
      "Red_pick5": null
  
  };
  // use the draft_object to set the state of the draft and then use that state to render the draft in the correct order and with the correct champions
  const [draft, setDraft] = useState(()=>draft_object);
  console.log(draft);
  

  
  const [teamAvg, setTeamavg] = useState<TeamAvg | null>(null);
  

  const graphsRef = useRef<HTMLDivElement>(null);

  const {
    useChampionData,
    setChampionFilterByInput,
    championFilterByTags,
    setChampionFilterByTags,
  } = useChampionQuery();

  const sendDraftMutation = useMutation((data) => {
    return axios.post(`http://192.168.15.220:8000/game-avg/`, data);
  });
  const { mutate: updateGameAvg } = sendDraftMutation;

  function fill_next_null(clicked_champ: string, currentDraft: DraftObject) {
    for (const [key, value] of Object.entries(currentDraft)) {
      if (value === null) {

        const newDraft = {
          ...currentDraft,
          [key]: clicked_champ,
        };

        setDraft(newDraft);
        if (
          (redPicks && redPicks[0] !== null) ||
          (bluePicks && bluePicks[0] !== null)
        ) {
          updateGameAvg(newDraft, {
            onSuccess: (data) => {
              const { data: teamAvg } = data;
              setTeamavg(teamAvg);
            },
          });
        }
        break;
      }
    }
  }

    // on right click check the draft and if the champion is in the draft then remove it from the draft
    function removeFromDraft(clicked_champ: string, currentDraft: DraftObject) {
      for (const [key, value] of Object.entries(currentDraft)) {
        if (value === clicked_champ) {
          const newDraft = {
            ...currentDraft,
            [key]: null,
          };
          setDraft(newDraft);
  
          updateGameAvg(newDraft, {
            onSuccess: (data) => {
              const { data: teamAvg } = data;
              setTeamavg(teamAvg);
            },
          });
          break;
        }
      }
    }
  


  useEffect(() => {
    // Check if the draft object is filled
    const isDraftFilled = Object.values(draft).every((value) => value !== null);
    
    if (isDraftFilled && graphsRef.current) {
      // Scroll to the graphs
      graphsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [draft]);

  if (sendDraftMutation.isSuccess) {
    // The mutation was successful, you can use the data here
  }

  // check hte draft object and filter the blue bans and red bans into their own arrays and then pass those arrays to the TeamBans component
  const getDraftEntries = (draft: DraftObject, keyMatch: string) => {
    return Object.entries(draft)
      .filter(([key]) => key.includes(keyMatch))
      .map(([, value]) => value);
  };

  const blueBans = getDraftEntries(draft, "Blue_ban");
  const redBans = getDraftEntries(draft, "Red_ban");
  const bluePicks = getDraftEntries(draft, "Blue_pick");
  const redPicks = getDraftEntries(draft, "Red_pick");

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

  if (useChampionData.isLoading) {
    return <div>Loading...</div>;
  }
  if (useChampionData.isError) {
    return <div>Error fetching champions</div>;
  }
  const mappedChampions: Champion[] = [];
  
  const championData = useChampionData.data as Root;
  // Iterate over the object keys (champion names)
  for (const championName in championData.data) {
    if (Object.prototype.hasOwnProperty.call(championData.data, championName)) {
      const champion = championData.data[championName];
      // console.log(champion);
      

      // Add additional properties or manipulate the data as needed
      // For example, you can add the champion name as a property
      champion.championName = championName;

      // Push the champion data to the mappedChampions array
      mappedChampions.push(champion);
    }
  }

  return (
    <div className="App flex gap-6 p-6">
      <aside className="w-32 bg-red-300">
      <h1>LoL Drafter</h1>


      </aside>
      <div className="flex-1 ">

      <section className="snap-start xl:w-[900px] h-screen mx-auto">
        <TeamBans
          blueBans={blueBans}
          redBans={redBans}
          version={championData.version}
          handleRightClick={handleRightClick}
        />
        <section className="flex pt-10 gap-4 justify-between">
          <TeamMembers
            bluePicks={bluePicks}
            redPicks={redPicks}
            version={championData.version}
            handleRightClick={handleRightClick}
          >
            <div className="grid w-fit place-items-center">
              <div className="flex flex-col lg:flex-row items-center justify-center mb-10 gap-2">
                <input
                  className={` h-9 rounded-full place-self-center  border-2 bg-bg px-3 py-1 text-sm w-80 `}
                  placeholder="Search"
                  type="text"
                  name="tagSearch"
                  onChange={(e) => changeViewByInput(e)}
                />

              <section className="flex gap-2">
                {tags.map((tag, index) => (
                  <button
                  key={index}
                  className={`${
                    championFilterByTags.includes(tag)
                    ? `bg-gray-200 dark:text-bg/50 border-selected border-2 border-transparent`
                    : ""
                  } hover:bg-gray-100 rounded-full p-2 hover:border-selected hover:border-2 border-2 border-transparent`}
                  onClick={() => handleTagClick(tag)}
                  >
                    <img
                      src={`/${tag}.webp`}
                      alt={tag}
                      width={24}
                      height={24}
                      className=" w-6 h-6"
                      />
                  </button>
                ))}
                </section>
              </div>

              <div className=" overflow-y-scroll overflow-x-clip  mx-auto  flex-grow basis-0 h-[544px]">
                <div className="grid grid-cols-3 md:grid-cols-4 w-full lg:grid-cols-6 gap-4 items-center justify-center ">
                  {mappedChampions.map((champion, index) => {
                    return (
                      <CharacterCard
                        key={index}
                        character={champion}
                        version={championData.version}
                        fill_next_null={fill_next_null}
                        draft={draft}
                        removeFromDraft={removeFromDraft}
                        redPicks={redPicks}
                        bluePicks={bluePicks}
                        redBans={redBans}
                        blueBans={blueBans}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </TeamMembers>
        </section>
      </section>

      <section className=" h-screen snap-start p-10 px-20 bg-white flex flex-col" ref={graphsRef}>
              <Graphs teamAvg={teamAvg} />
       
      </section>
      </div>

    </div>
  );
}

export default App;
