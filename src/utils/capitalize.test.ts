import { describe, expect, it } from "vitest";
import { capitalize } from "./capitalize";

describe("capitalize", () => {
  it("should capitalize foo to Foo", () => {
    expect(capitalize("foo")).toBe("Foo");
  });
});
