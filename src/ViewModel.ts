type State = Readonly<object>;

export type Updater<T extends State> = (currentState: T) => T;
export type ViewModelListener<T> = (state: T) => void;

export abstract class ViewModel<T extends State> {
  private _listeners: Set<ViewModelListener<T>> = new Set();

  subscribe(listener: ViewModelListener<T>) {
    this._listeners.add(listener);
  }

  unsubscribe(listener: ViewModelListener<T>) {
    this._listeners.delete(listener);
  }

  private _state: T;

  constructor(initialState: T) {
    this._state = initialState;
  }

  protected update(updater: Updater<T>) {
    this._state = updater(this._state);

    for (const listener of this._listeners) {
      listener(this._state);
    }
  }

  get state(): T {
    return this._state;
  }
}
