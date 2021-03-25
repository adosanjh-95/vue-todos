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
          :key="`${key}-input`"
          :disabled="disableAllTabs"
        />
        <label class="tab_selector__name" :for="key" :key="`${key}-label`">{{
          key
        }}</label>
      </template>
    </div>
    <div class="tab_selector__contents" v-if="$slots[options[selectedOption]]">
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
  computed: {
    disableAllTabs() {
      return Object.values(this.$slots).every((slot) => !slot);
    },
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

    &:disabled + .tab_selector__name {
      background-color: lightgray;
      cursor: initial;
    }
  }

  &__name {
    display: inline-block;
    background-color: $primary-orange;
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-size: 1rem;
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
