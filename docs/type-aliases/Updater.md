[**@view-models/core**](../README.md)

---

[@view-models/core](../README.md) / Updater

# Type Alias: Updater()\<T\>

> **Updater**\<`T`\> = (`currentState`) => `T`

Defined in: [ViewModelWithDerivedState.ts:9](https://github.com/sunesimonsen/view-models-core/blob/main/src/ViewModelWithDerivedState.ts#L9)

Function that receives the current state and returns the new state.
The updater function should be pure and return a new state object.

## Type Parameters

### T

`T`

The state type

## Parameters

### currentState

`T`

The current state

## Returns

`T`

The new state
