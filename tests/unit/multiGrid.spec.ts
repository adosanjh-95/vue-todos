import { render, screen } from "@testing-library/vue";
import MultiGrid from "@/components/multiGrid/index.vue";

describe("multiGrid", () => {
  it("should render the headers and contents for the provided options", () => {
    const options = { Pending: "pending-slot" };

    render(MultiGrid, {
      props: { options },
      slots: { "pending-slot": "<p>I am the pending slot</p>" },
    });

    expect(screen.getByText("Pending")).toBeTruthy();
    expect(screen.getByText("I am the pending slot")).toBeTruthy();
  });

  it("should still render the header but not the contents div for an empty slot", () => {
    const options = { Pending: "pending-slot" };

    render(MultiGrid, {
      props: { options },
      slots: { "pending-slot": "" },
    });

    expect(screen.getByText("Pending")).toBeTruthy();
    expect(screen.queryByTestId("grid-contents")).toBeNull();
  });
});
