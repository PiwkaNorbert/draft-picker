import { useEffect, useRef } from "react";
import "./App.css";
import { CharacterCard } from "./components/CharacterCard";
import { TeamMembers } from "./components/TeamMembers";
import useChampionQuery from "./API/useChampionQuery";
import TeamBans from "./components/TeamBans";
import Graphs from "./components/Graphs";
import { Root, Champion } from "./types/data";
import { useDraft } from './Utils/hooks/useDraft';
import { ChampionSearch } from "./components/ChampionSearch";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { DraftObject } from "./types/util";
import { usePatch } from './Utils/hooks/usePatch';
import axios from "axios";


export default function App() {

  const { draft, setDraft, setTeamavg, redPicks, bluePicks } = useDraft();
  const { patch  } = usePatch();

  const graphsRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams()
  const tags = searchParams.get('tag')?.split(',') || []
  const search = searchParams.get('search') || ''
  const query = {tags, search}

  const useChampionData = useChampionQuery(query);

  // Send the draft to the backend
  const sendDraftMutation = useMutation((draft: DraftObject) => {
    return axios.post(`http://192.168.15.220:8000/game-avg/?patch=${patch}`, draft);
  });
  const { mutate: updateGameAvg } = sendDraftMutation;

  // Update the game average when the draft is filled
  useEffect(() => {
    if (draft) {
      updateGameAvg(draft, {
        onSuccess: (data) => {
          const { data: teamAvg } = data;
          console.log(teamAvg);
          
          setTeamavg(teamAvg);
        },
      });
    }
  }, [patch, draft, updateGameAvg, setTeamavg]); // This will trigger the effect whenever `patch` changes

  // Scroll to the graphs when the draft is filled
  useEffect(() => {
    // Check if the draft object is filled
    const isDraftFilled = Object.values(draft).every((value) => value !== null);
    
    if (isDraftFilled && graphsRef.current) {
      // Scroll to the graphs
      graphsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [draft]);

  // fill the next null slot in the draft with the clicked champion
  function fillNextNull(clicked_champ: string, currentDraft: DraftObject) {
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


  if (useChampionData.isLoading) {
    return <div>Loading...</div>;
  }
  if (useChampionData.isError) {
    return <div>Error fetching champions</div>;
  }
  // check if the length of the data is 0 then return no champions found
  if (!useChampionData.data || !useChampionData.data.data){
    return <div>No champions found</div>;
  }
  const isEmpty = Object.keys(useChampionData.data.data).length === 0
  const mappedChampions: Champion[] = [];
  
  const championData = useChampionData.data as Root;
  
  // Map the champions to an array
  for (const championName in championData.data) {
    // Check if the championName is a property of the championData object
    if (Object.prototype.hasOwnProperty.call(championData.data, championName)) {
      const champion = championData.data[championName];
      champion.championName = championName;

      // Push the champion data to the mappedChampions array
      mappedChampions.push(champion);
    }
  }

  return (
    <>

      <section className="snap-start h-screen mx-auto">
        <TeamBans
          version={championData.version}
          handleRightClick={handleRightClick}
        />
        <section className="flex pt-10 gap-4 justify-between">
          <TeamMembers
            version={championData.version}
            handleRightClick={handleRightClick}
          >
            <div className="grid w-fit place-items-center">
              <ChampionSearch />

              <div className=" overflow-y-scroll overflow-x-clip  mx-auto w-full flex-grow basis-0 h-[544px] px-[18px]">
                <div className="grid grid-cols-3 md:grid-cols-4 w-full lg:grid-cols-6 gap-4 items-center justify-center ">
                  {isEmpty ? (
                    <div className="col-span-full w-full">No champions found</div>
                  ) :  mappedChampions.map((champion, index) => {
                    return (
                      <CharacterCard
                        key={index}
                        character={champion}
                        version={championData.version}
                        fillNextNull={fillNextNull}
                        removeFromDraft={removeFromDraft}
                
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
          <Graphs  />
      </section>
  

    </>
  );
}

// const LoginButton = () => {
//   return (
//     <a
//       className="rounded-xl bg-white/80 p-4 flex items-center gap-1 text-gray-800 hover:-translate-y-px  hover:bg-white/70"
//       href={`https://discord.com/oauth2/authorize?client_id=1155784301368066099&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fdiscord%2Fcallback&scope=identify`}
//     >
//       <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="1em"
//               width="1em"
//               stroke="currentColor"
//               fill="currentColor"
//               viewBox="0 0 256 256"
//             >
//               <path d="M141.66,133.66l-40,40a8,8,0,0,1-11.32-11.32L116.69,136H24a8,8,0,0,1,0-16h92.69L90.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,141.66,133.66ZM192,32H136a8,8,0,0,0,0,16h56V208H136a8,8,0,0,0,0,16h56a16,16,0,0,0,16-16V48A16,16,0,0,0,192,32Z"></path>
//           </svg>
//         Login 
//     </a>
//   );
// };


