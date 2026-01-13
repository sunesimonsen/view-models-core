[**@view-models/core**](../README.md)

---

[@view-models/core](../README.md) / ViewModelWithDerivedState

# Abstract Class: ViewModelWithDerivedState\<S, D\>

Defined in: [ViewModelWithDerivedState.ts:69](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModelWithDerivedState.ts#L69)

Abstract base class for creating reactive view models with derived state.

This class extends the basic ViewModel pattern by allowing you to compute
derived state from internal state. The internal state is managed privately,
while the derived state (which can include computed properties) is exposed
to subscribers.

## Example

```typescript
type TodoState = {
  items: Array<{ id: string; text: string; done: boolean }>;
};

type TodoDerivedState = TodoState & {
  totalCount: number;
  completedCount: number;
  remainingCount: number;
};

class TodoViewModel extends ViewModelWithDerivedState<
  TodoState,
  TodoDerivedState
> {
  constructor() {
    super({ items: [] });
  }

  computeDerivedState({ items }: TodoState): TodoDerivedState {
    return {
      items,
      totalCount: items.length,
      completedCount: items.filter((item) => item.done).length,
      remainingCount: items.filter((item) => !item.done).length,
    };
  }

  addTodo(text: string) {
    this.update(({ items }) => ({
      items: [...items, { id: crypto.randomUUID(), text, done: false }],
    }));
  }
}

const todos = new TodoViewModel();
todos.subscribe(() => {
  console.log("Completed:", todos.state.completedCount);
});
todos.addTodo("Learn ViewModels"); // Logs: Completed: 0
```

## Extended by

- [`ViewModel`](ViewModel.md)

## Type Parameters

### S

`S`

The internal state type (managed internally)

### D

`D`

The derived state type (exposed to subscribers)

## Constructors

### Constructor

> **new ViewModelWithDerivedState**\<`S`, `D`\>(`initialState`): `ViewModelWithDerivedState`\<`S`, `D`\>

Defined in: [ViewModelWithDerivedState.ts:107](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModelWithDerivedState.ts#L107)

Create a new ViewModel with the given initial internal state.

The constructor initializes the internal state and immediately computes
the derived state by calling `computeDerivedState`.

#### Parameters

##### initialState

`S`

The initial internal state of the view model

#### Returns

`ViewModelWithDerivedState`\<`S`, `D`\>

## Accessors

### state

#### Get Signature

> **get** **state**(): `D`

Defined in: [ViewModelWithDerivedState.ts:171](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModelWithDerivedState.ts#L171)

Get the current derived state.

This returns the derived state computed by `computeDerivedState`,
not the internal state.

##### Returns

`D`

The current derived state

## Methods

### computeDerivedState()

> `abstract` **computeDerivedState**(`state`): `D`

Defined in: [ViewModelWithDerivedState.ts:161](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModelWithDerivedState.ts#L161)

Compute the derived state from the internal state.

This abstract method must be implemented by subclasses to transform
the internal state into the derived state that will be exposed to
subscribers. This method is called automatically after each state
update and during initialization.

#### Parameters

##### state

`S`

The current internal state

#### Returns

`D`

The derived state with any computed properties

#### Example

```typescript
computeDerivedState({ count }: CounterState): CounterDerivedState {
  return {
    count,
    isEven: count % 2 === 0,
    isPositive: count > 0,
  };
}
```

---

### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in: [ViewModelWithDerivedState.ts:92](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModelWithDerivedState.ts#L92)

Subscribe to state changes.

The listener will be called immediately after any state update.

#### Parameters

##### listener

[`ViewModelListener`](../type-aliases/ViewModelListener.md)

Function to call when state changes

#### Returns

Function to unsubscribe the listener

> (): `void`

##### Returns

`void`

#### Example

```typescript
const unsubscribe = viewModel.subscribe((state) => {
  console.log("State changed:", state);
});

// Later, when you want to stop listening:
unsubscribe();
```

---

### update()

> `protected` **update**(`updater`): `void`

Defined in: [ViewModelWithDerivedState.ts:130](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModelWithDerivedState.ts#L130)

Update the internal state, recompute derived state, and notify all subscribers.

This method is protected and should only be called from within your view model subclass.
The updater function receives the current internal state and should return the new internal state.
After updating, the derived state is automatically recomputed via `computeDerivedState`.
Always return a new state object to ensure immutability.

#### Parameters

##### updater

[`Updater`](../type-aliases/Updater.md)\<`S`\>

Function that receives current internal state and returns new internal state

#### Returns

`void`

#### Example

```typescript
this.update((currentState) => ({
  ...currentState,
  count: currentState.count + 1,
}));
```
