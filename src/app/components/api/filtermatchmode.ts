export class FilterMatchMode {
    public static readonly STARTS_WITH = 'startsWith';
    public static readonly CONTAINS = 'contains';
    public static readonly NOT_CONTAINS = 'notContains';
    public static readonly ENDS_WITH = 'endsWith';
    public static readonly EQUALS = 'equals';
    public static readonly NOT_EQUALS = 'notEquals';
    public static readonly IN = 'in';
    public static readonly LESS_THAN = 'lt';
    public static readonly LESS_THAN_OR_EQUAL_TO = 'lte';
    public static readonly GREATER_THAN = 'gt';
    public static readonly GREATER_THAN_OR_EQUAL_TO = 'gte';
    public static readonly BETWEEN = 'between';
    public static readonly IS = 'is';
    public static readonly IS_NOT = 'isNot';
    public static readonly BEFORE = 'before';
    public static readonly AFTER = 'after';
}