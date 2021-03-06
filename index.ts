export type Expression = ExpressionObject | string

export interface ExpressionObject {
  not: Expression,
  and: Expression[],
  or: Expression[],
}

export type Predicate = () => boolean

export interface Variables {
  [variable: string]: boolean | Predicate
}

export default function booleanJSONEval(expression: Expression, variables: Variables): boolean {
  if (typeof expression === 'string') {
    if (!(expression in variables)) {
      throw new Error(`Undefined variable: ${expression}`)
    }

    const variable = variables[expression]
    return typeof variable === 'function'
      ? variables[expression] = !!variable() // caching
      : !!variable
  }

  if ('not' in expression) {
    return !booleanJSONEval(expression.not, variables)
  }

  if ('and' in expression) {
    return expression.and.every(operand => booleanJSONEval(operand, variables))
  }

  if ('or' in expression) {
    return expression.or.some(operand => booleanJSONEval(operand, variables))
  }

  throw new Error('Invalid boolean JSON')
}
