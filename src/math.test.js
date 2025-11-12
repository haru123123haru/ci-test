import { describe, it, expect } from "vitest";
import { add, multiply } from "./math.js";

describe("math functions", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("multiplies two numbers", () => {
    expect(multiply(2, 4)).toBe(8);
  });
});
