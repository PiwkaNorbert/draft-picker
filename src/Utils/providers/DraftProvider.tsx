// DraftContext.tsx

import React, { createContext, useState } from 'react';
import { DraftObject, TeamAvg } from '@/src/types/util';

// Define the shape of your context
interface DraftContextType {
  draft: DraftObject;
  redBans: string[];
  blueBans: string[];
  redPicks: string[];
  bluePicks: string[];
  setDraft: React.Dispatch<React.SetStateAction<DraftObject>>;
  teamAvg: TeamAvg | null;
  setTeamavg: React.Dispatch<React.SetStateAction<TeamAvg | null>>;
}

// Create the context
export const DraftContext = createContext<DraftContextType | undefined>(undefined);

// Create the provider component
export const DraftProvider = ({ children }: {children: React.ReactNode}) => {

  const [teamAvg, setTeamavg] = useState<TeamAvg | null>(null);

  const [draft, setDraft] = useState<DraftObject>({

      // Blue_ban1: null,
      // Red_ban1: null,
      // Blue_ban2: null,
      // Red_ban2: null,
      // Blue_ban3: null,
      // Red_ban3: null,
  
      // Blue_pick1: null,
      // Red_pick1: null,
      // Red_pick2: null,
      // Blue_pick2: null,
      // Blue_pick3: null,
      // Red_pick3: null,
  
      // Red_ban4: null,
      // Blue_ban4: null,
      // Red_ban5: null,
      // Blue_ban5: null,
  
      // Red_pick4: null,
      // Blue_pick4: null,
      // Blue_pick5: null,
      // Red_pick5: null,
      
      "Blue_ban1": "Amumu",
      "Red_ban1": "Azir",
      "Blue_ban2": "Alistar",
      "Red_ban2": "AurelionSol",
      "Blue_ban3": "Akshan",
      "Red_ban3": "Ashe",
      "Blue_pick1": "Akali",
      "Red_pick1": "Aphelios",
      "Red_pick2": "Annie",
      "Blue_pick2": "Ahri",
      "Blue_pick3": "Aatrox",
      "Red_pick3": "Anivia",
      "Red_ban4": "Bard",
      "Blue_ban4": "Caitlyn",
      "Red_ban5": "Belveth",
      "Blue_ban5": "Camille",
      "Red_pick4": "Blitzcrank",
      "Blue_pick4": "Cassiopeia",
      "Blue_pick5": "Chogath",
      "Red_pick5": null
  });

  // Check the draft object and filter the blue bans and red bans into their own arrays
  const getDraftEntries = (draft: DraftObject, keyMatch: string) => {
    return Object.entries(draft)
      .filter(([key]) => key.includes(keyMatch))
      .map(([, value]) => value);
  };

  const blueBans = getDraftEntries(draft, "Blue_ban") as string[];
  const redBans = getDraftEntries(draft, "Red_ban") as string[];
  const bluePicks = getDraftEntries(draft, "Blue_pick") as string[];
  const redPicks = getDraftEntries(draft, "Red_pick") as string[];

  return (
    <DraftContext.Provider value={{ draft, redBans, blueBans, redPicks, bluePicks, setDraft, teamAvg, setTeamavg}}>
      {children}
    </DraftContext.Provider>
  );
};

