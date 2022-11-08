<template>
  <v-dialog v-model="dialog" width="500" @click:outside="$emit('close')">
    <v-card class="rounded-xl pa-6">
      <v-form>
        <v-card-title class="text-h5 grey lighten-2">
          <v-text-field v-model="teamName" label="Team Name"></v-text-field>
        </v-card-title>

        <v-divider></v-divider>

        <v-container>
          <v-row>
            <v-col>
              TODO: Image
              <v-text-field
                v-model="firstPlayerName"
                label="First Player"
              ></v-text-field>
            </v-col>

            <v-divider class="mx-4" vertical></v-divider>

            <v-col>
              TODO: Image
              <v-text-field
                v-model="secondPlayerName"
                label="Second Player"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="addTeam"> Add team </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useFirebase } from "@/hooks/use-firebase";
import { computed, ref, type PropType } from "vue";

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

    const teamName = ref("");
    const firstPlayerName = ref("");
    const secondPlayerName = ref("");

    const dialog = computed(() => props.isOpen);

    const resetTeam = () => {
      teamName.value = "";
      firstPlayerName.value = "";
      secondPlayerName.value = "";
    };

    const addTeam = async () => {
      await createTeam(
        teamName.value,
        firstPlayerName.value,
        secondPlayerName.value
      );

      resetTeam();

      emit("close");
    };

    return {
      teamName,
      firstPlayerName,
      secondPlayerName,

      addTeam,
      dialog,
    };
  },
};
</script>

<style lang="scss"></style>
