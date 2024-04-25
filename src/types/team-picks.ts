export interface TeamMemberListProps {
    team: Team
    members: (string | null)[]
}
  
export interface MemberSlotProps {
    member: string | null;
    index: number;
    version: string;
    team: Team
    handleRightClick: OnClickBan;
}
  
export interface OnClickBan {
    (index: number, team: "blue" | "red", type: "pick" | "ban"): void;
}

type Team = "blue" | "red";