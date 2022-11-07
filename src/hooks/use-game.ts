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
  if (allTeams.value.length < 2) {
    return [];
  }

  // Create games with each other team
  for (const team of allTeams.value) {
    teamGames.push({
      id: `game_${team.id}_${newTeam.id}`,
      firstTeam: team,
      secondTeam: newTeam,
      match: {
        firstTeamPoints: 0,
        secondTeamPoints: 0,
      },
      rematch: {
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

    allTeams.value.push(newTeam);
    allGames.value = [...allGames.value, ...generateGames(newTeam)];
  };

  return {
    createTeam,

    allTeams,
    allGames,
  };
}
