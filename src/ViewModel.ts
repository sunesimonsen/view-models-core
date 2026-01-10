type State = Readonly<object>;

/**
 * Function that receives the current state and returns the new state.
 * The updater function should be pure and return a new state object.
 *
 * @template T - The state type
 * @param currentState - The current state
 * @returns The new state
 */
export type Updater<T extends State> = (currentState: T) => T;

/**
 * Function that gets called when the state changes.
 *
 * @template T - The state type
 * @param state - The new state
 */
export type ViewModelListener<T> = (state: T) => void;

/**
 * Abstract base class for creating reactive view models.
 *
 * A ViewModel manages state and notifies subscribers when the state changes.
 * Extend this class to create your own view models with custom business logic.
 *
 * @template T - The state type (must be a readonly object)
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
 *     this.update(({ count }) => ({ count: count + 1 }));
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
export abstract class ViewModel<T extends State> {
  private _listeners: Set<ViewModelListener<T>> = new Set();

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
   * const unsubscribe = viewModel.subscribe((state) => {
   *   console.log('State changed:', state);
   * });
   *
   * // Later, when you want to stop listening:
   * unsubscribe();
   * ```
   */
  subscribe(listener: ViewModelListener<T>): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _state: T;

  /**
   * Create a new ViewModel with the given initial state.
   *
   * @param initialState - The initial state of the view model
   */
  constructor(initialState: T) {
    this._state = initialState;
  }

  /**
   * Update the state and notify all subscribers.
   *
   * This method is protected and should only be called from within your view model subclass.
   * The updater function receives the current state and should return the new state.
   * Always return a new state object to ensure immutability.
   *
   * @param updater - Function that receives current state and returns new state
   *
   * @example
   * ```typescript
   * this.update((currentState) => ({
   *   ...currentState,
   *   count: currentState.count + 1
   * }));
   * ```
   */
  protected update(updater: Updater<T>) {
    this._state = updater(this._state);

    for (const listener of this._listeners) {
      listener(this._state);
    }
  }

  /**
   * Get the current state.
   *
   * @returns The current state
   */
  get state(): T {
    return this._state;
  }
}
