import { useCallback } from "react";
const TeamBans = ({ blueBans, redBans, version, handleRightClick }) => {
  return (
    <div className="teams">
      <div className={`team `}>
        <h2>Team 1</h2>
        <div className="banned-picks">
          {blueBans.map((bannedPick: string[] | null, index: number) => (
            <div
              key={index + 1}
              className={`banned-pick-slot ${bannedPick ? "filled" : ""}`}
              onContextMenu={(event) => {
                event.preventDefault();
                handleRightClick(index, "blue", "ban");
              }}
            >
              {bannedPick && bannedPick[1] ? (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${bannedPick[1]}.png`}
                  alt={bannedPick[1]}
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
          {redBans.map((bannedPick: string[] | null, index: number) => (
            <div
              key={index + 1}
              className={`banned-pick-slot ${bannedPick ? "filled" : ""}`}
              onContextMenu={(event) => {
                event.preventDefault();
                handleRightClick(index, "red", "ban");
              }}
            >
              {bannedPick && bannedPick[1] ? (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${bannedPick[1]}.png`}
                  alt={bannedPick[1]}
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
