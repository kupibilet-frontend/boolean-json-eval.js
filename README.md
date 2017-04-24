```javascript
var evaluate = require('boolean-json-eval')
```

The package exports a function of two arguments:

1. a [boolean-json](https://npmjs.com/packages/boolean-json-schema) expression

2. an object map from string variable name to `true`, `false` or a predicate (a function returning a boolean value) to be computed lazily.

It returns `true` or `false`.

```javascript
var assert = require('assert')

assert(evaluate('x', {x: true}))

assert(
  evaluate(
    {or: ['a', {not: 'b'}, 'c']},
    {a: false, b: true, c: () => 2 * 2 === 4}
  )
)

assert(
  evaluate(
    {
      and:
      [
        {not: 'a'},
        {not: {not: {not: 'a'}}},
        {or: ['a', {not: 'a'}]}
      ]
    },
    {a: false}
  )
)
```

The function throws an exception if its expression argument references an undefined variable.

```javascript
assert.throws(function() {
  evaluate('x', {})
})
```


[![Greenkeeper badge](https://badges.greenkeeper.io/kupibilet-frontend/boolean-json-eval.js.svg)](https://greenkeeper.io/)