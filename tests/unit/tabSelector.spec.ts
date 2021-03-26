import { fireEvent, render, screen } from "@testing-library/vue";
import TabSelector from "@/components/tabSelector/index.vue";

describe("tabSelector", () => {
  it("should render radio options the provided options", () => {
    const options = { Pending: "pending-slot", Completed: "completed-slot" };

    render(TabSelector, {
      props: { options },
      slots: {
        "pending-slot": "<p>I am the pending slot</p>",
        "completed-slot": "<p>I am the completed slot</p>",
      },
    });

    expect(screen.getByLabelText(/pending/i)).toBeTruthy();
    expect(screen.getByLabelText(/completed/i)).toBeTruthy();
  });

  it("should change the rendered content when the radio options are toggled", async () => {
    const options = { Pending: "pending-slot", Completed: "completed-slot" };

    render(TabSelector, {
      props: { options },
      slots: {
        "pending-slot": "<p>I am the pending slot</p>",
        "completed-slot": "<p>I am the completed slot</p>",
      },
    });

    expect(screen.getByText("I am the pending slot")).toBeTruthy();
    expect(screen.queryByText("I am the completed slot")).toBeNull();

    await fireEvent.update(screen.getByLabelText(/completed/i), "Completed");

    expect(screen.getByText("I am the completed slot")).toBeTruthy();
    expect(screen.queryByText("I am the pending slot")).toBeNull();
  });

  it("should not render the contents for an empty slot", () => {
    const options = { Pending: "pending-slot" };

    render(TabSelector, {
      props: { options },
      slots: {
        "pending-slot": "",
      },
    });

    expect(screen.queryByTestId("tab-contents")).toBeNull();
  });
});
