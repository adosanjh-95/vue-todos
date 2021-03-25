<template>
  <div class="container">
    <span
      :class="['add_note', { 'add_note--inline': todosExist }]"
      @click="addItem"
    >
      <p class="add_note__intro" v-if="!todosExist">
        Click the button below to start adding your todos
      </p>
      <font-awesome-icon
        :icon="['fas', 'plus-circle']"
        class="add_note__icon"
      />
    </span>
    <div class="todos_container">
      <TabSelector
        class="tab_selector"
        :options="{ Pending: 'pending-items', Completed: 'completed-items' }"
      >
        <template v-slot:pending-items>
          <Todo
            v-for="todo in getPendingItems"
            :key="String(todo.createdDate)"
            :todo="todo"
            @delete="deleteItem(todo.id)"
            @complete="completeItem(todo.id)"
            @revert="revertItem(todo.id)"
            @edit="editItem(todo)"
          />
        </template>
        <template v-slot:completed-items>
          <Todo
            v-for="todo in getCompletedItems"
            :key="String(todo.createdDate)"
            :todo="todo"
            @delete="deleteItem(todo.id)"
            @complete="completeItem(todo.id)"
            @revert="revertItem(todo.id)"
            @edit="editItem(todo)"
          />
        </template>
      </TabSelector>
      <MultiGrid
        class="multi-grid"
        :options="{ Pending: 'pending-items', Completed: 'completed-items' }"
        v-if="todosExist"
      >
        <template v-slot:pending-items>
          <Todo
            v-for="todo in getPendingItems"
            :key="String(todo.createdDate)"
            :todo="todo"
            @delete="deleteItem(todo.id)"
            @complete="completeItem(todo.id)"
            @revert="revertItem(todo.id)"
            @edit="editItem(todo)"
          />
        </template>
        <template v-slot:completed-items>
          <Todo
            v-for="todo in getCompletedItems"
            :key="String(todo.createdDate)"
            :todo="todo"
            @delete="deleteItem(todo.id)"
            @complete="completeItem(todo.id)"
            @revert="revertItem(todo.id)"
            @edit="editItem(todo)"
          />
        </template>
      </MultiGrid>
    </div>
    <Popup
      v-if="showPopup"
      @cancel="handleCancel"
      @submit="handleSubmit"
      v-bind="selectedItem"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Popup from "@/components/popup/index.vue";
import Todo from "@/components/todo/index.vue";
import TabSelector from "@/components/tabSelector/index.vue";
import MultiGrid from "@/components/multiGrid/index.vue";
import { TodoItem, TodoItemInfo } from "@/store";
import { mapGetters, mapMutations, mapState } from "vuex";

export default Vue.extend({
  data: () => ({
    showPopup: false,
    selectedItem: {},
  }),
  computed: {
    ...mapState(["todoItems"]),
    ...mapGetters(["getPendingItems", "getCompletedItems"]),
    todosExist() {
      return this.todoItems.length > 0;
    },
  },
  methods: {
    addItem() {
      this.showPopup = true;
    },
    handleCancel() {
      this.showPopup = false;
    },
    editItem(item: TodoItem) {
      this.showPopup = true;
      this.selectedItem = item;
    },
    handleSubmit(newItemInfo: TodoItemInfo, id: string | null) {
      if (id) {
        this.$store.commit("editItem", {
          id,
          newItemInfo,
        });
        this.selectedItem = {}; //reset selected item
      } else {
        this.$store.commit("addItem", {
          ...newItemInfo,
        });
      }
      this.showPopup = false;
    },
    ...mapMutations(["deleteItem", "completeItem", "revertItem"]),
  },
  components: {
    Popup,
    Todo,
    TabSelector,
    MultiGrid,
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin: 1rem;
  width: 100%;
  text-align: center;
  position: relative;
}

.todos_container {
  margin-bottom: 3.5rem;
}

.add_note {
  border-radius: 50%;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 5;
  background-color: white;

  @include desktop {
    position: unset;
    display: block;
  }

  &--inline {
    @include desktop {
      position: absolute;
      right: 50%;
      top: 0;
      bottom: unset;
      margin-right: 1rem;

      & > svg {
        font-size: 2.5rem;
      }
    }
  }

  &__intro {
    display: none;

    @include desktop {
      display: block;
      font-size: 1.5rem;
      color: rgba(0, 0, 0, 0.4);
    }
  }

  &__icon {
    color: $primary-blue;
    font-size: 2.5rem;
    cursor: pointer;

    @include desktop {
      font-size: 3.5rem;
    }

    &:hover {
      opacity: 0.5;
    }
  }
}

.tab_selector {
  @include desktop {
    display: none;
  }
}

.multi_grid {
  display: none;

  @include desktop {
    display: flex;
  }
}
</style>
