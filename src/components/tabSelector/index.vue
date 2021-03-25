<template>
  <div class="tab_selector">
    <div class="tab_selector__options">
      <template v-for="key in Object.keys(options)">
        <input
          type="radio"
          :value="key"
          v-model="selectedOption"
          class="tab_selector__option"
          :id="key"
          :key="key"
        />
        <label class="tab_selector__name" :for="key" :key="key">{{
          key
        }}</label>
      </template>
    </div>
    <div class="tab_selector__contents">
      <slot :name="options[selectedOption]" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

interface Options {
  [key: string]: string;
}

export default Vue.extend({
  data() {
    return {
      selectedOption: Object.keys(this.options)[0],
    };
  },
  props: {
    options: { type: Object as PropType<Options>, required: true },
  },
});
</script>

<style lang="scss" scoped>
.tab_selector {
  display: flex;
  flex-direction: column;

  &__options {
    display: flex;
  }

  &__option {
    display: none;

    &:checked + .tab_selector__name {
      background-color: $primary-blue;
      opacity: 1;
    }
  }

  &__name {
    display: inline-block;
    background-color: $primary-orange;
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    opacity: 0.7;
    flex: 1;

    &:first-of-type {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-of-type {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  &__contents {
    margin-top: 1rem;

    & > *:not(:last-child) {
      margin-bottom: 0.75rem;
    }
  }
}
</style>
