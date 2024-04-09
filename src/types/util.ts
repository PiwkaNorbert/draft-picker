export type TeamAvg = {
    red_team: Player[];
    blue_team: Player[];
}

export type Player = {
    champion: string;
    stats?: Stats;
}


interface Stats {
    [selectedStat: string]: number | undefined;
  }
  
export interface DraftObject {
    Blue_ban1: string | null;
    Red_ban1: string | null;
    Blue_ban2: string | null;
    Red_ban2: string | null;
    Blue_ban3: string | null;
    Red_ban3: string | null;
  
    Blue_pick1: string | null;
    Red_pick1: string | null;
    Red_pick2: string | null;
    Blue_pick2: string | null;
    Blue_pick3: string | null;
    Red_pick3: string | null;
  
    Red_ban4: string | null;
    Blue_ban4: string | null;
    Red_ban5: string | null;
    Blue_ban5: string | null;
  
    Red_pick4: string | null;
    Blue_pick4: string | null;
    Blue_pick5: string | null;
    Red_pick5: string | null;
  }

  export interface QueryParams {
    tags: string[];
    search: string;
  }