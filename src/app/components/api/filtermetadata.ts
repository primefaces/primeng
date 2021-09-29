import { FilterMatchMode } from "./filtermatchmode";
import { FilterOperator } from "./filteroperator";

export interface FilterMetadata {
    value: any;
    matchMode: FilterMatchMode;
}
export interface FilterMetadataWithOperator {
    value: any;
    matchMode: FilterMatchMode;
    operator: FilterOperator;
}
