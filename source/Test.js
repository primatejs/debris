import Case from "./Case.js";

export default class Test {
  constructor() {
    this.for = fixtures => fixtures;
    this.cases = [];
  }

  space(name, inputs, body) {
    inputs.forEach(input =>
      this.case(`${name} ${input}`, (assert, ...args) =>
        body(assert, input, ...args)));
  }

  case(description, body) {
    this.cases.push(new Case(description, body, this, this.cases.length));
  }

  async run(target, runtime) {
    for (const _case of this.cases) {
      await _case.run(target, runtime);
    }
  }
}
