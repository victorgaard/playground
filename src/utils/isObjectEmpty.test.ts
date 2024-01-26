import { describe, expect, it } from "vitest";
import { isObjectEmpty } from "./isObjectEmpty";

describe("isObjectEmpty", () => {
  it("expects isObjectEmpty to be true", () => {
    expect(isObjectEmpty({})).toBe(true);
  });

  it("expects isObjectEmpty to be false", () => {
    expect(isObjectEmpty({ foo: "bar" })).toBe(false);
  });
});
