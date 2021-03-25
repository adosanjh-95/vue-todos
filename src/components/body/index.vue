<template>
  <div class="container">
    <div v-if="todoItems.length === 0" class="add_note_container">
      <p class="add_note_container__intro">
        Click the button below to start adding your todos
      </p>
    </div>
    <div v-if="todoItems.length !== 0" class="todos_container">
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
    <font-awesome-icon
      :icon="['fas', 'plus-circle']"
      class="add_note_container__icon"
      @click="addItem"
    />
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
}

.todos_container {
  > div {
    margin-bottom: 1rem;
  }
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
