import { describe, it, expect, beforeEach } from "vitest";
import { ViewModel } from "../src";

type Operator = "+" | "-" | "/" | "*";
type Operation = {
  number: number;
  operator: Operator;
};

type CalculatorState = {
  history: ReadonlyArray<Operation>;
  result: number;
};

class Calculator extends ViewModel<CalculatorState> {
  constructor() {
    super({
      history: [],
      result: 0,
    });
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
  },
  {
    history: [
      { number: 10, operator: "+" },
      { number: 5, operator: "+" },
    ],
    result: 15,
  },
  {
    history: [
      { number: 10, operator: "+" },
      { number: 5, operator: "+" },
      { number: 2, operator: "*" },
    ],
    result: 30,
  },
  {
    history: [
      { number: 10, operator: "+" },
      { number: 5, operator: "+" },
      { number: 2, operator: "*" },
      { number: 3, operator: "/" },
    ],
    result: 10,
  },
];

describe("ViewModel", () => {
  let calculator: Calculator;
  let updates: CalculatorState[];
  let unsubscribe: () => void;

  beforeEach(() => {
    updates = [];
    calculator = new Calculator();
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
    });
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
      });

      expect(updates).toEqual(expectedUpdates);
    });
  });
});
