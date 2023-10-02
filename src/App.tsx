import { useState } from "react";

import "./App.css";
import { CharacterCard } from "./components/CharacterCard";
import { BannedPicks } from "./components/BannedPicks";
import { TeamMembers } from "./components/TeamMembers";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  const maxTeamSize = 5; // Maximum team size
  const maxBans = 5;

  const [bannedPicksTeam1, setBannedPicksTeam1] = useState(
    Array(maxBans).fill(null)
  );
  const [selectedBannedPickTeam1, setSelectedBannedPickTeam1] = useState(null);
  const [teamMembersTeam1, setTeamMembersTeam1] = useState(
    Array(maxTeamSize).fill(null)
  );

  const [bannedPicksTeam2, setBannedPicksTeam2] = useState(
    Array(maxBans).fill(null)
  );
  const [selectedBannedPickTeam2, setSelectedBannedPickTeam2] = useState(null);
  const [teamMembersTeam2, setTeamMembersTeam2] = useState(
    Array(maxTeamSize).fill(null)
  );

  const [currentSelected, setCurrentSelected] = useState(null);

  const handleAddToTeam = (character: any, team: any) => {
    if (team === 1) {
      if (teamMembersTeam1.length < maxTeamSize) {
        setTeamMembersTeam1([...teamMembersTeam1, character]);
      }
    } else if (team === 2) {
      if (teamMembersTeam2.length < maxTeamSize) {
        setTeamMembersTeam2([...teamMembersTeam2, character]);
      }
    }
  };

  const handleAddToBannedPicks = (character, team) => {
    if (currentSelected !== null) {
      const updatedBannedPicks = [
        ...(team === 1 ? bannedPicksTeam1 : bannedPicksTeam2),
      ];
      updatedBannedPicks[currentSelected] = character;

      if (team === 1) {
        setBannedPicksTeam1(updatedBannedPicks);
      } else {
        setBannedPicksTeam2(updatedBannedPicks);
      }

      // Clear the currentSelected state
      setCurrentSelected(null);
    }
  };

  const handleSelectCharacter = (character, team) => {
    if (team === 1) {
      setSelectedBannedPickTeam1(character);
      setSelectedBannedPickTeam2(null); // Clear the selected champion for Team 2
    } else {
      setSelectedBannedPickTeam2(character);
      setSelectedBannedPickTeam1(null); // Clear the selected champion for Team 1
    }
  };

  const handleToggleBan = (index, team: number) => {
    const currentBannedPick =
      team === 1 ? bannedPicksTeam1[index] : bannedPicksTeam2[index];
    console.log("Current Banned Pick:", team, currentBannedPick);

    if (!currentBannedPick) {
      // If the slot is empty, ban a champion
      const updatedBannedPicks =
        team === 1 ? [...bannedPicksTeam1] : [...bannedPicksTeam2];
      console.log("Updated Banned Picks:", updatedBannedPicks[index]);

      updatedBannedPicks[index] =
        team === 1 ? selectedBannedPickTeam1 : selectedBannedPickTeam2;
      console.log(currentSelected);
      console.log(index);

      if (currentSelected === index) {
        // If the same slot is clicked again, deselect it
        setCurrentSelected(null);
      } else {
        setCurrentSelected(index);
      }

      if (team === 1) {
        setBannedPicksTeam1(updatedBannedPicks);
        setSelectedBannedPickTeam1(null); // Clear the selected champion for Team 1
      } else {
        setBannedPicksTeam2(updatedBannedPicks);
        setSelectedBannedPickTeam2(null); // Clear the selected champion for Team 2
      }
    } else {
      // If the slot contains a banned pick, select it
      if (team === 1) {
        setSelectedBannedPickTeam1(currentBannedPick);
        setSelectedBannedPickTeam2(null); // Clear the selected champion for Team 2
      } else {
        setSelectedBannedPickTeam2(currentBannedPick);
        setSelectedBannedPickTeam1(null); // Clear the selected champion for Team 1
      }
    }
  };

  const isCharacterDisabled = (character: any) => {
    return (
      teamMembersTeam1.includes(character) ||
      teamMembersTeam2.includes(character) ||
      bannedPicksTeam1.includes(character) ||
      bannedPicksTeam2.includes(character)
    );
  };

  async function getNewestVersion() {
    const response = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const versions = response.data;
    return versions[0];
  }
  async function getChampions() {
    const newestVersion = await getNewestVersion();
    const response = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/${newestVersion}/data/en_US/champion.json`
    );
    if (response.status !== 200) {
      throw new Error("Error fetching champions");
    }
    const champions = response.data;
    return champions;
  }
  const getChamptionsQuery = useQuery(["champions"], getChampions);

  if (getChamptionsQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (getChamptionsQuery.isError) {
    return <div>Error fetching champions</div>;
  }
  const mappedChampions = [];

  // Iterate over the object keys (champion names)
  for (const championName in getChamptionsQuery.data.data) {
    if (getChamptionsQuery.data.data.hasOwnProperty(championName)) {
      const champion = getChamptionsQuery.data.data[championName];

      // Add additional properties or manipulate the data as needed
      // For example, you can add the champion name as a property
      champion.championName = championName;

      // Push the champion data to the mappedChampions array
      mappedChampions.push(champion);
    }
  }
  return (
    <div className="App">
      <h1>League of Legends Draft</h1>
      <div className="teams">
        <div className="team">
          <h2>Team 1</h2>
          <BannedPicks
            bannedPicks={bannedPicksTeam1}
            onToggleBan={(index) => handleToggleBan(index, 1)}
            onRightClick={(index) => {
              // remove the ban
              const updatedBannedPicks = [...bannedPicksTeam1];
              updatedBannedPicks[index] = null;
              setBannedPicksTeam1(updatedBannedPicks);
            }}
          />
          <TeamMembers
            teamMembers={teamMembersTeam1}
            onAddToTeam={(character) => handleAddToTeam(character, 1)}
            maxTeamSize={maxTeamSize}
          />
        </div>
        <div className="team">
          <h2>Team 2</h2>

          <BannedPicks
            bannedPicks={bannedPicksTeam2}
            onToggleBan={(index) => handleToggleBan(index, 2)}
          />
          <TeamMembers
            teamMembers={teamMembersTeam2}
            onAddToTeam={(character) => handleAddToTeam(character, 2)}
            maxTeamSize={maxTeamSize}
          />
        </div>
      </div>
      <section className="character-container">
        <div className="character-list">
          {mappedChampions.map((character, index) => (
            <CharacterCard
              key={index}
              character={character}
              team={1} // Pass the team number here (1 or 2)
              onAddToTeam={handleAddToTeam}
              onSelectBannedPick={handleSelectCharacter}
              onAddToBannedPicks={handleAddToBannedPicks}
              isDisabled={isCharacterDisabled(character)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
