import equals from "./equals.js";

export default class Assert {
  constructor(actual, id, _case) {
    this.actual = actual;
    this.id = id;
    this.case = _case;
  }

  same(expected) {
    this.report(this.actual === expected, expected);
  }

  equals(expected) {
    this.report(equals(this.actual, expected), expected);
  }

  unequals(expected) {
    this.report(!equals(this.actual, expected), `different from ${expected}`);
  }

  true() {
    return this.equals(true);
  }

  false() {
    return this.equals(false);
  }

  undefined() {
    return this.equals(undefined);
  }

  defined() {
    this.report(this.actual !== undefined, "(to be defined)");
  }

  typeof(expected) {
    this.report(typeof this.actual === expected, expected);
  }

  instanceof(expected) {
    this.report(this.actual instanceof expected, expected);
  }

  async throws(expected_message = "") {
    try {
      await this.actual();
      this.actual = "(did not throw)";
      this.report(false, expected_message);
    } catch (actual_error) {
      this.actual = `(Error) ${actual_error.message}`;
      const expected = `(Error) ${expected_message}`;
      this.report(actual_error.message === expected_message, expected);
    }
  }

  async not_throws() {
    let result;
    try {
      await this.actual();
      this.actual = "(did not throw)";
      result = true;
    } catch (actual_error) {
      this.actual = actual_error.message;
      result = false;
    } finally {
      this.report(result, "(did not throw)");
    }
  }

  report(passed, expected) {
    this.passed = passed;
    this.expected = expected;
  }

  atleast(number) {
    this.report(Number(this.actual) >= number, `>=${number}`);
  }

  stable() {
    const snapshot = this.case.snapshot(this.id, this.serialized);
    if (snapshot === undefined) {
      this.report(true);
    } else {
      this.actual = this.serialized;
      this.equals(snapshot);
    }
  }

  get serialized() {
    return JSON.stringify(this.actual);
  }
}
