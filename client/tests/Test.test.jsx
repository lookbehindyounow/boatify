import { render, screen } from "@testing-library/react";
import Test from "../src/test";

describe("Test component", () => {
  it("renders correct heading", () => {
    render(<Test />);
    expect(screen.getByRole("heading").textContent).toMatch(/our first test/i);
  });
});
