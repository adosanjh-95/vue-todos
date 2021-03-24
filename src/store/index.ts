import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export enum TodoItemStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
}

export enum TodoItemPriorities {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}
export interface TodoItemInfo {
  title: string;
  description?: string;
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

export const getters = {
  getPendingItems: (state: State): TodoItem[] => {
    return state.todoItems.filter(
      (item) => item.status === TodoItemStatus.PENDING
    );
  },
  getCompletedItems: (state: State): TodoItem[] => {
    return state.todoItems.filter(
      (item) => item.status === TodoItemStatus.COMPLETED
    );
  },
};

// COULD MAKE A UTIL TO DO THE UPDATE
// PROTECT AGAINST ITEM NOT BEING FOUND IN STATE FOR SOME REASON

export const mutations = {
  initialiseStore(state: State): void {
    if (localStorage.getItem("store")) {
      Object.assign(state, JSON.parse(localStorage.getItem("store") as string));
    }
  },
  addItem: (state: State, item: TodoItemInfo): void => {
    state.todoItems.push({
      ...item,
      id: uuidv4(),
      status: TodoItemStatus.PENDING,
      createdDate: new Date(),
      completedDate: null,
    });
  },
  deleteItem: (state: State, id: string): void => {
    state.todoItems = state.todoItems.filter((item) => item.id !== id);
  },
  editItem: (
    state: State,
    payload: { id: string; newItemInfo: TodoItemInfo }
  ): void => {
    const { id, newItemInfo } = payload;

    const index = state.todoItems.findIndex((item) => item.id === id);

    const updatedItem = {
      ...state.todoItems[index],
      ...newItemInfo,
    };

    state.todoItems = [
      ...state.todoItems.slice(0, index),
      updatedItem,
      ...state.todoItems.slice(index + 1),
    ];
  },
  completeItem: (state: State, id: string): void => {
    const index = state.todoItems.findIndex((item) => item.id === id);

    const updatedItem = {
      ...state.todoItems[index],
      status: TodoItemStatus.COMPLETED,
      completedDate: new Date(),
    };

    state.todoItems = [
      ...state.todoItems.slice(0, index),
      updatedItem,
      ...state.todoItems.slice(index + 1),
    ];
  },
  revertItem: (state: State, id: string): void => {
    const index = state.todoItems.findIndex((item) => item.id === id);

    const updatedItem = {
      ...state.todoItems[index],
      status: TodoItemStatus.PENDING,
      completedDate: null,
    };

    state.todoItems = [
      ...state.todoItems.slice(0, index),
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
