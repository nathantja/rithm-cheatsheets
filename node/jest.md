## Install

- `npm i --global jest` - install globally on device

`jest -i --watchAll`

## Setup

`NAME_OF_FILE.test.js`

- place in same directory
- OR in `__tests__` folder

- if there's a package.json, no additional config needed
- OR `jest.config.js` only needs to exist, can be empty

- `jest` to run
- `jest file.test.js` to run specifics

## How to write?

- write tests inside of test function callbacks:

```JavaScript
function add(x, y) {
  return x + y;
}
module.exports = { add };
```

```JavaScript
const { add } = require("./add");

test("add should return sum", function () {
  expect(add(2, 3)).toEqual(5);
});
```

## Describe

- group tests together

```JavaScript
describe("add function", function () {

  test("return sum", function () {
    let sum = add(2, 3);
    expect(sum).toEqual(5);
  });

  test("return sum w/neg numbers", function () {
    let sum = add(-2, 3);
    expect(sum).toEqual(1);
  });

});
```

## Expectations

- can have several in each function
- expect value to matcher value

## Matchers

`.toEqual(obj)` - Has the same value (eg, different objects with same values match)
`.toBe(obj)` - Is the same object (eg, different objects with same values do not)
`.toContain(sought)` - Does iterable contain this item?
`.not.` - Add before matcher to invert (eg expect("hi").not.toEqual("bye"))

https://jestjs.io/docs/en/using-matchers

### Expect Any

```JavaScript
const { getRandomToy } = require("./any");

test("random toy", function () {
  let toy = getRandomToy();
  expect(toy).toEqual({
    toy: {
      name: expect.any(String),
      price: 34.99,
    },
  });
});
```

## Hooks

### Before

```JavaScript
describe("getCartTotal", function () {
  let cart; // needs to be scoped here

  beforeEach(function () {
    cart = [
      { id: "le croix", price: 4, qty: 3 },
      { id: "pretzels", price: 8, qty: 10 },
    ];
  });

  test("total w/o discount", function () {
    const total = getCartTotal(cart);
    expect(total).toEqual(92);
  });

  test("total w/discount", function () {
    const total = getCartTotal(cart, 0.5);
    expect(total).toEqual(46);
  });
});
```

For one-time setup/teardown:

- `beforeAll` - run once before all tests start
- `afterAll` - run once after all tests finish

For frequent setup/teardown:

- `beforeEach` - run before each test starts
- `afterEach` - run after each test finishes

- can put directly in or out of describe block (in global scope)

## Command Line Options

### Watch

- `jest --watch <file>` (useful for detecting changes in a specific file)
- `jest --watchAll` (useful for detecting changes in any file)

### Coverage

- `jest --coverage` - generates report, and folder with more info. can open index.html in browser

- Statement coverage: has each statement been executed?
- Branch coverage: has each branch of control structures been executed? - inside of if/else statement, try/catch, etc.
- Function coverage: has each function been executed?

- 90%+ is good. 100% not always worth it


## MOCKING
- bring in the entire module
- mock before you import the thing tested

```js

const dice = require("/.dice");
dice.d6 = jest.fn()

const { lucky7Game } = require("./casino");

test("always roll 4", function () {
  dice.d6
      .mockReturnValue(4);
  expect(lucky7Game()).toEqual(8);
});

test("lucky 7!", function () {
  dice.d6
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4);
  expect(lucky7Game()).toEqual(7);
});

test("make sure rolled 2d6", function () {
  dice.d6.mockClear();
  lucky7Game();
  expect(dice.d6).toHaveBeenCalledTimes(2);
});
```

### MOCK AJAX CALLS

- fetch-mock
- url must be exact same url with same http method


```js
const fetchMock = require("fetch-mock");

const { getFact, BASE_URL } = require("./nums");

test("fact about 7", async function () {
  fetchMock.get(`${BASE_URL}/7`, {
    body: {
      fact: "7 is lucky"
    },
    status: 200
  })

  const res = await getFact(7);
  expect(res).toEqual("7 is lucky");
});
```

mocking out fetch - fetch mock

mocking out a function - jest.fn()