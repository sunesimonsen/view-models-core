[**@view-models/core**](../README.md)

---

[@view-models/core](../README.md) / ViewModel

# Abstract Class: ViewModel\<S\>

Defined in: [ViewModel.ts:35](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModel.ts#L35)

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
const unsubscribe = counter.subscribe(() => {
  console.log("Count:", counter.state.count);
});
counter.increment(); // Logs: Count: 1
```

## Type Parameters

### S

`S` _extends_ `object`

The state type

## Constructors

### Constructor

> **new ViewModel**\<`S`\>(`initialState`): `ViewModel`\<`S`\>

Defined in: [ViewModel.ts:69](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModel.ts#L69)

Create a new ViewModel with the given initial state.

#### Parameters

##### initialState

`S`

The initial state of the view model

#### Returns

`ViewModel`\<`S`\>

## Accessors

### state

#### Get Signature

> **get** **state**(): `S`

Defined in: [ViewModel.ts:98](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModel.ts#L98)

Get the current state.

##### Returns

`S`

The current state

## Methods

### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in: [ViewModel.ts:57](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModel.ts#L57)

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
const unsubscribe = viewModel.subscribe(() => {
  console.log("State changed:", viewModel.state);
});

// Later, when you want to stop listening:
unsubscribe();
```

---

### update()

> `protected` **update**(`update`): `void`

Defined in: [ViewModel.ts:88](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModel.ts#L88)

Update the state and notify all subscribers.

This method is protected and should only be called from within your view model subclass.
The partial state is merged with the current state to create the new state.

#### Parameters

##### update

`Partial`\<`S`\>

Partial state to merge with the current state

#### Returns

`void`

#### Example

```typescript
super.update({
  count: super.state.count + 1,
});
```
