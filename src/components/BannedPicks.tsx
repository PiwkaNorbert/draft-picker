export function BannedPicks({
  bannedPicks,
  onToggleBan,
  currentSelected,
  onRightClick,
}) {
  return (
    <div className="banned-picks">
      {bannedPicks.map((bannedPick, index) => (
        <div
          key={index}
          className={`banned-pick-slot ${bannedPick ? "filled" : ""} ${
            currentSelected === index ? "selected" : ""
          }`}
          onClick={() => onToggleBan(index)}
          onContextMenu={(event) => {
            event.preventDefault();
            onRightClick(index);
          }}
          onSelect={() => onToggleBan(index)}
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
