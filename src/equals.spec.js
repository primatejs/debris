import equals from "./equals.js";

export default test => {
  test.case("different type", assert => {
    assert(equals("", 0)).false();
    assert(equals(0, "")).false();
  });

  test.case("same type, typeof !== `object`", assert => {
    assert(equals(0, 0)).true();
    assert(equals(0, 1)).false();
    assert(equals(1, 0)).false();
  });

  test.case("same type, typeof === `object`, is `null`", assert => {
    assert(equals(null, null)).true();
    assert(equals(null, 1)).false();
    assert(equals(1, null)).false();
  });

  test.case("typeof === `object`, is array", assert => {
    assert(equals([], [])).true();
    assert(equals([], new Map())).true();
    assert(equals(new Map(), [])).true();
  });

  test.case("array", assert => {
    assert(equals([1], [1])).true();
    assert(equals([1], [0])).false();
    assert(equals([0], [1])).false();
  });

  test.case("bigint", assert => {
    assert(equals(1n, 1n)).true();
    assert(equals(0n, 1n)).false();
    assert(equals(1n, 0n)).false();
  });

  test.case("date", assert => {
    const now = new Date();
    assert(equals(new Date(now.toJSON()), now)).true();
    assert(equals(new Date("2000-01-01"), now)).false();
  });
};
