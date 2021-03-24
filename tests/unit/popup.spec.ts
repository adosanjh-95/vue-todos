import { fireEvent, render, screen } from "@testing-library/vue";
import Popup from "@/components/popup/index.vue";

describe("popup", () => {
  it("should have empty values for title, description and priority when the props are not specified", () => {
    render(Popup);

    expect((screen.getByLabelText(/title/i) as HTMLInputElement).value).toEqual(
      ""
    );
    expect(
      (screen.getByLabelText(/description/i) as HTMLInputElement).value
    ).toEqual("");
    expect(
      (screen.getByLabelText(/high/i) as HTMLInputElement).checked
    ).toEqual(false);
    expect(
      (screen.getByLabelText(/medium/i) as HTMLInputElement).checked
    ).toEqual(false);
    expect((screen.getByLabelText(/low/i) as HTMLInputElement).checked).toEqual(
      false
    );
  });

  it("the submit button should be disabled by default", () => {
    render(Popup);

    expect(
      (screen.getByText(/submit/i) as HTMLButtonElement).disabled
    ).toBeTruthy();
  });

  it("the submit button should be enabled when a title and priority are entered", async () => {
    render(Popup);

    await fireEvent.update(screen.getByLabelText(/title/i), "Title");
    await fireEvent.update(screen.getByLabelText(/high/i), "High");

    expect(
      (screen.getByText(/submit/i) as HTMLButtonElement).disabled
    ).toBeFalsy();
  });

  it("the title should be set when it is specified as a prop", () => {
    render(Popup, { props: { title: "I am a title" } });

    expect((screen.getByLabelText(/title/i) as HTMLInputElement).value).toEqual(
      "I am a title"
    );
  });

  it("the description should be set when it is specified as a prop", () => {
    render(Popup, { props: { description: "I am a description" } });

    expect(
      (screen.getByLabelText(/description/i) as HTMLInputElement).value
    ).toEqual("I am a description");
  });

  it("the priority should be set when it is specified as a prop", () => {
    render(Popup, { props: { priority: "High" } });

    expect(
      (screen.getByLabelText(/high/i) as HTMLInputElement).checked
    ).toEqual(true);
  });

  it("clicking cancel should emit the cancel event", () => {
    const { emitted } = render(Popup);

    fireEvent.click(screen.getByText(/cancel/i));

    expect(emitted()["cancel"]).toBeTruthy();
  });

  it("clicking submit should emit the submit event with the correct data", async () => {
    const { emitted } = render(Popup, { props: { id: "123" } });

    await fireEvent.update(screen.getByLabelText(/title/i), "Title");
    await fireEvent.update(screen.getByLabelText(/low/i), "Low");

    fireEvent.click(screen.getByText(/submit/i));

    expect(emitted()["submit"].length).toEqual(1);
    expect(emitted()["submit"][0][0]).toEqual({
      title: "Title",
      description: "",
      priority: "Low",
    });
    expect(emitted()["submit"][0][1]).toEqual("123");
  });
});
