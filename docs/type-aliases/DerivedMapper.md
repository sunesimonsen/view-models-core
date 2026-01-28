[**@view-models/core**](../README.md)

---

[@view-models/core](../README.md) / DerivedMapper

# Type Alias: DerivedMapper\<I, O\>

> **DerivedMapper**\<`I`, `O`\> = `Mapper`\<`I`, `O`\> & `object`

Defined in: [derived.ts:8](https://github.com/sunesimonsen/view-models-core/blob/main/src/derived.ts#L8)

A branded type for derived state mapper functions created by the `derived` utility.
This type ensures that mapper functions are properly memoized before being used
with hooks like `useDerivedState`.

## Type Declaration

### \_\_brand

> **\_\_brand**: `"derived"`

## Type Parameters

### I

`I`

### O

`O`
