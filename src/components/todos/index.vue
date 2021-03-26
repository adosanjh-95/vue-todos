<template>
  <div class="container">
    <span :class="['add_todo', { 'add_todo--inline': todosExist }]">
      <p class="add_todo__intro" v-if="!todosExist">
        Click the button below to start adding your todos
      </p>
      <font-awesome-icon
        :icon="['fas', 'plus-circle']"
        class="add_todo__icon"
        @click="addItem"
        data-testid="add-item-icon"
      />
    </span>
    <div class="todos_container">
      <TabSelector class="tab_selector" :options="getOptions">
        <template
          v-for="entry in getTodoContent"
          v-key="entry.name"
          v-slot:[entry.slotName]
        >
          <Todo
            v-for="todo in entry.data"
            :key="String(todo.createdDate)"
            :todo="todo"
            v-on="getTodoEventListeners"
          />
        </template>
      </TabSelector>
      <MultiGrid class="multi-grid" :options="getOptions" v-if="todosExist">
        <template
          v-for="entry in getTodoContent"
          v-key="entry.name"
          v-slot:[entry.slotName]
        >
          <Todo
            v-for="todo in entry.data"
            :key="String(todo.createdDate)"
            :todo="todo"
            v-on="getTodoEventListeners"
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
import { mapGetters, mapState } from "vuex";

interface Options {
  [key: string]: string;
}

interface TodoContent {
  name: string;
  slotName: string;
  data: TodoItem[];
}

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
    getTodoContent(): TodoContent[] {
      return [
        {
          name: "Pending",
          slotName: "pending-items",
          data: this.getPendingItems,
        },
        {
          name: "Completed",
          slotName: "completed-items",
          data: this.getCompletedItems,
        },
      ];
    },
    getOptions() {
      return (this.getTodoContent as TodoContent[]).reduce(
        (acc: Options, curr: TodoContent) => {
          return {
            ...acc,
            [curr.name]: curr.slotName,
          };
        },
        {}
      );
    },
    getTodoEventListeners() {
      return {
        complete: ({ id }: TodoItem) => this.$store.commit("completeItem", id),
        revert: ({ id }: TodoItem) => this.$store.commit("revertItem", id),
        delete: ({ id }: TodoItem) => this.$store.commit("deleteItem", id),
        edit: (item: TodoItem) => {
          this.showPopup = true;
          this.selectedItem = item;
        },
      };
    },
  },
  methods: {
    addItem() {
      this.showPopup = true;
    },
    handleCancel() {
      this.showPopup = false;
      this.selectedItem = {}; //reset selected item
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

.add_todo {
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
      margin-right: 1.75rem;

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
