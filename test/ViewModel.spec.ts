import { describe, it, expect, beforeEach } from "vitest";
import { ViewModel } from "../src";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoArray = ReadonlyArray<Todo>;

type TodoState = {
  todos: TodoArray;
  completedCount: number;
  pendingCount: number;
};

const getCompletedCount = (todos: TodoArray) =>
  todos.reduce((count, todo) => count + (todo.completed ? 1 : 0), 0);

const getPendingCount = (todos: TodoArray) =>
  todos.length - getCompletedCount(todos);

class TodoViewModel extends ViewModel<TodoState> {
  private nextId = 1;

  protected prepareState(state: TodoState): TodoState {
    return {
      ...state,
      completedCount: state.todos.filter((t) => t.completed).length,
      pendingCount: state.todos.filter((t) => !t.completed).length,
    };
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

  remove(id: number) {
    const todos = super.state.todos.filter((todo) => todo.id !== id);
    this.updateTodos(todos);
  }

  private updateTodos(todos: TodoArray) {
    super.update({
      todos,
      completedCount: getCompletedCount(todos),
      pendingCount: getPendingCount(todos),
    });
  }
}

const defaultState: TodoState = {
  todos: [],
  completedCount: 0,
  pendingCount: 0,
};

describe("ViewModel", () => {
  let todoModel: TodoViewModel;
  let updates: TodoState[];
  let unsubscribe: () => void;

  beforeEach(() => {
    updates = [];
    todoModel = new TodoViewModel(defaultState);
    unsubscribe = todoModel.subscribe(() => {
      updates.push(todoModel.state);
    });

    todoModel.add("Buy milk");
    todoModel.add("Walk the dog");
  });

  it("updates state when adding todos", () => {
    expect(todoModel.state).toEqual({
      todos: [
        { completed: false, id: 1, text: "Buy milk" },
        { completed: false, id: 2, text: "Walk the dog" },
      ],
      completedCount: 0,
      pendingCount: 2,
    });
  });

  it("updates state when toggling todos", () => {
    todoModel.toggle(1);

    expect(todoModel.state).toEqual({
      todos: [
        { completed: true, id: 1, text: "Buy milk" },
        { completed: false, id: 2, text: "Walk the dog" },
      ],
      completedCount: 1,
      pendingCount: 1,
    });
  });

  it("updates state when removing todos", () => {
    todoModel.remove(1);

    expect(todoModel.state.todos).toEqual([
      { id: 2, text: "Walk the dog", completed: false },
    ]);
  });

  it("notifies subscribers on each update", () => {
    expect(updates).toEqual([
      {
        todos: [{ completed: false, id: 1, text: "Buy milk" }],
        completedCount: 0,
        pendingCount: 1,
      },
      {
        todos: [
          { completed: false, id: 1, text: "Buy milk" },
          { completed: false, id: 2, text: "Walk the dog" },
        ],
        completedCount: 0,
        pendingCount: 2,
      },
    ]);
  });

  it("emits no more updates after unsubscribing", () => {
    unsubscribe();

    todoModel.add("Clean the house");

    expect(todoModel.state.todos).toHaveLength(3);
    expect(updates).toHaveLength(2);
  });
});
