export function TeamMembers({ teamMembers, onAddToTeam, maxTeamSize }) {
  // Handle the click on a slot to add a character to the team
  const handleAddClick = (character) => {
    // Check if the team is not full
    if (teamMembers.length < maxTeamSize) {
      // Check if the character is not already in the team
      if (!teamMembers.includes(character)) {
        // Add the character to the team
        onAddToTeam(character);
      }
    }
  };

  return (
    <div className="team-members">
      <h3>Team Members</h3>
      <div className="team-member-slots">
        {teamMembers.map((character, index) => (
          <div key={index} className="team-member-slot">
            {character}
          </div>
        ))}
        {teamMembers.length < maxTeamSize && (
          <div
            className="team-member-slot empty"
            onClick={() => handleAddClick("+")}
          >
            +
          </div>
        )}
      </div>
    </div>
  );
}
