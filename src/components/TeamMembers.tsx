export const TeamMembers = ({
  teamMembers,
  onCharacterSelect,
  selectedTeamMember,
}) => {
  const handleSlotClick = (index) => {
    if (!teamMembers[index]) {
      onCharacterSelect(index);
    }
  };

  return (
    <div className="team-members">
      {teamMembers.map((character, index) => (
        <div
          key={index}
          className={`team-member-slot ${character ? "filled" : "empty"} ${
            character === selectedTeamMember ? "selected" : ""
          }`}
          onClick={() => handleSlotClick(index)}
        >
          {character ? character.championName : "Empty Slot"}
        </div>
      ))}
    </div>
  );
};
