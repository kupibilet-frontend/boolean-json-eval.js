export declare type Expression = ExpressionObject | string;
export interface ExpressionObject {
    not: Expression;
    and: Expression[];
    or: Expression[];
}
export declare type Predicate = () => boolean;
export interface Variables {
    [variable: string]: boolean | Predicate;
}
export default function booleanJSONEval(expression: Expression, variables: Variables): boolean;
