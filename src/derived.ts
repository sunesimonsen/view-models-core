type Mapper<I, O> = (input: I) => O;

/**
 * A branded type for derived state mapper functions created by the `derived` utility.
 * This type ensures that mapper functions are properly memoized before being used
 * with hooks like `useDerivedState`.
 */
export type DerivedMapper<I, O> = Mapper<I, O> & { __brand: "derived" };

const UNINITIALIZED = {};

/**
 * Creates a memoized derived state mapper function that caches results based on input identity.
 *
 * The memoization uses `Object.is` to compare inputs, making it ideal for use with
 * immutable state objects. When the input reference hasn't changed, the cached output
 * is returned without re-executing the function.
 *
 * @template I - The input type
 * @template O - The output type
 * @param fn - A pure function that transforms input to output
 * @returns A memoized derived mapper function
 *
 * @example
 * ```ts
 * const selectStats = derived(({ items }: AppState) => ({
 *   total: items.reduce((sum, item) => sum + item.price, 0),
 *   count: items.length
 * }));
 *
 * // Use with useDerivedState
 * const stats = selectStats(model.state);
 * ```
 */
export const derived = <I, O>(fn: Mapper<I, O>): DerivedMapper<I, O> => {
  let lastInput: I | typeof UNINITIALIZED = UNINITIALIZED;
  let lastOutput: O | typeof UNINITIALIZED = UNINITIALIZED;
  return ((input: I) => {
    if (lastInput !== UNINITIALIZED && Object.is(lastInput, input)) {
      return lastOutput as O;
    }
    return (lastOutput = fn((lastInput = input)));
  }) as DerivedMapper<I, O>;
};
