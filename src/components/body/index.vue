<template>
  <div class="container">
    <div v-if="todoItems.length === 0" class="add_note_container">
      <p class="add_note_container__intro">
        Click the button below to start adding your todos
      </p>
    </div>
    <div v-if="todoItems.length !== 0">
      <p>Notes found: {{ todoItems.length }}</p>
    </div>
    <font-awesome-icon
      :icon="['fas', 'plus-circle']"
      class="add_note_container__icon"
      @click="addItem"
    />
    <Popup v-if="showPopup" @cancel="handleCancel" @submit="handleSubmit" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Popup from "@/components/popup/index.vue";
import { TodoItemInfo } from "@/store";
import { mapState } from "vuex";

export default Vue.extend({
  data: () => ({
    showPopup: false,
  }),
  computed: {
    ...mapState(["todoItems"]),
  },
  methods: {
    addItem() {
      this.showPopup = true;
    },
    handleCancel() {
      this.showPopup = false;
    },
    handleSubmit(item: TodoItemInfo) {
      this.$store.commit("addItem", {
        ...item,
      });
      this.showPopup = false;
    },
  },
  components: {
    Popup,
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin: 1rem;
  width: 100%;
}

.add_note_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  justify-content: space-between;
  text-align: center;

  &__intro {
    font-size: 1.25rem;
    color: rgba(0, 0, 0, 0.4);
    margin: 0;
    margin-bottom: 2rem;

    @include desktop {
      font-size: 1.5rem;
    }
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
