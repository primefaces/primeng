export interface Translation {
    startsWith?: string;
    contains?: string;
    notContains?: string;
    endsWith?: string;
    equals?: string;
    notEquals?: string;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    is?: string;
    isNot?: string;
    before?: string;
    after?: string;
    clear?: string;
    apply?: string;
    matchAll?: string;
    matchAny?: string;
    addRule?: string;
    removeRule?: string;
}
