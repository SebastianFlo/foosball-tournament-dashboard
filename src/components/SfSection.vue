<template>
  <section class="sf-section">
    <slot></slot>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.sf-section {
  border: 1px solid var(--color-border);
  border-right: none;
  background: var(--color-background);
  border-radius: 8px 0px 0px 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
