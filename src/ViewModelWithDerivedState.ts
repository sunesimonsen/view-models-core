/**
 * Function that receives the current state and returns the new state.
 * The updater function should be pure and return a new state object.
 *
 * @template T - The state type
 * @param currentState - The current state
 * @returns The new state
 */
export type Updater<T> = (currentState: T) => T;

/**
 * Function that gets called when the state changes.
 *
 * @template T - The state type
 * @param state - The new state
 */
export type ViewModelListener = () => void;

/**
 * Abstract base class for creating reactive view models with derived state.
 *
 * This class extends the basic ViewModel pattern by allowing you to compute
 * derived state from internal state. The internal state is managed privately,
 * while the derived state (which can include computed properties) is exposed
 * to subscribers.
 *
 * @template S - The internal state type (managed internally)
 * @template D - The derived state type (exposed to subscribers)
 *
 * @example
 * ```typescript
 * type TodoInternalState = {
 *   items: Array<{ id: string; text: string; done: boolean }>;
 * };
 *
 * type TodoDerivedState = TodoInternalState & {
 *   totalCount: number;
 *   completedCount: number;
 *   remainingCount: number;
 * };
 *
 * class TodoViewModel extends ViewModelWithDerivedState<TodoInternalState, TodoDerivedState> {
 *   constructor() {
 *     super({ items: [] });
 *   }
 *
 *   computeDerivedState({ items }: TodoInternalState): TodoDerivedState {
 *     return {
 *       items,
 *       totalCount: items.length,
 *       completedCount: items.filter(item => item.done).length,
 *       remainingCount: items.filter(item => !item.done).length,
 *     };
 *   }
 *
 *   addTodo(text: string) {
 *     this.update(({ items }) => ({
 *       items: [...items, { id: crypto.randomUUID(), text, done: false }],
 *     }));
 *   }
 * }
 *
 * const todos = new TodoViewModel();
 * todos.subscribe(() => {
 *   console.log('Completed:', todos.state.completedCount);
 * });
 * todos.addTodo('Learn ViewModels'); // Logs: Completed: 0
 * ```
 */
export abstract class ViewModelWithDerivedState<S, D> {
  private _listeners: Set<ViewModelListener> = new Set();
  private _internalState: S;
  private _state: D;

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
  subscribe(listener: ViewModelListener): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  /**
   * Create a new ViewModel with the given initial internal state.
   *
   * The constructor initializes the internal state and immediately computes
   * the derived state by calling `computeDerivedState`.
   *
   * @param initialState - The initial internal state of the view model
   */
  constructor(initialState: S) {
    this._internalState = initialState;
    this._state = this.computeDerivedState(this._internalState);
  }

  /**
   * Update the internal state, recompute derived state, and notify all subscribers.
   *
   * This method is protected and should only be called from within your view model subclass.
   * The updater function receives the current internal state and should return the new internal state.
   * After updating, the derived state is automatically recomputed via `computeDerivedState`.
   * Always return a new state object to ensure immutability.
   *
   * @param updater - Function that receives current internal state and returns new internal state
   *
   * @example
   * ```typescript
   * this.update((currentState) => ({
   *   ...currentState,
   *   count: currentState.count + 1
   * }));
   * ```
   */
  protected update(updater: Updater<S>) {
    this._internalState = updater(this._internalState);
    this._state = this.computeDerivedState(this._internalState);

    for (const listener of this._listeners) {
      listener();
    }
  }

  /**
   * Compute the derived state from the internal state.
   *
   * This abstract method must be implemented by subclasses to transform
   * the internal state into the derived state that will be exposed to
   * subscribers. This method is called automatically after each state
   * update and during initialization.
   *
   * @param state - The current internal state
   * @returns The derived state with any computed properties
   *
   * @example
   * ```typescript
   * computeDerivedState({ count }: CounterState): CounterDerivedState {
   *   return {
   *     count,
   *     isEven: count % 2 === 0,
   *     isPositive: count > 0,
   *   };
   * }
   * ```
   */
  abstract computeDerivedState(state: S): D;

  /**
   * Get the current derived state.
   *
   * This returns the derived state computed by `computeDerivedState`,
   * not the internal state.
   *
   * @returns The current derived state
   */
  get state(): D {
    return this._state;
  }
}
