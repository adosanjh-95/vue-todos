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

export const isValidId = (index: number): boolean => index !== -1;

export const updateArrayWithModifiedItem = (
  currentArray: TodoItem[],
  modifiedItem: TodoItem,
  index: number
): TodoItem[] => {
  return [
    ...currentArray.slice(0, index),
    modifiedItem,
    ...currentArray.slice(index + 1),
  ];
};

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

    if (isValidId(index)) {
      const updatedItem = {
        ...state.todoItems[index],
        ...newItemInfo,
      };

      state.todoItems = updateArrayWithModifiedItem(
        state.todoItems,
        updatedItem,
        index
      );
    }
  },
  completeItem: (state: State, id: string): void => {
    const index = state.todoItems.findIndex((item) => item.id === id);

    if (isValidId(index)) {
      const updatedItem = {
        ...state.todoItems[index],
        status: TodoItemStatus.COMPLETED,
        completedDate: new Date(),
      };

      state.todoItems = updateArrayWithModifiedItem(
        state.todoItems,
        updatedItem,
        index
      );
    }
  },
  revertItem: (state: State, id: string): void => {
    const index = state.todoItems.findIndex((item) => item.id === id);

    if (isValidId(index)) {
      const updatedItem = {
        ...state.todoItems[index],
        status: TodoItemStatus.PENDING,
        completedDate: null,
      };

      state.todoItems = updateArrayWithModifiedItem(
        state.todoItems,
        updatedItem,
        index
      );
    }
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
});
