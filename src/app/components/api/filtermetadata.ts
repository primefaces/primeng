/**
 * Represents metadata for filtering a data set.
 * @group Interface
 */
export interface FilterMetadata {
    /**
     * The value used for filtering.
     */
    value?: any;
    /**
     * The match mode for filtering.
     */
    matchMode?: string;
    /**
     * The operator for filtering.
     */
    operator?: string;
}
