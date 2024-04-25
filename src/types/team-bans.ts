
export interface OnClickBan {
    (index: number, team: "blue" | "red", type: "pick" | "ban"): void;
  }

export interface BannedPickSlotProps {
    index: number;
    version: string;
    team: "red" | "blue";
    bannedPick: string | null;
    handleRightClick: OnClickBan;
}

export interface TeamBanListProps {
    team: "red" | "blue";
    bans: (string | null)[];
}