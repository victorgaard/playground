import { expect, test } from "vitest";
import { capitalize } from "./capitalize";

test("capitalize foo to Foo", () => {
  expect(capitalize("foo")).toBe("Foo");
});
