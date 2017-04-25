const evaluate = require('./lib/index').default

test('a + !b + c', () => {
  const result = evaluate(
    { or: ['a', { not: 'b' }, 'c'] },
    { a: false, b: true, c: () => 2 * 2 === 4 }
  )
  expect(result).toBe(true)
})

test('!a * !!!a * (a + !a)', () => {
  const result = evaluate(
    {
      and:
      [
        { not: 'a' },
        { not: { not: { not: 'a' } } },
        { or: ['a', { not: 'a' }] }
      ]
    },
    {
      a: false,
    },
  )
  expect(result).toBe(true)
})

const xor = (a, b) => evaluate(
  {
    or: [
      {
        and: [ 'a', { not: 'b' } ],
      },
      {
        and: [ 'b', { not: 'a' } ],
      },
    ],
  },
  { a, b },
)

test('xor false false', () => {
  const result = xor(false, false)
  expect(result).toBe(false)
})

test('xor false true', () => {
  const result = xor(false, true)
  expect(result).toBe(true)
})

test('xor true false', () => {
  const result = xor(true, false)
  expect(result).toBe(true)
})

test('xor true true', () => {
  const result = xor(true, true)
  expect(result).toBe(false)
})
