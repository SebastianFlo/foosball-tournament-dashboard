import type { Game, Player, Team } from "@/models/game.models";
import { computed, ref, type Ref } from "vue";

const allTeams: Ref<Team[]> = ref([]);
const allGames: Ref<(Game | null)[]> = ref([]);

const COLORS = [
  "#6F0053",
  "#8100A1",
  "#4f00cf",
  "#4322D8",
  "#4444E1",
  "#6678E8",
  "#88A9EF",
  "#AAD0F5",
  "#CCECFA",
];

// Assign acolor for every team (up to 8)
const nextColor = computed(() => COLORS[allTeams.value.length]);

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

        const match = {
          ...game[matchOrRematch],
          [teamKey]:
            game[matchOrRematch][teamKey] >= 10
              ? 10
              : game[matchOrRematch][teamKey] + 1,
        };

        return {
          ...game,
          [matchOrRematch]: { ...match },
        };
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

        const match = {
          ...game[matchOrRematch],
          [teamKey]:
            game[matchOrRematch][teamKey] <= 0
              ? 0
              : game[matchOrRematch][teamKey] - 1,
        };

        return {
          ...game,
          [matchOrRematch]: { ...match },
        };
      }

      return game;
    });
  };

  return {
    createTeam,

    increaseScore,
    decreaseScore,

    allTeams,
    allGames,
  };
}
