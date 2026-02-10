# @view-models/core

[![CI](https://github.com/sunesimonsen/view-models-core/actions/workflows/ci.yml/badge.svg)](https://github.com/sunesimonsen/view-models-core/actions/workflows/ci.yml)
[![Bundle Size](https://img.badgesize.io/https://unpkg.com/@view-models/core@latest/dist/index.js?label=gzip&compression=gzip)](https://unpkg.com/@view-models/core@latest/dist/index.js)

A lightweight, framework-agnostic library for building reactive view models with
TypeScript. It separates business logic from UI frameworks with a simple,
testable pattern.

Hooks-based state management (for example in React) can easily lead to state
scattered across components, harder-to-control test setups, and re-rendering
pitfalls. By extracting the main logic of an application into a view model
layer, you get easier testing, more predictable rendering, and avoid needing to
follow the rules of hooks.

![view models](https://github.com/user-attachments/assets/e8e86f2c-99bd-47bb-846e-4893274689b1)<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="830" height="240" viewBox="0, 0, 830, 240">
  <g id="Deviders">
    <path d="M277.167,13.748 L277.167,227.14" fill-opacity="0" stroke="#8C8C8C" stroke-width="1" stroke-dasharray="10,7"/>
    <path d="M553.833,13.748 L553.833,227.14" fill-opacity="0" stroke="#8C8C8C" stroke-width="1" stroke-dasharray="10,7"/>
  </g>
  <g id="Tests">
    <text transform="matrix(1, 0, 0, 1, 136.06, 128.752)">
      <tspan x="-124.537" y="-57.22" font-family="Helvetica-Bold" font-size="12" fill="#717070">Views created by a specific framework like </tspan>
      <tspan x="-124.537" y="-42.22" font-family="Helvetica-Bold" font-size="12" fill="#717070">React.</tspan>
      <tspan x="-124.537" y="-12.22" font-family="Helvetica-Bold" font-size="12" fill="#717070">Views subscribe to state updates on the </tspan>
      <tspan x="-124.537" y="2.78" font-family="Helvetica-Bold" font-size="12" fill="#717070">view models and re-render the view.</tspan>
      <tspan x="-124.537" y="32.78" font-family="Helvetica-Bold" font-size="12" fill="#717070">Views listen to user events and invokes </tspan>
      <tspan x="-124.537" y="47.78" font-family="Helvetica-Bold" font-size="12" fill="#717070">methods on the view model to update the </tspan>
      <tspan x="-124.537" y="62.78" font-family="Helvetica-Bold" font-size="12" fill="#717070">state.</tspan>
    </text>
    <text transform="matrix(1, 0, 0, 1, 414.917, 135.957)">
      <tspan x="-124.537" y="-64.425" font-family="Helvetica-Bold" font-size="12" fill="#544747">View models captures the state of the </tspan>
      <tspan x="-124.537" y="-49.425" font-family="Helvetica-Bold" font-size="12" fill="#544747">system and exposes actions in the form of </tspan>
      <tspan x="-124.537" y="-34.425" font-family="Helvetica-Bold" font-size="12" fill="#544747">methods that allows updating the state of </tspan>
      <tspan x="-124.537" y="-19.425" font-family="Helvetica-Bold" font-size="12" fill="#544747">the application.</tspan>
      <tspan x="-124.537" y="10.575" font-family="Helvetica-Bold" font-size="12" fill="#544747">View integrate with the state of the view </tspan>
      <tspan x="-124.537" y="25.575" font-family="Helvetica-Bold" font-size="12" fill="#544747">models by subscribing to state updates.</tspan>
      <tspan x="-124.537" y="55.575" font-family="Helvetica-Bold" font-size="12" fill="#544747">Actions of view models can call external </tspan>
      <tspan x="-124.537" y="70.575" font-family="Helvetica-Bold" font-size="12" fill="#544747">dependencies like network and storage.</tspan>
    </text>
    <text transform="matrix(1, 0, 0, 1, 693.773, 120.466)">
      <tspan x="-124.537" y="-48.935" font-family="Helvetica-Bold" font-size="12" fill="#717070">Dependencies is supplied to the view </tspan>
      <tspan x="-124.537" y="-33.935" font-family="Helvetica-Bold" font-size="12" fill="#717070">models through their constructor and can </tspan>
      <tspan x="-124.537" y="-18.935" font-family="Helvetica-Bold" font-size="12" fill="#717070">interactive with the world outside the </tspan>
      <tspan x="-124.537" y="-3.935" font-family="Helvetica-Bold" font-size="12" fill="#717070">application. </tspan>
      <tspan x="-124.537" y="26.065" font-family="Helvetica-Bold" font-size="12" fill="#717070">Examples of dependencies could be </tspan>
      <tspan x="-124.537" y="41.065" font-family="Helvetica-Bold" font-size="12" fill="#717070">network requests, browser storage, web </tspan>
      <tspan x="-124.537" y="56.065" font-family="Helvetica-Bold" font-size="12" fill="#717070">sockets, workers and so on.</tspan>
    </text>
  </g>
  <g id="Headings">
    <text transform="matrix(1, 0, 0, 1, 137.5, 30.5)">
      <tspan x="-22.539" y="3.5" font-family="Helvetica-Bold" font-size="16" fill="#717070">Views</tspan>
    </text>
    <text transform="matrix(1, 0, 0, 1, 415, 30.5)">
      <tspan x="-48.32" y="3.5" font-family="Helvetica-Bold" font-size="16" fill="#544647">View models</tspan>
    </text>
    <text transform="matrix(1, 0, 0, 1, 692.5, 30.5)">
      <tspan x="-54.242" y="3.5" font-family="Helvetica-Bold" font-size="16" fill="#717070">Dependencies</tspan>
    </text>
  </g>
</svg>

## Why View Models?

- **Framework-agnostic**: Write your logic once, use it with React, Preact, or any other framework
- **Easy Testing**: Test your view logic without rendering anything to the DOM
- **Simple API**: Just extend `ViewModel` and you're ready to go
- **Type-safe**: Built with TypeScript for excellent IDE support
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

  increment = () => {
    super.update({
      count: super.state.count + 1,
    });
  };

  decrement = () => {
    super.update({
      count: super.state.count - 1,
    });
  };
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

    counter.subscribe(() => updates.push(counter.state));

    counter.increment();
    counter.increment();

    expect(updates).toEqual([{ count: 1 }, { count: 2 }]);
  });
});
```

## Examples

- [TodoMVC using @view-models/react](https://github.com/sunesimonsen/view-models-react-todomvc)
- [HackerNews using @view-models/react](https://github.com/sunesimonsen/view-models-react-hackernews)

## Framework Integration

The view models are designed to work with framework-specific adapters. Upcoming
adapters include:

- [@view-models/react](https://github.com/sunesimonsen/view-models-react) - React hooks integration
- [@view-models/preact](https://github.com/sunesimonsen/view-models-preact) - Preact hooks integration

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

For detailed API documentation, see [docs](./docs).

## Patterns and Best Practices

### Keep State Immutable

Always pass a new partial state object to `update`:

```typescript
// Good
super.update({
  count: super.state.count + 1,
});

// Bad - mutates existing state
const state = super.state;
state.count++;
super.update(state);
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

### Asynchronous Actions

Keep update logic pure; use methods to execute asynchronous actions:

```typescript
class TodosViewModel extends ViewModel<TodosState> {
  private api: API;

  constructor(state: TodosState, api: API) {
    super(state);
    this.api = api;
  }

  async loadTodos() {
    super.update({ loading: true, failed: false });
    try {
      const todos = await this.api.fetchTodos();
      super.update({ todos, loading: false });
    } catch {
      super.update({ loading: false, failed: true });
    }
  }

  async addTodo(text: string) {
    try {
      const todo = await this.api.createTodo(text);
      super.update({
        todos: [...super.state.todos, todo],
      });
    } catch {
      // TODO show error
    }
  }
}
```

### Derived State

When you have state values that are derived from other state, create a dedicated
update method that computes these values. This approach is more explicit and
efficient than intercepting every state update:

```typescript
type TodoState = {
  todos: ReadonlyArray<{ id: number; text: string; completed: boolean }>;
  completedCount: number;
  pendingCount: number;
};

class TodoViewModel extends ViewModel<TodoState> {
  private nextId = 1;

  constructor() {
    super({ todos: [], completedCount: 0, pendingCount: 0 });
  }

  add(text: string) {
    const todos = [
      ...super.state.todos,
      { id: this.nextId++, text, completed: false },
    ];
    this.updateTodos(todos);
  }

  toggle(id: number) {
    const todos = super.state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    this.updateTodos(todos);
  }

  private updateTodos(todos: TodoState["todos"]) {
    super.update({
      todos,
      completedCount: todos.filter((t) => t.completed).length,
      pendingCount: todos.filter((t) => !t.completed).length,
    });
  }
}

const todoModel = new TodoViewModel();
todoModel.add("Buy milk");
todoModel.add("Walk the dog");
todoModel.toggle(1);
console.log(todoModel.state.completedCount); // 1
console.log(todoModel.state.pendingCount); // 1
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
