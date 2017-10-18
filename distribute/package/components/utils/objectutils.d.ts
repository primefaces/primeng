export declare class ObjectUtils {
    equals(obj1: any, obj2: any, field?: string): boolean;
    equalsByValue(obj1: any, obj2: any): boolean;
    resolveFieldData(data: any, field: string): any;
    filter(value: any[], fields: any[], filterValue: string): any[];
    reorderArray(value: any[], from: number, to: number): void;
}
