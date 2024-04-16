import { useDraft } from '../Utils/hooks/useDraft';
interface TeamBansProps {
  version: string;
  handleRightClick: (index: number, team: "blue" | "red", type: "pick" | "ban") => void;
}

const TeamBans = ({ version, handleRightClick }: TeamBansProps) => {
  const { blueBans, redBans} = useDraft()

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between gap-2 mx-auto">
      <div className={`team `}>
        <h2>Team 1</h2>
        <div className="banned-picks">
          {blueBans.map((bannedPick: string | null, index: number) => (
            <div
              key={index + 1}
              className={`banned-pick-slot ${bannedPick ? "filled" : ""}`}
              onContextMenu={(event) => {
                event.preventDefault();
                handleRightClick(index, "blue", "ban");
              }}
            >
              {bannedPick ? (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${bannedPick}.png`}
                  alt={bannedPick}
                />
              ) : (
                <img src="no_champion.png" alt="no-champion" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={`team `}>
        <h2>Team 2</h2>

        <div className="banned-picks">
          {redBans.map((bannedPick: string | null, index: number) => (
            <div
              key={index + 1}
              className={`banned-pick-slot ${bannedPick ? "filled" : ""}`}
              onContextMenu={(event) => {
                event.preventDefault();
                handleRightClick(index, "red", "ban");
              }}
            >
              {bannedPick ? (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${bannedPick}.png`}
                  alt={bannedPick}
                />
              ) : (
                <img src="no_champion.png" alt="no-champion" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamBans;
