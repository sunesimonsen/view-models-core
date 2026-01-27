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
    super.update({ count: super.state.count + 1 });
  }
}

const counter = new CounterViewModel();
const unsubscribe = counter.subscribe((state) => {
  console.log("Count:", state.count);
});
counter.increment(); // Logs: Count: 1
```

## Extends

- [`ViewModelWithComputedState`](ViewModelWithComputedState.md)\<`S`, `S`\>

## Type Parameters

### S

`S` _extends_ `object`

The state type

## Constructors

### Constructor

> **new ViewModel**\<`S`\>(`initialState`): `ViewModel`\<`S`\>

Defined in: [ViewModel.ts:40](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModel.ts#L40)

Create a new ViewModel with the given initial state.

#### Parameters

##### initialState

`S`

The initial state of the view model

#### Returns

`ViewModel`\<`S`\>

#### Overrides

[`ViewModelWithComputedState`](ViewModelWithComputedState.md).[`constructor`](ViewModelWithComputedState.md#constructor)

## Accessors

### state

#### Get Signature

> **get** **state**(): `D`

Defined in: [ViewModelWithComputedState.ts:159](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModelWithComputedState.ts#L159)

Get the current derived state.

This returns the derived state computed by `computedState`,
not the internal state.

##### Returns

`D`

The current derived state

#### Inherited from

[`ViewModelWithComputedState`](ViewModelWithComputedState.md).[`state`](ViewModelWithComputedState.md#state)

## Methods

### computedState()

> **computedState**(`state`): `S`

Defined in: [ViewModel.ts:44](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModel.ts#L44)

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
computedState({ count }: CounterState): CounterDerivedState {
  return {
    count,
    isEven: count % 2 === 0,
    isPositive: count > 0,
  };
}
```

#### Overrides

[`ViewModelWithComputedState`](ViewModelWithComputedState.md).[`computedState`](ViewModelWithComputedState.md#computedstate)

---

### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in: [ViewModelWithComputedState.ts:82](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModelWithComputedState.ts#L82)

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

[`ViewModelWithComputedState`](ViewModelWithComputedState.md).[`subscribe`](ViewModelWithComputedState.md#subscribe)

---

### update()

> `protected` **update**(`partial`): `void`

Defined in: [ViewModelWithComputedState.ts:118](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModelWithComputedState.ts#L118)

Update the internal state, recompute derived state, and notify all subscribers.

This method is protected and should only be called from within your view model subclass.
The partial state is merged with the current internal state to create the new internal state.
After updating, the derived state is automatically recomputed via `computeDerivedState`.

#### Parameters

##### partial

`Partial`\<`S`\>

Partial state to merge with the current internal state

#### Returns

`void`

#### Example

```typescript
super.update({
  count: super.state.count + 1,
});
```

#### Inherited from

[`ViewModelWithComputedState`](ViewModelWithComputedState.md).[`update`](ViewModelWithComputedState.md#update)
