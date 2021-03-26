import { fireEvent, render, screen } from "@testing-library/vue";
import Todos from "@/components/todos/index.vue";
import { state, mutations, getters } from "@/store";
import { v4 as uuidv4 } from "uuid";

describe("todos", () => {
  const store = {
    state,
    mutations,
    getters,
  };

  const generateTodoItem = (status = "Pending") => ({
    title: "Test title",
    description: "Test description",
    priority: "High",
    status,
    createdDate: new Date(),
    completedDate: null,
    id: uuidv4(),
  });

  const generateComponent = (todoItems = []) => {
    return render(Todos, {
      store: {
        ...store,
        state: {
          todoItems,
        },
      },
    });
  };

  it("should display the add item message when there are no todoItems", () => {
    generateComponent();

    expect(
      screen.getByText(/click the button below to start adding your todos/i)
    ).toBeTruthy();
  });

  it("should display the todo when it exists", () => {
    generateComponent([generateTodoItem()]);

    // duplicates as both the grid and tabSelector are rendered and then hidden/displayed by css
    expect(screen.getAllByText(/test title/i).length).toBeTruthy();
    expect(screen.getAllByText(/test description/i).length).toBeTruthy();
  });

  it("should open the popup when add item is clicked", async () => {
    generateComponent();

    await fireEvent.click(screen.getByTestId("add-item-icon"));

    expect(screen.getByText(/title:/i)).toBeTruthy();
  });

  it("should succesfully add a new item", async () => {
    generateComponent();

    await fireEvent.click(screen.getByTestId("add-item-icon"));

    await fireEvent.update(screen.getByLabelText(/title/i), "Test title");
    await fireEvent.update(screen.getByLabelText(/low/i), "Low");

    await fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getAllByText(/test title/i).length).toBeTruthy();
  });

  it("should open the popup with the populated data when edit is clicked on a todo", async () => {
    generateComponent([generateTodoItem()]);

    await fireEvent.click(screen.getAllByTestId(/edit-icon/i)[0]);

    expect(screen.getByLabelText(/title/i).value).toEqual("Test title");
    expect(screen.getByLabelText(/description/i).value).toEqual(
      "Test description"
    );
    expect(screen.getByLabelText(/high/i).checked).toEqual(true);
  });

  it("should succesfully edit a todo", async () => {
    generateComponent([generateTodoItem()]);

    await fireEvent.click(screen.getAllByTestId(/edit-icon/i)[0]);

    await fireEvent.update(screen.getByLabelText(/title/i), "New title");

    await fireEvent.click(screen.getByText(/submit/i));

    expect(screen.queryAllByText(/test title/i).length).toBeFalsy();
    expect(screen.getAllByText(/new title/i).length).toBeTruthy();
  });

  it("should not save the details of an edited todo if cancel is clicked", async () => {
    generateComponent([generateTodoItem()]);

    await fireEvent.click(screen.getAllByTestId(/edit-icon/i)[0]);

    await fireEvent.update(screen.getByLabelText(/title/i), "New title");

    await fireEvent.click(screen.getByText(/cancel/i));

    expect(screen.queryAllByText(/new title/i).length).toBeFalsy();
    expect(screen.getAllByText(/test title/i).length).toBeTruthy();
  });

  it("should succesfully delete a todo", async () => {
    generateComponent([generateTodoItem()]);

    await fireEvent.click(screen.getAllByTestId(/delete-icon/i)[0]);

    expect(screen.queryAllByText(/test title/i).length).toBeFalsy();
  });

  it("should succesfully complete a todo", async () => {
    generateComponent([generateTodoItem()]);

    expect(
      screen.getByTestId("grid-contents").previousElementSibling.textContent
    ).toEqual("Pending");

    await fireEvent.click(screen.getAllByTestId(/complete-icon/i)[0]);

    expect(
      screen.getByTestId("grid-contents").previousElementSibling.textContent
    ).toEqual("Completed");
  });

  it("should succesfully revert a todo", async () => {
    generateComponent([generateTodoItem("Completed")]);

    expect(
      screen.getByTestId("grid-contents").previousElementSibling.textContent
    ).toEqual("Completed");

    await fireEvent.click(screen.getAllByTestId(/revert-icon/i)[0]);

    expect(
      screen.getByTestId("grid-contents").previousElementSibling.textContent
    ).toEqual("Pending");
  });
});
