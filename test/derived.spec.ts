import { describe, it, expect, vi } from "vitest";
import { derived } from "../src/derived.js";

describe("derived", () => {
  it("executes the function on first call", () => {
    const mapper = vi.fn((x: number) => x * 2);
    const memoized = derived(mapper);

    const result = memoized(5);

    expect(result).toBe(10);
    expect(mapper).toHaveBeenCalledTimes(1);
    expect(mapper).toHaveBeenCalledWith(5);
  });

  it("returns cached result when input reference is identical", () => {
    const mapper = vi.fn((state: { value: number }) => state.value * 2);
    const memoized = derived(mapper);

    const input = { value: 5 };
    const result1 = memoized(input);
    const result2 = memoized(input);

    expect(result1).toBe(10);
    expect(result2).toBe(10);
    expect(mapper).toHaveBeenCalledTimes(1);
  });

  it("re-executes when input reference changes", () => {
    const mapper = vi.fn((state: { value: number }) => state.value * 2);
    const memoized = derived(mapper);

    const input1 = { value: 5 };
    const input2 = { value: 5 };

    const result1 = memoized(input1);
    const result2 = memoized(input2);

    expect(result1).toBe(10);
    expect(result2).toBe(10);
    expect(mapper).toHaveBeenCalledTimes(2);
  });

  it("works with complex state objects", () => {
    type State = {
      items: Array<{ id: number; value: string }>;
      filter: string;
    };

    const mapper = vi.fn((state: State) =>
      state.items.filter((item) => item.value.includes(state.filter)),
    );

    const memoized = derived(mapper);

    const state1 = {
      items: [
        { id: 1, value: "foo" },
        { id: 2, value: "bar" },
        { id: 3, value: "foobar" },
      ],
      filter: "foo",
    };

    const result1 = memoized(state1);
    const result2 = memoized(state1);

    expect(result1).toEqual([
      { id: 1, value: "foo" },
      { id: 3, value: "foobar" },
    ]);
    expect(result2).toEqual(result1);
    expect(mapper).toHaveBeenCalledTimes(1);

    const state2 = {
      items: [
        { id: 1, value: "foo" },
        { id: 2, value: "bar" },
        { id: 3, value: "foobar" },
      ],
      filter: "bar",
    };

    const result3 = memoized(state2);

    expect(result3).toEqual([
      { id: 2, value: "bar" },
      { id: 3, value: "foobar" },
    ]);
    expect(mapper).toHaveBeenCalledTimes(2);
  });

  it("handles primitive values", () => {
    const mapper = vi.fn((x: number) => x * x);
    const memoized = derived(mapper);

    const result1 = memoized(5);
    const result2 = memoized(5);
    const result3 = memoized(10);
    const result4 = memoized(10);

    expect(result1).toBe(25);
    expect(result2).toBe(25);
    expect(result3).toBe(100);
    expect(result4).toBe(100);
    // Primitives like numbers are cached because Object.is(5, 5) is true
    expect(mapper).toHaveBeenCalledTimes(2);
  });

  it("handles null and undefined", () => {
    const mapper = vi.fn((x: string | null) => (x ? x.toUpperCase() : "NULL"));
    const memoized = derived(mapper);

    const result1 = memoized(null);
    const result2 = memoized(null);

    expect(result1).toBe("NULL");
    expect(result2).toBe("NULL");
    expect(mapper).toHaveBeenCalledTimes(1);
  });
});
