import { ViewModelWithComputedState } from "./ViewModelWithComputedState.js";

/**
 * Abstract base class for creating reactive view models.
 *
 * A ViewModel manages state and notifies subscribers when the state changes.
 * Extend this class to create your own view models with custom business logic.
 *
 * @template S - The state type
 *
 * @example
 * ```typescript
 * type CounterState = { count: number };
 *
 * class CounterViewModel extends ViewModel<CounterState> {
 *   constructor() {
 *     super({ count: 0 });
 *   }
 *
 *   increment() {
 *     super.update({ count: this.state.count + 1 });
 *   }
 * }
 *
 * const counter = new CounterViewModel();
 * const unsubscribe = counter.subscribe((state) => {
 *   console.log('Count:', state.count);
 * });
 * counter.increment(); // Logs: Count: 1
 * ```
 */
export abstract class ViewModel<
  S extends object,
> extends ViewModelWithComputedState<S, S> {
  /**
   * Create a new ViewModel with the given initial state.
   *
   * @param initialState - The initial state of the view model
   */
  constructor(initialState: S) {
    super(initialState);
  }

  computedState(state: S): S {
    return state;
  }
}
