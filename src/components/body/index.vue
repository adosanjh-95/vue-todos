<template>
  <div class="container">
    <div v-if="items.length === 0" class="add_note_container">
      <p class="add_note_container__intro">
        Click the button below to start adding your todos
      </p>
      <font-awesome-icon
        :icon="['fas', 'plus-circle']"
        class="add_note_container__icon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    items: [],
  }),
});
</script>

<style lang="scss" scoped>
.container {
  margin: 1rem;
}

.add_note_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  justify-content: space-between;

  &__intro {
    font-size: 1.25rem;
    color: rgba(0, 0, 0, 0.4);
    margin: 0;
    margin-bottom: 2rem;
  }

  &__icon {
    color: $primary-blue;
    font-size: 3.5rem;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
