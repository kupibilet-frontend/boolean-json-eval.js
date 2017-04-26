"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function booleanJSONEval(expression, variables) {
    if (typeof expression === 'string') {
        if (!(expression in variables)) {
            throw new Error("Undefined variable: " + expression);
        }
        var variable = variables[expression];
        return typeof variable === 'function'
            ? variables[expression] = !!variable() // caching
            : !!variable;
    }
    if ('not' in expression) {
        return !booleanJSONEval(expression.not, variables);
    }
    if ('and' in expression) {
        return expression.and.every(function (operand) { return booleanJSONEval(operand, variables); });
    }
    if ('or' in expression) {
        return expression.or.some(function (operand) { return booleanJSONEval(operand, variables); });
    }
    throw new Error('Invalid boolean JSON');
}
exports.default = booleanJSONEval;
//# sourceMappingURL=index.js.map