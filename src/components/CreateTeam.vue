<template>
  <v-dialog v-model="dialog" width="500" @click:outside="$emit('close')">
    <v-card color="#647689" class="rounded-xl pa-6">
      <v-form @submit="addTeam" v-model="valid">
        <v-card-title class="text-h5 grey lighten-2">
          <v-text-field
            class="text-white"
            variant="outlined"
            v-model="teamName"
            label="Team Name"
            :rules="requiredRules"
            required
          ></v-text-field>
        </v-card-title>

        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <!-- TODO: Image -->
              <v-text-field
                class="text-white"
                variant="underlined"
                v-model="firstPlayerName"
                label="First Player"
                :rules="requiredRules"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <!-- TODO: Image -->
              <v-text-field
                class="text-white"
                variant="underlined"
                v-model="secondPlayerName"
                label="Second Player"
                :rules="requiredRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-white" type="submit"> Add team </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useFirebase } from "@/hooks/use-firebase";
import { computed, ref, type PropType } from "vue";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      greeting: "Hello World!",
    };
  },
  props: {
    isOpen: {
      type: Boolean as PropType<boolean>,
      default: () => false,
    },
  },
  setup(props, { emit }) {
    const { createTeam } = useFirebase();
    const router = useRouter();

    const valid = ref(false);
    const teamName = ref("");
    const firstPlayerName = ref("");
    const secondPlayerName = ref("");

    const requiredRules = [(v: string) => !!v || "Field is required"];

    const dialog = computed(() => props.isOpen);

    const resetTeam = () => {
      teamName.value = "";
      firstPlayerName.value = "";
      secondPlayerName.value = "";
    };

    const addTeam = async () => {
      if (!valid.value) {
        return;
      }

      const role = teamName.value;

      await createTeam(
        teamName.value,
        firstPlayerName.value,
        secondPlayerName.value
      );

      resetTeam();

      router.push({ path: "/", query: { role } });
      emit("close");
    };

    return {
      teamName,
      firstPlayerName,
      secondPlayerName,

      addTeam,
      dialog,

      valid,
      requiredRules,
    };
  },
};
</script>

<style lang="scss">
.v-card {
  color: #000;
}
</style>
