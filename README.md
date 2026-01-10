# @view-models/core

A lightweight, framework-agnostic library for building reactive view models with TypeScript. Separate your business logic from your UI framework with a simple, testable pattern.

## Why View Models?

- **Framework Agnostic**: Write your logic once, use it with React, Preact, or any other framework
- **Easy Testing**: Test your view logic without rendering anything to the DOM
- **Simple API**: Just extend `ViewModel` and you're ready to go
- **Type Safe**: Built with TypeScript for excellent IDE support
- **Minimal Boilerplate**: Much lighter than Redux with no reducers, actions, or middleware needed
- **Natural Organization**: A clear place to put your application logic

## Installation

```bash
npm install @view-models/core
```

## Quick Start

Define your state type and extend `ViewModel`:

```typescript
import { ViewModel } from "@view-models/core";

type CounterState = {
  count: number;
};

class CounterViewModel extends ViewModel<CounterState> {
  constructor() {
    super({ count: 0 });
  }

  increment() {
    this.update(({ count }) => ({
      count: count + 1,
    }));
  }

  decrement() {
    this.update(({ count }) => ({
      count: count - 1,
    }));
  }

  reset() {
    this.update(() => ({ count: 0 }));
  }
}
```

Use it in your tests:

```typescript
import { describe, it, expect } from "vitest";

describe("CounterViewModel", () => {
  it("increments the counter", () => {
    const counter = new CounterViewModel();

    counter.increment();
    expect(counter.state.count).toBe(1);

    counter.increment();
    expect(counter.state.count).toBe(2);
  });

  it("notifies subscribers on updates", () => {
    const counter = new CounterViewModel();
    const updates = [];

    counter.subscribe((state) => updates.push(state));

    counter.increment();
    counter.increment();

    expect(updates).toEqual([
      { count: 1 },
      { count: 2 },
    ]);
  });
});
```

## Framework Integration

The view models are designed to work with framework-specific adapters. Upcoming adapters include:

- **@view-models/react** - React hooks integration
- **@view-models/preact** - Preact hooks integration

These adapters will allow you to use the same view model with different frameworks:

```typescript
// Coming soon with @view-models/react
function Counter({ model }) {
  const { count } = useModelState(model);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={model.increment}>+</button>
      <button onClick={model.decrement}>-</button>
    </div>
  );
}
```

## API Reference

### `ViewModel<T>`

Abstract base class for creating view models.

#### Constructor

```typescript
constructor(initialState: T)
```

Initialize the view model with an initial state.

#### Methods

##### `subscribe(listener: ViewModelListener<T>): void`

Subscribe to state changes. The listener will be called with the new state whenever `update()` is called.

```typescript
const unsubscribe = viewModel.subscribe((state) => {
  console.log("State changed:", state);
});
```

##### `unsubscribe(listener: ViewModelListener<T>): void`

Unsubscribe a previously subscribed listener.

```typescript
viewModel.unsubscribe(listener);
```

##### `update(updater: Updater<T>): void` (protected)

Update the state and notify all subscribers. This method is protected and should only be called from within your view model subclass.

```typescript
protected update(updater: (currentState: T) => T): void
```

The updater function receives the current state and should return the new state.

##### `state: T` (getter)

Access the current state.

```typescript
const currentState = viewModel.state;
```

## Patterns and Best Practices

### Keep State Immutable

Always return new state objects from your updater functions:

```typescript
// Good
this.update(({ count }) => ({
  ...state,
  count: count + 1,
}));

// Bad - mutates existing state
this.update((state) => {
  state.count++;
  return state;
});
```

### Use Readonly Types

TypeScript's `Readonly` and `ReadonlyArray` help ensure immutability:

```typescript
type State = {
  items: ReadonlyArray<string>;
  config: Readonly<{ enabled: boolean }>;
};
```

### Compose Multiple View Models

You can compose view models for complex UIs:

```typescript
class AppViewModel {
  readonly user = new UserViewModel();
  readonly cart = new CartViewModel();
  readonly products = new ProductsViewModel();
}
```

### Handle Side Effects

Keep your update logic pure, but expose methods for side effects:

```typescript
class TodosViewModel extends ViewModel<TodosState> {
  private api: API

  constructor(state: TodosState, api: API) {
    super(state)
    this.api = api
  }

  async loadTodos() {
    this.update((state) => ({ ...state, loading: true, failed: false }));
    try {
      const todos = await this.api.fetchTodos();
      this.update(() => ({ todos, loading: false }));
    } catch {
      this.update((state) => ({ ...state, loading: false: failed: true }));
    }
  }

  async addTodo(text: string) {
    try {
      const todo = await this.api.createTodo(text);
      this.update(({ todos }) => ({
        todos: [...todos, todo],
      }));
    } catch {
      // TODO show error
    }
  }
}
```

## License

MIT License

Copyright (c) 2026 Sune Simonsen <sune@we-knowhow.dk>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
