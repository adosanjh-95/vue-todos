<template>
  <div class="todo">
    <span
      :class="`todo__priority todo__priority--${todo.priority.toLowerCase()}`"
    />
    <h5 class="todo__title">{{ todo.title }}</h5>
    <p v-if="todo.description" class="todo__description">
      {{ todo.description }}
    </p>
    <div class="todo__actions">
      <font-awesome-icon
        v-for="action in getActions"
        :key="action.name"
        :icon="action.icon"
        @click="$emit(action.name, index)"
        :class="`todo__action todo__action--${action.name}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { TodoItem, TodoItemStatus } from "@/store";
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    todo: { type: Object as PropType<TodoItem>, required: true },
    index: { type: Number, required: true },
  },
  computed: {
    getActions() {
      if (this.todo.status === TodoItemStatus.PENDING) {
        return [
          {
            name: "edit",
            icon: ["fas", "edit"],
          },
          {
            name: "delete",
            icon: ["fas", "trash"],
          },
          {
            name: "complete",
            icon: ["fas", "check-circle"],
          },
        ];
      } else {
        return [
          {
            name: "delete",
            icon: ["fas", "trash"],
          },
          {
            name: "revert",
            icon: ["fas", "undo"],
          },
        ];
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.todo {
  box-sizing: border-box;
  border-radius: 20px;
  background-color: white;
  padding: 1.5rem;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;

  @include desktop {
    &:hover > &__actions {
      display: flex;
    }
  }

  &__title {
    margin: 0;
    font-size: 1.1rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }

  &__priority {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    display: inline-block;
    align-self: flex-start;

    &--high {
      background-color: $high-priority;
    }

    &--medium {
      background-color: $medium-priority;
    }

    &--low {
      background-color: $low-priority;
    }
  }

  &__description {
    font-size: 0.8rem;
    margin: 0;
    margin-top: 0.75rem;
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;

    @include desktop {
      display: none;
    }
  }

  &__action {
    margin-right: 1rem;
    font-size: 1.2rem;
    cursor: pointer;

    &:last-of-type {
      margin-right: 0rem;
    }

    &:hover {
      opacity: 0.5;
    }

    &--delete {
      color: rgba(0, 0, 0, 0.7);
    }

    &--edit {
      color: $primary-blue;
    }

    &--revert {
      color: black;
    }

    &--complete {
      color: green;
    }
  }
}
</style>
