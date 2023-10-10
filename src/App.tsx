import { useState, useRef, useCallback } from "react";
import "./App.css";
import { CharacterCard } from "./components/CharacterCard";
import { BannedPicks } from "./components/BannedPicks";
import { TeamMembers } from "./components/TeamMembers";

import useChampionQuery from "./API/useChampionQuery";

interface Champion {
  championName: string;
  [key: string]: any;
}

function App() {
  const maxTeamSize = 5; // Maximum team size
  const maxBans = 5;

  const [bannedPicksTeam1, setBannedPicksTeam1] = useState<(Champion | null)[]>(
    Array(maxBans).fill(null)
  );
  const [selectedBannedPickTeam1, setSelectedBannedPickTeam1] =
    useState<Champion | null>(null);
  const [teamMembersTeam1, setTeamMembersTeam1] = useState<(Champion | null)[]>(
    Array(maxTeamSize).fill(null)
  );

  const [bannedPicksTeam2, setBannedPicksTeam2] = useState<(Champion | null)[]>(
    Array(maxBans).fill(null)
  );
  const [selectedBannedPickTeam2, setSelectedBannedPickTeam2] =
    useState<Champion | null>(null);
  const [teamMembersTeam2, setTeamMembersTeam2] = useState<(Champion | null)[]>(
    Array(maxTeamSize).fill(null)
  );

  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [selectedTeamMemberTeam1, setSelectedTeamMemberTeam1] =
    useState<Champion | null>(null);
  const [selectedTeamMemberTeam2, setSelectedTeamMemberTeam2] =
    useState<Champion | null>(null);

  const selectedCharacterRef = useRef<Champion | null>(null);
  const selectedBannedPickRef = useRef<number | null>(null);

  const handleAddToTeam = useCallback(
    (character: Champion, team: number) => {
      if (team === 1) {
        if (teamMembersTeam1.length < maxTeamSize) {
          setTeamMembersTeam1([...teamMembersTeam1, character]);
        }
      } else if (team === 2) {
        if (teamMembersTeam2.length < maxTeamSize) {
          setTeamMembersTeam2([...teamMembersTeam2, character]);
        }
      }
    },
    [teamMembersTeam1, teamMembersTeam2]
  );
  const handleMoveChampion = (
    fromTeam: number,
    toTeam: number,
    champion: Champion
  ) => {
    if (fromTeam === toTeam) {
      // move within the same team
      const updatedTeamMembers =
        fromTeam === 1 ? [...teamMembersTeam1] : [...teamMembersTeam2];
      const index = updatedTeamMembers.indexOf(champion);
      if (index !== -1) {
        updatedTeamMembers.splice(index, 1);
        if (fromTeam === 1) {
          setTeamMembersTeam1(updatedTeamMembers);
        } else {
          setTeamMembersTeam2(updatedTeamMembers);
        }
      }
    } else {
      // move between teams
      const updatedTeamMembers1 = [...teamMembersTeam1];
      const updatedTeamMembers2 = [...teamMembersTeam2];

      const index =
        fromTeam === 1
          ? updatedTeamMembers1.indexOf(champion)
          : updatedTeamMembers2.indexOf(champion);

      if (index !== -1) {
        if (fromTeam === 1) {
          updatedTeamMembers1.splice(index, 1);
          updatedTeamMembers2.push(champion);
          setTeamMembersTeam1(updatedTeamMembers1);
          setTeamMembersTeam2(updatedTeamMembers2);
        } else {
          updatedTeamMembers2.splice(index, 1);
          updatedTeamMembers1.push(champion);
          setTeamMembersTeam2(updatedTeamMembers2);
          setTeamMembersTeam1(updatedTeamMembers1);
        }
      }
    }
  };
  const handleSwapChampions = (championA: Champion, championB: Champion) => {
    const updatedTeamMembers1 = [...teamMembersTeam1];
    const updatedTeamMembers2 = [...teamMembersTeam2];

    const indexA = updatedTeamMembers1.indexOf(championA);
    const indexB = updatedTeamMembers2.indexOf(championB);

    if (indexA !== -1 && indexB !== -1) {
      updatedTeamMembers1[indexA] = championB;
      updatedTeamMembers2[indexB] = championA;
      setTeamMembersTeam1(updatedTeamMembers1);
      setTeamMembersTeam2(updatedTeamMembers2);
    }
  };

  const handleAddToBannedPicks = useCallback(
    (character: Champion, team: number) => {
      if (selectedBannedPickRef.current !== null) {
        const updatedBannedPicks = [
          ...(team === 1 ? bannedPicksTeam1 : bannedPicksTeam2),
        ];

        updatedBannedPicks[selectedBannedPickRef.current] = character;

        if (team === 1) {
          setBannedPicksTeam1(updatedBannedPicks);
        } else {
          setBannedPicksTeam2(updatedBannedPicks);
        }

        // Clear the selectedBannedPickRef
        selectedBannedPickRef.current = null;
      }
    },
    [bannedPicksTeam1, bannedPicksTeam2]
  );

  const handleToggleBan = useCallback(
    (index: number, team: number) => {
      const currentBannedPick =
        team === 1 ? bannedPicksTeam1[index] : bannedPicksTeam2[index];

      if (!currentBannedPick) {
        // If the slot is empty, ban a champion
        const updatedBannedPicks =
          team === 1 ? [...bannedPicksTeam1] : [...bannedPicksTeam2];

        updatedBannedPicks[index] =
          team === 1 ? selectedBannedPickTeam1 : selectedBannedPickTeam2;

        if (selectedBannedPickRef.current === index) {
          // If the same slot is clicked again, deselect it
          selectedBannedPickRef.current = null;
        } else {
          selectedBannedPickRef.current = index;
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
    },
    [
      bannedPicksTeam1,
      bannedPicksTeam2,
      selectedBannedPickTeam1,
      selectedBannedPickTeam2,
    ]
  );

  const handleSelectCharacter = useCallback(
    (character: Champion, team: number) => {
      if (selectedCharacterRef.current === character) {
        // If the selected character is already selected, clear the selection
        selectedCharacterRef.current = null;
        if (team === 1) {
          setSelectedBannedPickTeam1(null);
          setSelectedTeamMemberTeam1(null);
        } else {
          setSelectedBannedPickTeam2(null);
          setSelectedTeamMemberTeam2(null);
        }
      } else {
        // If a different character is selected, update the selection
        selectedCharacterRef.current = character;
        if (team === 1) {
          setSelectedBannedPickTeam1(null);
          setSelectedTeamMemberTeam1((prevTeamMembers) => {
            const emptySlotIndex = prevTeamMembers?.findIndex((c) => !c);
            if (emptySlotIndex !== -1) {
              const newTeamMembers = [...teamMembersTeam1];
              newTeamMembers[emptySlotIndex] = character;
              return newTeamMembers;
            }
            return teamMembersTeam1;
          });
          setSelectedBannedPickTeam2(null);
          setSelectedTeamMemberTeam2(null);
        } else {
          setSelectedBannedPickTeam2(null);
          setSelectedTeamMemberTeam2((prevTeamMembers) => {
            const emptySlotIndex = prevTeamMembers?.findIndex((c) => !c);
            if (emptySlotIndex !== -1) {
              const newTeamMembers = [...teamMembersTeam2];
              newTeamMembers[emptySlotIndex] = character;
              return newTeamMembers;
            }
            return teamMembersTeam2;
          });
          setSelectedBannedPickTeam1(null);
          setSelectedTeamMemberTeam1(null);
        }
      }
    },
    [teamMembersTeam1, teamMembersTeam2]
  );
  // check if the character is on either team or is banned already to disable the character
  const isCharacterDisabled = (character: Champion) => {
    const isOnTeam1 = teamMembersTeam1.some((c) => c?.id === character.id);
    const isOnTeam2 = teamMembersTeam2.some((c) => c?.id === character.id);
    const bannedPicks = [...bannedPicksTeam1, ...bannedPicksTeam2];
    const isBanned = bannedPicks.some((c) => c?.id === character.id);
    const isSelected =
      selectedTeamMemberTeam1 === character ||
      selectedTeamMemberTeam2 === character ||
      selectedBannedPickTeam1 === character ||
      selectedBannedPickTeam2 === character;
    return isOnTeam1 || isOnTeam2 || isBanned || isSelected;
  };
  // Fetch the champions
  const getChamptionsQuery = useChampionQuery();

  if (getChamptionsQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (getChamptionsQuery.isError) {
    return <div>Error fetching champions</div>;
  }
  const mappedChampions: Champion[] = [];

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
        <div
          className={`team ${selectedTeam === 1 ? "selected" : ""}`}
          onClick={() => setSelectedTeam(1)}
        >
          <h2>Team 1</h2>
          <BannedPicks
            bannedPicks={bannedPicksTeam1}
            currentSelected={selectedBannedPickRef.current}
            onToggleBan={(index) => handleToggleBan(index, 1)}
            onRightClick={(index) => {
              // remove the ban
              const updatedBannedPicks = [...bannedPicksTeam1];
              updatedBannedPicks[index] = null;

              setBannedPicksTeam1(updatedBannedPicks);
            }}
            onSwapChampions={handleSwapChampions}
            onMoveChampion={handleMoveChampion}
          />
        </div>
        <div
          className={`team ${selectedTeam === 2 ? "selected" : ""}`}
          onClick={() => setSelectedTeam(2)}
        >
          <h2>Team 2</h2>

          <BannedPicks
            bannedPicks={bannedPicksTeam2}
            currentSelected={selectedBannedPickRef.current}
            onToggleBan={(index) => handleToggleBan(index, 2)}
            onRightClick={(index) => {
              // remove the ban
              const updatedBannedPicks = [...bannedPicksTeam2];
              updatedBannedPicks[index] = null;

              setBannedPicksTeam2(updatedBannedPicks);
            }}
            onSwapChampions={handleSwapChampions}
            onMoveChampion={handleMoveChampion}
          />
        </div>
      </div>
      <section className="character-container">
        <TeamMembers
          teamMembers={teamMembersTeam1}
          onAddToTeam={(champion) => handleAddToTeam(champion, 1)}
          maxTeamSize={maxTeamSize}
          onMoveChampion={(champion) => handleMoveChampion(1, 2, champion)}
          onCharacterSelect={(champion) => handleSelectCharacter(champion, 1)}
          selectedTeamMember={selectedTeamMemberTeam2}
        />
        <div className="character-list">
          {mappedChampions.map((champion, index) => (
            <CharacterCard
              key={index}
              character={champion}
              team={selectedTeam}
              onAddToTeam={handleAddToTeam}
              onSelectBannedPick={handleSelectCharacter}
              onCharacterSelect={handleSelectCharacter}
              onAddToBannedPicks={handleAddToBannedPicks}
              isDisabled={isCharacterDisabled(champion)}
              selectedCharacterRef={selectedCharacterRef}
            />
          ))}
        </div>
        <TeamMembers
          teamMembers={teamMembersTeam2}
          onAddToTeam={(champion) => handleAddToTeam(champion, 2)}
          maxTeamSize={maxTeamSize}
          onMoveChampion={(champion) => handleMoveChampion(2, 2, champion)}
          onCharacterSelect={(champion) => handleSelectCharacter(champion, 2)}
          selectedTeamMember={selectedTeamMemberTeam2}
        />
      </section>
    </div>
  );
}

export default App;
