<template>
  <div class="greetings">
    <SigLogo />
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import SigLogo from "./icons/SigLogo.vue";

export default {
  components: {
    SigLogo,
  },
  props: {
    msg: String,
  },
  setup(props, ctx) {},
};
</script>

<style lang="scss" scoped>
.greetings {
  max-width: 300px;
}

h1 {
  font-size: 28px;
  font-weight: 900;
  line-height: 28px;
  text-transform: uppercase;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
