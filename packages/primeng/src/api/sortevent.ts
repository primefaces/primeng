import { SortMeta } from './sortmeta';
/**
 * Represents an event triggered when sorting is applied.
 * @group Interface
 */
export interface SortEvent {
    data?: any[];
    mode?: string;
    field?: string;
    order?: number;
    multiSortMeta?: SortMeta[];
}
