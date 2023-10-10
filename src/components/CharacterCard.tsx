import { useState } from "react";

export function CharacterCard({
  character,
  onAddToTeam,
  onAddToBannedPicks,
  isDisabled,
  team,
}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleCardClick = () => {
    setIsSelected(!isSelected);
  };
  return (
    <div
      className={`character-card ${isDisabled ? "disabled" : ""} ${
        isSelected ? "selected" : ""
      }`}
      onClick={handleCardClick}
      disabled={isDisabled}
    >
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${character.id}_0.jpg`}
        alt={character.name}
      />
      <p>{character.name}</p>
      <button onClick={() => onAddToTeam(character, team)}>Add to Team</button>
      <button onClick={() => onAddToBannedPicks(character, team)}>
        ban Team
      </button>
    </div>
  );
}
