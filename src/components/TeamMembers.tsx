import { useDraft } from "../Utils/providers/DraftProvider";

export const TeamMembers = ({
  children,
  version,
  handleRightClick,
}: {children: React.ReactNode, version: string, handleRightClick: any} ) => {

  // #TODO: on rightclick update the bans array with the selected champion since itss not recalculating the graph
  const { bluePicks, redPicks }  = useDraft()

  return (
    <>
      <div className={` flex flex-col gap-y-2  [&>*:nth-child(3)]:mb-8 `}>
        {bluePicks.map((picked: string | null, index: number) => (
          <div
            key={index}
            className={`team-member-slot border-2 cursor-pointer bg-white border-blue-300 rounded-lg overflow-hidden`}
            onContextMenu={(event) => {
              event.preventDefault();
              handleRightClick(index, "blue", "pick");
            }}
          >
            {picked ? (
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${picked}.png`}
                alt={picked}
                width={76}
                height={76}
                className="w-[7rem] h-[7rem]"
              />
            ) : (
              <img
                src="no_champion.png"
                alt="no-champion"
                width={76}
                height={76}
                className="w-[7rem] h-[7rem] rounded-lg"
              />
            )}
          </div>
        ))}
      </div>

      {children}

      <div className={`  flex flex-col gap-y-2  [&>*:nth-child(3)]:mb-8`}>
        {redPicks.map((picked: string | null, index: number) => (
          <div
            key={index}
            className={`team-member-slot border-2 bg-white border-red-300 rounded-lg  overflow-hidden`}
            onContextMenu={(event) => {
              event.preventDefault();
              handleRightClick(index, "red", "pick");
            }}
          >
            {picked ? (
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${picked}.png`}
                alt={picked}
                width={76}
                height={76}
                className="w-[7rem] h-[7rem]"
              />
            ) : (
              <img
                src="no_champion.png"
                alt="no-champion"
                width={76}
                height={76}
                className="w-[7rem] h-[7rem] rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
