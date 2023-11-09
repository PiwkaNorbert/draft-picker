import { Champion } from "../types";
import { useCallback, useState } from "react";

interface BannedPicksProps {
  bannedPicks: (Champion | null)[];
  onToggleBan: (index: number) => void;
  currentSelected: number | null;
  onRightClick: (index: number) => void;
  team: number;
  onSwapChampions: (championA: Champion, championB: Champion) => void;
}

export function BannedPicks({
  bannedPicks,
  onToggleBan,
  currentSelected,
  onRightClick,
  team,
  onSwapChampions,
}: BannedPicksProps) {
  const [teamSelected, setTeamSelected] = useState<number | null>(
    currentSelected
  );

  const handleToggleBan = useCallback(
    (index: number) => {
      onToggleBan(index);
      setTeamSelected(index);
    },
    [onToggleBan]
  );

  const handleRightClick = useCallback(
    (index: number) => {
      onRightClick(index);
      setTeamSelected(null);
    },
    [onRightClick]
  );

  return (
    <div className="banned-picks">
      {bannedPicks.map((bannedPick, index) => (
        <div
          key={index}
          className={`banned-pick-slot ${bannedPick ? "filled" : ""} ${
            teamSelected === index ? "selected" : ""
          }`}
          onClick={() => handleToggleBan(index)}
          onContextMenu={(event) => {
            event.preventDefault();
            handleRightClick(index);
          }}
        >
          {bannedPick ? (
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bannedPick.id}_0.jpg`}
              alt={bannedPick.championName}
            />
          ) : (
            "Empty"
          )}
        </div>
      ))}
    </div>
  );
}
