import {
  getters,
  mutations,
  TodoItem,
  TodoItemStatus,
  TodoItemPriorities,
  isValidId,
} from "@/store/index";
import { v4 as uuidv4 } from "uuid";

const getState = (items: TodoItem[] = []) => ({
  todoItems: items,
});

const generateTodoItem = (
  type: TodoItemStatus = TodoItemStatus.PENDING
): TodoItem => ({
  title: "test",
  description: "test",
  priority: TodoItemPriorities.HIGH,
  status: type,
  createdDate: new Date(),
  completedDate: type === TodoItemStatus.COMPLETED ? new Date() : null,
  id: uuidv4(),
});

describe("isValidId", () => {
  it("returns true for a valid id", () => {
    expect(isValidId(10)).toEqual(true);
  });

  it("returns false for an invalid id", () => {
    expect(isValidId(-1)).toEqual(false);
  });
});

describe("getters", () => {
  describe("getPendingItems", () => {
    const { getPendingItems } = getters;

    it("should return the correct result for an empty state", () => {
      const result = getPendingItems(getState());

      expect(result).toEqual([]);
    });

    it("should return the correct result when both completed and pending items exist", () => {
      const testData = [
        generateTodoItem(TodoItemStatus.COMPLETED),
        generateTodoItem(),
      ];

      const result = getPendingItems(getState(testData));

      expect(result).toEqual([testData[1]]);
    });
  });

  describe("getCompletedItems", () => {
    const { getCompletedItems } = getters;

    it("should return the correct result for an empty state", () => {
      const result = getCompletedItems(getState());

      expect(result).toEqual([]);
    });

    it("should return the correct result when both completed and pending items exist", () => {
      const testData = [
        generateTodoItem(TodoItemStatus.COMPLETED),
        generateTodoItem(),
      ];

      const result = getCompletedItems(getState(testData));

      expect(result).toEqual([testData[0]]);
    });
  });
});

describe("mutations", () => {
  describe("initialiseStore", () => {
    const { initialiseStore } = mutations;

    it("updates the store with the local storage entry when it exists", () => {
      jest.spyOn(Storage.prototype, "setItem");
      Storage.prototype.getItem = jest.fn(() => `{"todoItems": "test"}`);

      const state = getState();

      initialiseStore(state);

      expect(state).toEqual({ todoItems: "test" });
    });

    it("use the default state when the local storage entry does not exist", () => {
      jest.spyOn(Storage.prototype, "setItem");
      Storage.prototype.getItem = jest.fn(() => null);

      const state = getState();

      initialiseStore(state);

      expect(state).toEqual({ todoItems: [] });
    });
  });

  describe("addItem", () => {
    const { addItem } = mutations;

    it("successfully adds the item to the existing state", () => {
      const newItem = {
        title: "test",
        description: "test",
        priority: TodoItemPriorities.LOW,
      };

      const state = getState();

      addItem(state, newItem);

      expect(state.todoItems.length).toEqual(1);
    });
  });

  describe("deleteItem", () => {
    const { deleteItem } = mutations;

    it("successfully deletes the item when it exists", () => {
      const targetItem = generateTodoItem();

      const state = getState([generateTodoItem(), targetItem]);

      deleteItem(state, targetItem.id);

      expect(state.todoItems.length).toEqual(1);
      expect(state.todoItems[0].id).not.toEqual(targetItem.id);
    });

    it("should work if the id is not present in the state", () => {
      const state = getState([generateTodoItem(), generateTodoItem()]);

      deleteItem(state, "123-456");

      expect(state.todoItems.length).toEqual(2);
    });
  });

  describe("editItem", () => {
    const { editItem } = mutations;

    it("successfully edits the item information in the state", () => {
      const targetItem = generateTodoItem();

      const newItemInfo = {
        title: "newTitle",
        description: "newDescription",
        priority: TodoItemPriorities.HIGH,
      };

      const state = getState([
        generateTodoItem(),
        targetItem,
        generateTodoItem(),
      ]);

      editItem(state, {
        id: targetItem.id,
        newItemInfo,
      });

      expect(state.todoItems[1].title).toEqual(newItemInfo.title);
      expect(state.todoItems[1].priority).toEqual(newItemInfo.priority);
      expect(state.todoItems[1].description).toEqual(newItemInfo.description);
    });

    it("does not update the state for a non-existent id", () => {
      const newItemInfo = {
        title: "newTitle",
        description: "newDescription",
        priority: TodoItemPriorities.HIGH,
      };

      const state = getState([generateTodoItem(), generateTodoItem()]);

      const originalState = { ...state };

      editItem(state, {
        id: "12345",
        newItemInfo,
      });

      expect(originalState).toEqual(state);
    });
  });

  describe("completeItem", () => {
    const { completeItem } = mutations;

    it("successfully completes the item", () => {
      const targetItem = generateTodoItem();

      const state = getState([generateTodoItem(), targetItem]);

      completeItem(state, targetItem.id);

      expect(state.todoItems[1].status).toEqual(TodoItemStatus.COMPLETED);
    });

    it("does not update the state for a non-existent Id", () => {
      const targetItem = generateTodoItem();

      const state = getState([generateTodoItem(), targetItem]);

      const originalState = { ...state };

      completeItem(state, "1234");

      expect(state).toEqual(originalState);
    });
  });

  describe("revertItem", () => {
    const { revertItem } = mutations;

    it("successfully completes the item", () => {
      const targetItem = generateTodoItem(TodoItemStatus.COMPLETED);

      const state = getState([generateTodoItem(), targetItem]);

      revertItem(state, targetItem.id);

      expect(state.todoItems[1].status).toEqual(TodoItemStatus.PENDING);
    });

    it("does not update the state for a non-existent Id", () => {
      const targetItem = generateTodoItem(TodoItemStatus.COMPLETED);

      const state = getState([generateTodoItem(), targetItem]);

      const originalState = { ...state };

      revertItem(state, "1234");

      expect(state).toEqual(originalState);
    });
  });
});
