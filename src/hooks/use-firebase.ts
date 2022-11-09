// Import the functions you need from the SDKs you need
import type { Game, Player, Team } from "@/models/game.models";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { computed, onMounted, ref } from "vue";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sefhold-api.firebaseapp.com",
  projectId: "sefhold-api",
  storageBucket: "sefhold-api.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const COLORS = [
  "#ff869e",
  "#f5aa2b",
  "#4f01cf",
  "#90e4b6",
  "#4444E1",
  "#9869e4",
  "#ffe1ee",
  "#ffedc4",
  "#CCECFA",
];

const nextColor = computed(() => COLORS[allTeams.value.length]);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const docRef = doc(db, "foosball", "coQtj9dkZ0cl2aSWKV3x");
const docSnap = await getDoc(docRef);

const allGames = ref<Game[]>([]);
const allTeams = ref<Team[]>([]);

onSnapshot(docRef, (snap) => {
  if (!snap || !snap.exists()) {
    return;
  }

  allGames.value = snap.data().games;
  allTeams.value = snap.data().teams;
});

const allTeamPoints = computed(() => {
  // if no winners, no points;
  if (
    !allGames.value.find((game) => {
      return (
        game?.match.firstTeamPoints === 10 ||
        game?.match.secondTeamPoints === 10 ||
        game.rematch.firstTeamPoints === 10 ||
        game.rematch.secondTeamPoints === 10
      );
    })
  ) {
    return [];
  }

  return allTeams.value
    .map((team) => {
      const wins = allGames.value.reduce((acc, game) => {
        // is team in game
        if (game.firstTeam.id !== team.id && game.secondTeam.id !== team.id) {
          return acc;
        }

        // is team is first and match finished
        if (
          game.match.firstTeamPoints === 10 &&
          game.firstTeam.id === team.id
        ) {
          return acc + 1;
        }

        // is team is second and match finished
        if (
          game.match.secondTeamPoints === 10 &&
          game.secondTeam.id === team.id
        ) {
          return acc + 1;
        }

        // is team is first and rematch finished
        if (
          game.rematch.firstTeamPoints === 10 &&
          game.firstTeam.id === team.id
        ) {
          return acc + 1;
        }

        // is team is second and rematch finished
        if (
          game.rematch.secondTeamPoints === 10 &&
          game.secondTeam.id === team.id
        ) {
          return acc + 1;
        }

        return acc;
      }, 0);

      const losses = allGames.value.reduce((acc, game) => {
        // is team in game
        if (game.firstTeam.id !== team.id && game.secondTeam.id !== team.id) {
          return acc;
        }

        // is team is first and match finished
        if (
          game.match.firstTeamPoints === 10 &&
          game.firstTeam.id !== team.id
        ) {
          return acc + 1;
        }

        // is team is second and match finished
        if (
          game.match.secondTeamPoints === 10 &&
          game.secondTeam.id !== team.id
        ) {
          return acc + 1;
        }

        // is team is first and rematch finished
        if (
          game.rematch.firstTeamPoints === 10 &&
          game.firstTeam.id !== team.id
        ) {
          return acc + 1;
        }

        // is team is second and rematch finished
        if (
          game.rematch.secondTeamPoints === 10 &&
          game.secondTeam.id !== team.id
        ) {
          return acc + 1;
        }

        return acc;
      }, 0);

      // const wins = allGames.value.filter(
      //   (game) => {
      //     game.firstTeam.id === team.id;
      //     game?.winner?.id === team.id
      //   }
      // ).length;

      // const losses = allGames.value.filter(
      //   (game) => game?.loser?.id === team.id
      // ).length;

      return {
        team,
        wins,
        losses,
        points: wins * 3,
      };
    })
    .sort((a, b) => (a.points < b.points ? 1 : -1));
});

export function useFirebase() {
  const generateGames = (newTeam: Team): Game[] => {
    const teamGames: Game[] = [];
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

  const createTeam = async (
    teamName: Team["name"],
    firstPlayerName: Player["name"],
    secondPlayerName: Player["name"]
  ) => {
    const newTeam: Team = {
      id: `${allTeams.value.length + 1}_${teamName}`,
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

    updateGameandTeams({
      teams: [...allTeams.value, newTeam],
      games: [...allGames.value, ...generateGames(newTeam)],
    });
  };

  const increaseScore = async (
    gameId: Game["id"],
    teamKey: "firstTeamPoints" | "secondTeamPoints",
    matchId: Game["match"]["id"]
  ) => {
    const newGames = allGames.value.map((game: Game) => {
      if (game?.id === gameId) {
        const matchOrRematch = game.match.id === matchId ? "match" : "rematch";
        // const teamIndex =
        //   teamKey === "firstTeamPoints" ? "firstTeam" : "secondTeam";
        // const otherTeamIndex =
        //   teamKey === "firstTeamPoints" ? "secondTeam" : "firstTeam";

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

        // // We have a winner
        // if (match[teamKey] === 10) {
        //   gameScore.winner = game[teamIndex];
        //   gameScore.loser = game[otherTeamIndex];
        // }

        // return gameScore;
      }

      return game;
    });

    allGames.value = newGames;

    await updateGameandTeams({
      teams: allTeams.value,
      games: newGames,
    });
  };

  const decreaseScore = async (
    gameId: Game["id"],
    teamKey: "firstTeamPoints" | "secondTeamPoints",
    matchId: Game["match"]["id"]
  ) => {
    const newGames = allGames.value.map((game: Game) => {
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

        return {
          ...game,
          [matchOrRematch]: { ...match },
        };

        // We no longer have a winner
        // if (game.winner && game.winner.id === game[teamIndex].id) {
        //   delete gameScore.winner;
        //   delete gameScore.loser;
        // }

        // return gameScore;
      }

      return game;
    });

    allGames.value = newGames;

    await updateGameandTeams({
      teams: allTeams.value,
      games: newGames,
    });
  };

  const updateGameandTeams = async ({
    teams,
    games,
  }: {
    teams: Team[];
    games: Game[];
  }) => {
    const newDocData = {
      ...docSnap.data(),
      teams,
      games,
    };

    await updateDoc(docRef, newDocData);
  };

  return {
    app,

    allGames,
    allTeams,

    increaseScore,
    decreaseScore,

    createTeam,

    allTeamPoints,
  };
}
