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

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, champion: Champion) => {
      event.dataTransfer.setData("text/plain", "");
      event.dataTransfer.setDragImage(event.currentTarget, 0, 0);
      event.dataTransfer.dropEffect = "move";
      event.currentTarget.classList.add("dragging");
      event.dataTransfer.setData("champion", JSON.stringify(champion));
    },
    []
  );

  const handleDragEnd = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.currentTarget.classList.remove("dragging");
    },
    []
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.preventDefault();
      const champion = JSON.parse(event.dataTransfer.getData("champion"));
      onSwapChampions(champion, bannedPicks[index] as Champion);
    },
    [bannedPicks, onSwapChampions]
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
          draggable={!!bannedPick}
          onDragStart={(event) =>
            handleDragStart(event, bannedPick as Champion)
          }
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
        >
          {bannedPick ? (
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${bannedPick.id}_0.jpg`}
              alt={bannedPick.name}
            />
          ) : (
            "Empty"
          )}
        </div>
      ))}
    </div>
  );
}
