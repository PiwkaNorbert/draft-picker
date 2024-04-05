import { useEffect, useRef } from "react";
import "./App.css";
import { CharacterCard } from "./components/CharacterCard";
import { TeamMembers } from "./components/TeamMembers";
import useChampionQuery from "./API/useChampionQuery";
import TeamBans from "./components/TeamBans";
import Graphs from "./components/Graphs";
import { Root } from "./types/data";
import { useDraft } from "./Utils/providers/DraftProvider";
import { ChampionSearch } from "./components/ChampionSearch";
import { useSearchParams } from "react-router-dom";



interface Champion {
  championName?: string;
  [key: string]: any;
}



export default function App() {

  const { draft, setDraft } = useDraft();

  const graphsRef = useRef<HTMLDivElement>(null);

  const useChampionData = useChampionQuery();


  useEffect(() => {
    // Check if the draft object is filled
    const isDraftFilled = Object.values(draft).every((value) => value !== null);
    
    if (isDraftFilled && graphsRef.current) {
      // Scroll to the graphs
      graphsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [draft]);


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
  console.log(championData);
  
  

  return (
    <div className="App flex gap-6 p-6">
      <aside className="w-32 bg-red-300">
      <h1>LoL Drafter</h1>
      {/* <LoginButton /> */}

      </aside>
      <div className="flex-1 ">

      <section className="snap-start xl:w-[900px] h-screen mx-auto">
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

              <div className=" overflow-y-scroll overflow-x-clip  mx-auto  flex-grow basis-0 h-[544px] px-[18px]">
                <div className="grid grid-cols-3 md:grid-cols-4 w-full lg:grid-cols-6 gap-4 items-center justify-center ">
                  {mappedChampions.map((champion, index) => {
                    return (
                      <CharacterCard
                        key={index}
                        character={champion}
                        version={championData.version}
                
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
      </div>

    </div>
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


