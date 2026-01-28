[**@view-models/core**](../README.md)

---

[@view-models/core](../README.md) / derived

# Function: derived()

> **derived**\<`I`, `O`\>(`fn`): [`DerivedMapper`](../type-aliases/DerivedMapper.md)\<`I`, `O`\>

Defined in: [derived.ts:35](https://github.com/sunesimonsen/view-models-core/blob/main/src/derived.ts#L35)

Creates a memoized derived state mapper function that caches results based on input identity.

The memoization uses `Object.is` to compare inputs, making it ideal for use with
immutable state objects. When the input reference hasn't changed, the cached output
is returned without re-executing the function.

## Type Parameters

### I

`I`

The input type

### O

`O`

The output type

## Parameters

### fn

`Mapper`\<`I`, `O`\>

A pure function that transforms input to output

## Returns

[`DerivedMapper`](../type-aliases/DerivedMapper.md)\<`I`, `O`\>

A memoized derived mapper function

## Example

```ts
const selectStats = derived(({ items }: AppState) => ({
  total: items.reduce((sum, item) => sum + item.price, 0),
  count: items.length,
}));

// Use with useDerivedState
const stats = selectStats(model.state);
```
