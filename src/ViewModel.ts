/**
 * Function that gets called when the state changes.
 */
export type ViewModelListener = () => void;

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
 *     super.update({ count: super.state.count + 1 });
 *   }
 * }
 *
 * const counter = new CounterViewModel();
 * const unsubscribe = counter.subscribe(() => {
 *   console.log('Count:', counter.state.count);
 * });
 * counter.increment(); // Logs: Count: 1
 * ```
 */
export abstract class ViewModel<S extends object> {
  private _listeners = new Set<ViewModelListener>();
  private _state: S;

  /**
   * Subscribe to state changes.
   *
   * The listener will be called immediately after any state update.
   *
   * @param listener - Function to call when state changes
   * @returns Function to unsubscribe the listener
   *
   * @example
   * ```typescript
   * const unsubscribe = viewModel.subscribe(() => {
   *   console.log('State changed:', viewModel.state);
   * });
   *
   * // Later, when you want to stop listening:
   * unsubscribe();
   * ```
   */
  subscribe(listener: ViewModelListener): () => void {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  /**
   * Create a new ViewModel with the given initial state.
   *
   * @param initialState - The initial state of the view model
   */
  constructor(initialState: S) {
    this._state = initialState;
  }

  /**
   * Update the state and notify all subscribers.
   *
   * This method is protected and should only be called from within your view model subclass.
   * The partial state is merged with the current state to create the new state.
   *
   * @param update - Partial state to merge with the current state
   *
   * @example
   * ```typescript
   * super.update({
   *   count: super.state.count + 1
   * });
   * ```
   */
  protected update(update: Partial<S>) {
    this._state = { ...this._state, ...update };
    this._listeners.forEach((l) => l());
  }

  /**
   * Get the current state.
   *
   * @returns The current state
   */
  get state(): S {
    return this._state;
  }
}
