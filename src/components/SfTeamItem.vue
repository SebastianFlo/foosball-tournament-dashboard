<template>
  <div class="sf-item">
    <i>
      <slot name="icon"></slot>
    </i>
    <!-- <div class="sf-details"> -->
    <h3 class="sf-details--first">
      <slot name="firstTeam"></slot>
    </h3>
    <h3 class="sf-details--second">
      <slot name="secondTeam"></slot>
    </h3>
    <!-- </div> -->
  </div>
</template>

<style scoped lang="scss">
.sf-item {
  margin-top: 0;
  padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  height: 120px;

  &:before {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  &:after {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  &:first-of-type:before {
    display: none;
  }

  &:last-of-type:after {
    display: none;
  }
}

i {
  display: flex;
  place-items: center;
  place-content: center;

  color: var(--color-text);

  top: calc(50% - 25px);
  left: -40px;
  position: absolute;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  border-radius: 8px;
  width: 50px;
  height: 50px;
}

h3 {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
  border: var(--theme-border);
  border-radius: 8px;
  padding: 0.4rem;
  position: absolute;
  background: var(--color-background);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;

  &.sf-details--first {
    top: -20px;
  }

  &.sf-details--second {
    bottom: -28px;
  }
}
</style>
