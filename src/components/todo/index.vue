<template>
  <div class="todo">
    <span
      :class="`todo__priority todo__priority--${todo.priority.toLowerCase()}`"
      data-testid="priority-circle"
    />
    <h5 class="todo__title">
      <del v-if="!isPending">{{ todo.title }}</del>
      <template v-else>{{ todo.title }} </template>
    </h5>
    <p v-if="todo.description" class="todo__description">
      <del v-if="!isPending">{{ todo.description }}</del>
      <template v-else>{{ todo.description }} </template>
    </p>
    <div class="todo__actions">
      <font-awesome-icon
        v-for="action in getActions"
        :key="action.name"
        :icon="action.icon"
        @click="$emit(action.name, todo)"
        :class="`todo__action todo__action--${action.name}`"
        :data-testid="`${action.name}-icon`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { TodoItem, TodoItemStatus } from "@/store";

export default Vue.extend({
  props: {
    todo: { type: Object as PropType<TodoItem>, required: true },
  },
  computed: {
    isPending(): boolean {
      return this.todo.status === TodoItemStatus.PENDING;
    },
    getActions() {
      if (this.isPending) {
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
  border-radius: $border-radius;
  background-color: white;
  padding: 1rem;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;

  @include desktop {
    padding: 1.5rem;

    &:hover > &__actions {
      display: flex;
    }
  }

  &__title {
    margin: 0;
    font-size: 1.1rem;
    margin-top: 0.5rem;

    @include desktop {
      font-size: 1.3rem;
    }
  }

  &__priority {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    display: inline-block;

    @include desktop {
      height: 1.75rem;
      width: 1.75rem;
    }

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
    white-space: pre-wrap;
    line-height: 1.2rem;

    @include desktop {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;

    @include desktop {
      display: none;
      position: absolute;
      background-color: white;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: 0;
      align-items: center;
      border-radius: $border-radius;
    }
  }

  &__action {
    margin-right: 1rem;
    font-size: 1.2rem;
    cursor: pointer;

    @include desktop {
      font-size: 1.5rem;
    }

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
      color: $primary-blue;
    }

    &--complete {
      color: green;
    }
  }
}
</style>
