import type { Game, Player, Team } from "@/models/game.models";
import { computed, ref, type Ref } from "vue";

const allTeams: Ref<Team[]> = ref([]);
const allGames: Ref<(Game | null)[]> = ref([]);

const COLORS = [
  "#4F00CF",
  "#0ACFA2",
  "#CF4415",
  "#5C15CF",
  "#CFC715",
  "#4444E1",
  "#15CF3C",
  "#88A9EF",
  "#AAD0F5",
  "#CCECFA",
];

// Assign acolor for every team (up to 8)
const nextColor = computed(() => COLORS[allTeams.value.length]);

const allTeamPoints = computed(() => {
  // if no winners, no points;
  if (!allGames.value.find((game) => game?.winner?.id)) {
    return [];
  }

  return allTeams.value
    .map((team) => {
      const wins = allGames.value.filter(
        (game) => game?.winner?.id === team.id
      ).length;
      const losses = allGames.value.filter(
        (game) => game?.loser?.id === team.id
      ).length;

      return {
        team,
        wins,
        losses,
        points: wins * 3,
      };
    })
    .sort((a, b) => (a.points < b.points ? 1 : -1));
});

// Dynamically generate game combinations
const generateGames = (newTeam: Team): (Game | null)[] => {
  const teamGames: (Game | null)[] = [];
  if (allTeams.value.length < 1) {
    return [];
  }

  // Create games with each other team
  for (const team of allTeams.value) {
    teamGames.push({
      id: `game_${team.id}_${newTeam.id}`,
      firstTeam: team,
      secondTeam: newTeam,
      match: {
        id: `game_${team.id}_${newTeam.id}_match`,
        firstTeamPoints: 0,
        secondTeamPoints: 0,
      },
      rematch: {
        id: `game_${team.id}_${newTeam.id}_rematch`,
        firstTeamPoints: 0,
        secondTeamPoints: 0,
      },
    });
  }

  return teamGames;
};

export function useGame() {
  const createTeam = async (
    teamName: Team["name"],
    firstPlayerName: Player["name"],
    secondPlayerName: Player["name"]
  ) => {
    const newTeam: Team = {
      id: `${allTeams.value.length + 1}`,
      name: teamName,
      color: nextColor.value,
      players: [
        {
          id: `${allTeams.value.length + 1}_player_1`,
          name: firstPlayerName,
          avatar: "",
        },
        {
          id: `${allTeams.value.length + 1}_player_2`,
          name: secondPlayerName,
          avatar: "",
        },
      ],
    };

    allGames.value = [...allGames.value, ...generateGames(newTeam)];
    allTeams.value.push(newTeam);
  };

  const increaseScore = async (
    gameId: Game["id"],
    teamKey: "firstTeamPoints" | "secondTeamPoints",
    matchId: Game["match"]["id"]
  ) => {
    allGames.value = allGames.value.map((game: Game | null) => {
      if (game?.id === gameId) {
        const matchOrRematch = game.match.id === matchId ? "match" : "rematch";
        const teamIndex =
          teamKey === "firstTeamPoints" ? "firstTeam" : "secondTeam";
        const otherTeamIndex =
          teamKey === "firstTeamPoints" ? "secondTeam" : "firstTeam";

        const match = {
          ...game[matchOrRematch],
          [teamKey]:
            game[matchOrRematch][teamKey] >= 10
              ? 10
              : game[matchOrRematch][teamKey] + 1,
        };

        const gameScore = {
          ...game,
          [matchOrRematch]: { ...match },
        };

        // We have a winner
        if (match[teamKey] === 10) {
          gameScore.winner = game[teamIndex];
          gameScore.loser = game[otherTeamIndex];
        }

        return gameScore;
      }

      return game;
    });
  };

  const decreaseScore = async (
    gameId: Game["id"],
    teamKey: "firstTeamPoints" | "secondTeamPoints",
    matchId: Game["match"]["id"]
  ) => {
    allGames.value = allGames.value.map((game: Game | null) => {
      if (game?.id === gameId) {
        const matchOrRematch = game.match.id === matchId ? "match" : "rematch";
        const teamIndex =
          teamKey === "firstTeamPoints" ? "firstTeam" : "secondTeam";

        const match = {
          ...game[matchOrRematch],
          [teamKey]:
            game[matchOrRematch][teamKey] <= 0
              ? 0
              : game[matchOrRematch][teamKey] - 1,
        };

        const gameScore = {
          ...game,
          [matchOrRematch]: { ...match },
        };

        // We no longer have a winner
        if (game.winner && game.winner.id === game[teamIndex].id) {
          gameScore.winner = undefined;
          gameScore.loser = undefined;
        }

        return gameScore;
      }

      return game;
    });
  };

  return {
    createTeam,

    increaseScore,
    decreaseScore,

    allTeamPoints,

    allTeams,
    allGames,
  };
}
