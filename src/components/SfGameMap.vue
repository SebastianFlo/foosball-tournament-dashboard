<template>
  <SfSection class="sf-game-map">
    <SfTeamItem>
      <template #icon>
        <SupportIcon />
      </template>
      <template #firstTeam>Team 1</template>
      <template #secondTeam>Team Avengers of Tomorrow 2</template>
    </SfTeamItem>
  </SfSection>
</template>

<script setup lang="ts">
import SfTeamItem from "./SfTeamItem.vue";
import SupportIcon from "./icons/IconSupport.vue";
import SfSection from "./SfSection.vue";
</script>

<style lang="scss">
.sf-game-map {
  margin-top: 30px;
}
</style>
