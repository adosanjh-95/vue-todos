<template>
  <header class="header">
    <font-awesome-icon :icon="['fas', 'stream']" class="header__icon" />
    <h1 class="header__title">Todos</h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: $primary-blue;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;

  @include desktop {
    height: 5rem;
  }

  &__icon {
    font-size: 1rem;
    color: white;
    margin-right: 0.5rem;

    @include desktop {
      font-size: 2rem;
      margin-right: 1rem;
    }
  }

  &__title {
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    margin: 0;
    color: white;
    font-size: 1.5rem;

    @include desktop {
      font-size: 2.25rem;
    }
  }
}
</style>
