import { render, screen } from "@testing-library/vue";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";

    render(HelloWorld, {
      propsData: { msg },
    });

    expect(screen.getByText(msg)).toBeTruthy();
  });
});
