import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export enum TodoItemStatus {
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
export interface TodoItem extends TodoItemInfo {
  id: string;
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
      id: uuidv4(),
      status: TodoItemStatus.PENDING,
      createdDate: new Date(),
      completedDate: null,
    });
  },
  deleteItem: (state: State, id: string) => {
    state.todoItems = state.todoItems.filter((item) => item.id !== id);
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
  completeItem: (state: State, id: string) => {
    const index = state.todoItems.findIndex((item) => item.id === id);

    const updatedItem = {
      ...state.todoItems[index],
      status: TodoItemStatus.COMPLETED,
      completedDate: new Date(),
    };

    state.todoItems = [
      ...state.todoItems.splice(0, index),
      updatedItem,
      ...state.todoItems.slice(index + 1),
    ];
  },
  revertItem: (state: State, id: string) => {
    const index = state.todoItems.findIndex((item) => item.id === id);

    const updatedItem = {
      ...state.todoItems[index],
      status: TodoItemStatus.PENDING,
      completedDate: null,
    };

    state.todoItems = [
      ...state.todoItems.splice(0, index),
      updatedItem,
      ...state.todoItems.slice(index + 1),
    ];
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
});
