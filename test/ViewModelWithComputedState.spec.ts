import { describe, it, expect, beforeEach } from "vitest";
import { ViewModelWithComputedState } from "../src";

type Operator = "+" | "-" | "/" | "*";
type Operation = {
  number: number;
  operator: Operator;
};

type CalculatorInternalState = {
  history: ReadonlyArray<Operation>;
  result: number;
};

type CalculatorDerivedState = {
  history: ReadonlyArray<Operation>;
  result: number;
  operationCount: number;
  lastOperation: Operation | null;
};

class CalculatorWithDerivedState extends ViewModelWithComputedState<
  CalculatorInternalState,
  CalculatorDerivedState
> {
  constructor() {
    super({
      history: [],
      result: 0,
    });
  }

  computedState({
    history,
    result,
  }: CalculatorInternalState): CalculatorDerivedState {
    return {
      history,
      result,
      operationCount: history.length,
      lastOperation: history[history.length - 1] || null,
    };
  }

  add(n: number) {
    super.update({
      history: [...super.state.history, { number: n, operator: "+" }],
      result: super.state.result + n,
    });
  }

  subtract(n: number) {
    super.update({
      history: [...super.state.history, { number: n, operator: "-" }],
      result: super.state.result - n,
    });
  }

  divide(n: number) {
    super.update({
      history: [...super.state.history, { number: n, operator: "/" }],
      result: super.state.result / n,
    });
  }

  multiply(n: number) {
    super.update({
      history: [...super.state.history, { number: n, operator: "*" }],
      result: super.state.result * n,
    });
  }
}

const expectedUpdates = [
  {
    history: [{ number: 10, operator: "+" }],
    result: 10,
    operationCount: 1,
    lastOperation: { number: 10, operator: "+" },
  },
  {
    history: [
      { number: 10, operator: "+" },
      { number: 5, operator: "+" },
    ],
    result: 15,
    operationCount: 2,
    lastOperation: { number: 5, operator: "+" },
  },
  {
    history: [
      { number: 10, operator: "+" },
      { number: 5, operator: "+" },
      { number: 2, operator: "*" },
    ],
    result: 30,
    operationCount: 3,
    lastOperation: { number: 2, operator: "*" },
  },
  {
    history: [
      { number: 10, operator: "+" },
      { number: 5, operator: "+" },
      { number: 2, operator: "*" },
      { number: 3, operator: "/" },
    ],
    result: 10,
    operationCount: 4,
    lastOperation: { number: 3, operator: "/" },
  },
];

describe("ViewModelWithComputedState", () => {
  let calculator: CalculatorWithDerivedState;
  let updates: CalculatorDerivedState[];
  let unsubscribe: () => void;

  beforeEach(() => {
    updates = [];
    calculator = new CalculatorWithDerivedState();
    unsubscribe = calculator.subscribe(() => {
      updates.push(calculator.state);
    });

    calculator.add(10);
    calculator.add(5);
    calculator.multiply(2);
    calculator.divide(3);
  });

  it("updates its state accordingly to the operations", () => {
    expect(calculator.state).toEqual({
      history: [
        { number: 10, operator: "+" },
        { number: 5, operator: "+" },
        { number: 2, operator: "*" },
        { number: 3, operator: "/" },
      ],
      result: 10,
      operationCount: 4,
      lastOperation: { number: 3, operator: "/" },
    });
  });

  it("computes derived state correctly", () => {
    expect(calculator.state.operationCount).toBe(4);
    expect(calculator.state.lastOperation).toEqual({
      number: 3,
      operator: "/",
    });
  });

  it("notifies subscribers with derived state", () => {
    expect(updates).toEqual(expectedUpdates);
  });

  describe("after unsubscribing", () => {
    beforeEach(() => {
      unsubscribe();
    });

    it("emits no more updates", () => {
      calculator.add(5);

      expect(calculator.state).toEqual({
        history: [
          { number: 10, operator: "+" },
          { number: 5, operator: "+" },
          { number: 2, operator: "*" },
          { number: 3, operator: "/" },
          { number: 5, operator: "+" },
        ],
        result: 15,
        operationCount: 5,
        lastOperation: { number: 5, operator: "+" },
      });

      expect(updates).toEqual(expectedUpdates);
    });
  });
});
