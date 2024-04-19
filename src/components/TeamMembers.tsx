import { useDraft } from '../Utils/hooks/useDraft';

interface TeamMembersProps {
  children: React.ReactNode;
  version: string;
  handleRightClick: (index: number, team: "blue" | "red", type: "pick" | "ban") => void;
}

export const TeamMembers = ({
  children,
  version,
  handleRightClick,
}: TeamMembersProps ) => {

  // #TODO: on rightclick update the bans array with the selected champion since itss not recalculating the graph
  const { bluePicks, redPicks }  = useDraft()

  return (
    <>
      <div className={` flex flex-col gap-y-2 justify-between lg:justify-normal  [&>*:nth-child(3)]:mb-8 `}>
        {bluePicks.map((champion: string | null, index: number) => (
          <div
            key={index}
            className={`team-member-slot relative border-2 cursor-pointer bg-white border-blue-300 rounded-lg overflow-hidden`}
            onContextMenu={(event) => {
              event.preventDefault();
              handleRightClick(index, "blue", "pick");
            }}
          >
           <CardAvatar version={version} champion={champion} />
            
          </div>
        ))}
      </div>

      {children}

      <div className={`  flex flex-col gap-y-2 justify-between lg:justify-normal [&>*:nth-child(3)]:mb-8`}>
        {redPicks.map((champion: string | null, index: number) => {
          
          return (
          <div
            key={index}
            className={`team-member-slot relative border-2 bg-white border-red-300 rounded-lg  overflow-hidden`}
            onContextMenu={(event) => {
              event.preventDefault();
              handleRightClick(index, "red", "pick");
            }}
          >
           <CardAvatar version={version} champion={champion} />
          </div>
        )})}
      </div>
    </>
  );
};

const CardAvatar = ({ version, champion }: { version: string; champion: string | null}) => {

  if (!champion || champion === null) {
    return <EmptyCard />
  }
  return (
    <>
    <img
      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion}.png`}
      alt={champion}
      width={112}
      height={112}
      className="w-[7rem] h-[7rem]  object-cover"
    />
      <span className='absolute bottom-0 left-0 rounded-tr-md rounded-bl-md px-1 text-xs bg-black text-white shadow-black [text-shadow:_0_1px_3px_var(--tw-shadow-color)] '>
        {champion}
      </span>
    </>

  )
}

const EmptyCard = () => {
  return (
    <img
      src="no_champion.png"
      alt="no-champion"
      width={112}
      height={112}
      className="w-[7rem] h-[7rem] rounded-lg  object-contain" ></img>
  )
}