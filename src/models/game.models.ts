export interface Game {
  id: string;
  firstTeam: Team;
  secondTeam: Team;
  match: {
    id: string;
    firstTeamPoints: number;
    secondTeamPoints: number;
  };
  rematch: {
    id: string;
    firstTeamPoints: number;
    secondTeamPoints: number;
  };
}

export interface Team {
  id: string;
  color: string;
  name: string;
  // wins: number;
  // losses: number;
  // points: number;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
}
