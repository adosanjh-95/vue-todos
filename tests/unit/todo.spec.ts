import { fireEvent, render, screen } from "@testing-library/vue";
import Todo from "@/components/todo/index.vue";
import { v4 as uuidv4 } from "uuid";
import { TodoItemPriorities, TodoItemStatus } from "@/store";

const generateTodoItem = (type: TodoItemStatus = TodoItemStatus.PENDING) => ({
  title: "title",
  description: "description",
  priority: TodoItemPriorities.HIGH,
  status: type,
  createdDate: new Date(),
  completedDate: type === TodoItemStatus.COMPLETED ? new Date() : null,
  id: uuidv4(),
});

describe("todo", () => {
  it("should render the title and description without del tags for a pending item", () => {
    render(Todo, {
      props: { todo: generateTodoItem() },
      stubs: {
        "font-awesome-icon": true,
      },
    });

    expect(screen.getByText(/title/i).nodeName).not.toEqual("DEL");
    expect(screen.getByText(/description/i).nodeName).not.toEqual("DEL");
  });

  it("should render the title and description with del tags for a completed item", () => {
    render(Todo, {
      props: { todo: generateTodoItem(TodoItemStatus.COMPLETED) },
      stubs: {
        "font-awesome-icon": true,
      },
    });

    expect(screen.getByText(/title/i).nodeName).toEqual("DEL");
    expect(screen.getByText(/description/i).nodeName).toEqual("DEL");
  });

  it("should render the priority circle with the correct class based on the priority", () => {
    render(Todo, {
      props: { todo: generateTodoItem() },
      stubs: {
        "font-awesome-icon": true,
      },
    });

    expect(screen.getByTestId(/priority-circle/i).classList).toContain(
      "todo__priority--high"
    );
  });

  it("the correct actions are rendered for a pending item", () => {
    render(Todo, {
      props: { todo: generateTodoItem() },
      stubs: {
        "font-awesome-icon": true,
      },
    });

    expect(screen.getByTestId(/edit-icon/i)).toBeTruthy();
    expect(screen.getByTestId(/delete-icon/i)).toBeTruthy();
    expect(screen.getByTestId(/complete-icon/i)).toBeTruthy();
  });

  it("the correct actions are rendered for a completed item", () => {
    render(Todo, {
      props: { todo: generateTodoItem(TodoItemStatus.COMPLETED) },
      stubs: {
        "font-awesome-icon": true,
      },
    });

    expect(screen.getByTestId(/delete-icon/i)).toBeTruthy();
    expect(screen.getByTestId(/revert-icon/i)).toBeTruthy();
  });

  it("clicking the edit icon emits the correct event", () => {
    const todo = generateTodoItem();
    const { emitted } = render(Todo, { props: { todo } });

    fireEvent.click(screen.getByTestId(/edit-icon/i));

    expect(emitted()["edit"]).toBeTruthy();
    expect(emitted()["edit"][0]).toEqual([todo]);
  });

  it("clicking the delete icon emits the correct event", () => {
    const todo = generateTodoItem();
    const { emitted } = render(Todo, { props: { todo } });

    fireEvent.click(screen.getByTestId(/delete-icon/i));

    expect(emitted()["delete"]).toBeTruthy();
    expect(emitted()["delete"][0]).toEqual([todo]);
  });

  it("clicking the complete icon emits the correct event", () => {
    const todo = generateTodoItem();
    const { emitted } = render(Todo, { props: { todo } });

    fireEvent.click(screen.getByTestId(/complete-icon/i));

    expect(emitted()["complete"]).toBeTruthy();
    expect(emitted()["complete"][0]).toEqual([todo]);
  });

  it("clicking the revert icon emits the correct event", () => {
    const todo = generateTodoItem(TodoItemStatus.COMPLETED);
    const { emitted } = render(Todo, {
      props: { todo },
    });

    fireEvent.click(screen.getByTestId(/revert-icon/i));

    expect(emitted()["revert"]).toBeTruthy();
    expect(emitted()["revert"][0]).toEqual([todo]);
  });
});
