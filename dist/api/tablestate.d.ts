import { SortMeta } from './sortmeta';
import { FilterMetadata } from './filtermetadata';
export interface TableState {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: SortMeta[];
    filters?: {
        [s: string]: FilterMetadata | FilterMetadata[];
    };
    columnWidths?: string;
    tableWidth?: string;
    selection?: any;
    columnOrder?: string[];
    expandedRowKeys?: {
        [s: string]: boolean;
    };
}
