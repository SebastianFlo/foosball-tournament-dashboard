import type { Player, Team } from "@/models/game.models";
import { computed, ref, type Ref } from "vue";

const allTeams: Ref<Team[]> = ref([]);

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

const nextColor = computed(() => COLORS[allTeams.value.length]);

export function useGame() {
  const createTeam = async (
    teamName: Team["name"],
    firstPlayerName: Player["name"],
    secondPlayerName: Player["name"]
  ) => {
    allTeams.value.push({
      id: `${allTeams.value.length + 1}`,
      name: teamName,
      color: nextColor.value,
      losses: 0,
      wins: 0,
      points: 0,
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
    });
  };

  return {
    createTeam,
    allTeams,
  };
}
