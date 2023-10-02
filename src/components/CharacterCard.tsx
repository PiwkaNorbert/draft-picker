export function CharacterCard({
  character,
  onAddToTeam,
  onAddToBannedPicks,
  isDisabled,
  team,
}) {
  return (
    <div
      className={`character-card ${isDisabled ? "disabled" : ""}`}
      onClick={() => onAddToBannedPicks(character, team)}
    >
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${character.id}_0.jpg`}
        alt={character.name}
      />
      <p>{character.name}</p>
      <button
        onClick={() => onAddToTeam(character, team)}
        disabled={isDisabled}
      >
        Add to Team
      </button>
    </div>
  );
}
