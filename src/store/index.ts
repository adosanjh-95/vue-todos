import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

enum TodoItemStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
}

enum TodoItemPriorities {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}
export interface TodoItemInfo {
  title: string;
  descriptipn?: string;
  priority: TodoItemPriorities;
}
interface TodoItem extends TodoItemInfo {
  status: TodoItemStatus;
  createdDate: Date;
  completedDate: Date | null;
}

interface State {
  todoItems: TodoItem[];
}

const state = {
  todoItems: [],
};

const getters = {
  getPendingItems: (state: State) => {
    return state.todoItems.filter(
      (item) => item.status === TodoItemStatus.PENDING
    );
  },
  getCompletedItems: (state: State) => {
    return state.todoItems.filter(
      (item) => item.status === TodoItemStatus.COMPLETED
    );
  },
};

const mutations = {
  initialiseStore(state: State) {
    if (localStorage.getItem("store")) {
      Object.assign(state, JSON.parse(localStorage.getItem("store") as string));
    }
  },
  addItem: (state: State, item: TodoItemInfo) => {
    state.todoItems.push({
      ...item,
      status: TodoItemStatus.PENDING,
      createdDate: new Date(),
      completedDate: null,
    });
  },
  deleteItem: (state: State, index: number) => {
    state.todoItems.splice(index, 1);
  },
  editItem: (
    state: State,
    payload: { index: number; newItemInfo: TodoItemInfo }
  ) => {
    const { index, newItemInfo } = payload;

    state.todoItems[index] = {
      ...state.todoItems[index],
      ...newItemInfo,
    };
  },
  completeItem: (state: State, index: number) => {
    state.todoItems[index] = {
      ...state.todoItems[index],
      status: TodoItemStatus.COMPLETED,
      completedDate: new Date(),
    };
  },
  revertItem: (state: State, index: number) => {
    state.todoItems[index] = {
      ...state.todoItems[index],
      status: TodoItemStatus.PENDING,
      completedDate: null,
    };
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
});
