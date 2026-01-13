[**@view-models/core**](../README.md)

---

[@view-models/core](../README.md) / ViewModel

# Abstract Class: ViewModel\<S\>

Defined in: [ViewModel.ts:32](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModel.ts#L32)

Abstract base class for creating reactive view models.

A ViewModel manages state and notifies subscribers when the state changes.
Extend this class to create your own view models with custom business logic.

## Example

```typescript
type CounterState = { count: number };

class CounterViewModel extends ViewModel<CounterState> {
  constructor() {
    super({ count: 0 });
  }

  increment() {
    this.update(({ count }) => ({ count: count + 1 }));
  }
}

const counter = new CounterViewModel();
const unsubscribe = counter.subscribe((state) => {
  console.log("Count:", state.count);
});
counter.increment(); // Logs: Count: 1
```

## Extends

- [`ViewModelWithDerivedState`](ViewModelWithDerivedState.md)\<`S`, `S`\>

## Type Parameters

### S

`S`

The state type

## Constructors

### Constructor

> **new ViewModel**\<`S`\>(`initialState`): `ViewModel`\<`S`\>

Defined in: [ViewModel.ts:38](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModel.ts#L38)

Create a new ViewModel with the given initial state.

#### Parameters

##### initialState

`S`

The initial state of the view model

#### Returns

`ViewModel`\<`S`\>

#### Overrides

[`ViewModelWithDerivedState`](ViewModelWithDerivedState.md).[`constructor`](ViewModelWithDerivedState.md#constructor)

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

#### Inherited from

[`ViewModelWithDerivedState`](ViewModelWithDerivedState.md).[`state`](ViewModelWithDerivedState.md#state)

## Methods

### computeDerivedState()

> **computeDerivedState**(`state`): `S`

Defined in: [ViewModel.ts:42](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModel.ts#L42)

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

`S`

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

#### Overrides

[`ViewModelWithDerivedState`](ViewModelWithDerivedState.md).[`computeDerivedState`](ViewModelWithDerivedState.md#computederivedstate)

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

#### Inherited from

[`ViewModelWithDerivedState`](ViewModelWithDerivedState.md).[`subscribe`](ViewModelWithDerivedState.md#subscribe)

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

#### Inherited from

[`ViewModelWithDerivedState`](ViewModelWithDerivedState.md).[`update`](ViewModelWithDerivedState.md#update)
