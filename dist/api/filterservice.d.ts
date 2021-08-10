export declare class FilterService {
    filter(value: any[], fields: any[], filterValue: any, filterMatchMode: string, filterLocale?: string): any[];
    filters: {
        startsWith: (value: any, filter: any, filterLocale?: any) => boolean;
        contains: (value: any, filter: any, filterLocale?: any) => boolean;
        notContains: (value: any, filter: any, filterLocale?: any) => boolean;
        endsWith: (value: any, filter: any, filterLocale?: any) => boolean;
        equals: (value: any, filter: any, filterLocale?: any) => boolean;
        notEquals: (value: any, filter: any, filterLocale?: any) => boolean;
        in: (value: any, filter: any[]) => boolean;
        between: (value: any, filter: any[]) => boolean;
        lt: (value: any, filter: any, filterLocale?: any) => boolean;
        lte: (value: any, filter: any, filterLocale?: any) => boolean;
        gt: (value: any, filter: any, filterLocale?: any) => boolean;
        gte: (value: any, filter: any, filterLocale?: any) => boolean;
        is: (value: any, filter: any, filterLocale?: any) => boolean;
        isNot: (value: any, filter: any, filterLocale?: any) => boolean;
        before: (value: any, filter: any, filterLocale?: any) => boolean;
        after: (value: any, filter: any, filterLocale?: any) => boolean;
        dateIs: (value: any, filter: any) => boolean;
        dateIsNot: (value: any, filter: any) => boolean;
        dateBefore: (value: any, filter: any) => boolean;
        dateAfter: (value: any, filter: any) => boolean;
    };
    register(rule: string, fn: Function): void;
}
