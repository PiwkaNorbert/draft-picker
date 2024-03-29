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
  
