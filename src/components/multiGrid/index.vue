<template>
  <div class="multi_grid">
    <div class="grid" v-for="key in Object.keys(options)" :key="key">
      <h3 class="grid__header">{{ key }}</h3>
      <div class="grid__contents" v-if="!!$slots[options[key]]">
        <slot :name="options[key]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

interface Options {
  [key: string]: string;
}

export default Vue.extend({
  props: {
    options: { type: Object as PropType<Options>, required: true },
  },
});
</script>

<style lang="scss" scoped>
.multi_grid {
  display: flex;
}

.grid {
  flex: 1;

  &__header {
    font-size: 1.75rem;
    margin: 0;
    text-align: center;
    display: block;
  }

  &__contents {
    padding: 1rem 1.75rem;
    display: grid;
    grid-gap: 1rem 1rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
}
</style>
