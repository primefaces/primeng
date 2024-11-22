import { Injectable } from '@angular/core';
import { resolveFieldData } from '@primeuix/utils';
import { Subject } from 'rxjs';

import { FilterMatchMode, FilterMetadata, FilterOperator, FilterService, SortMeta } from 'primeng/api';

import { FiltersArg } from '../api/fitlersarg';

// DEBUG! MAKE HINT!
export const globalFilterFieldName = '__##__global__##__';

@Injectable()
export class TableService {
    private sortSource = new Subject<SortMeta | SortMeta[] | null>();
    private selectionSource = new Subject();
    private contextMenuSource = new Subject<any>();
    private valueSource = new Subject<any>();
    private totalRecordsSource = new Subject<any>();
    private columnsSource = new Subject();

    sortSource$ = this.sortSource.asObservable();
    selectionSource$ = this.selectionSource.asObservable();
    contextMenuSource$ = this.contextMenuSource.asObservable();
    valueSource$ = this.valueSource.asObservable();
    totalRecordsSource$ = this.totalRecordsSource.asObservable();
    columnsSource$ = this.columnsSource.asObservable();

    constructor(private filterService: FilterService) {}

    onSort(sortMeta: SortMeta | SortMeta[] | null) {
        this.sortSource.next(sortMeta);
    }

    onSelectionChange() {
        this.selectionSource.next(null);
    }

    onContextMenu(data: any) {
        this.contextMenuSource.next(data);
    }

    onValueChange(value: any) {
        this.valueSource.next(value);
    }

    onTotalRecordsChange(value: number) {
        this.totalRecordsSource.next(value);
    }

    onColumnsChange(columns: any[]) {
        this.columnsSource.next(columns);
    }

    filter(data: any[], filters: FiltersArg, globalFilterFieldsArray: any[], filterLocale: string | undefined): any[] {
        if (!data || data.length === 0) {
            return [];
        }

        if (!filters || Object.keys(filters).length === 0) {
            return data;
        }

        let filteredValue = [];

        for (let dataItem of data) {
            let localMatch = true;
            let globalMatch = false;
            let localFiltered = false;

            for (let prop in filters) {
                if (filters.hasOwnProperty(prop) && prop !== globalFilterFieldName) {
                    localFiltered = true;
                    let filterField = prop;
                    let filterMeta = filters[filterField];

                    if (Array.isArray(filterMeta)) {
                        const initialOperator = FilterOperator.AND;
                        let operator: FilterOperator = initialOperator;

                        for (let meta of filterMeta) {
                            const currentMatch = this.executeLocalFilter(filterField, dataItem, meta, filterLocale);

                            switch (operator) {
                                case FilterOperator.OR:
                                    localMatch ||= currentMatch;
                                    break;

                                case FilterOperator.AND:
                                    localMatch &&= currentMatch;
                                    break;
                            }

                            operator = meta.operator || FilterOperator.AND;
                        }
                    } else {
                        localMatch = this.executeLocalFilter(filterField, dataItem, <any>filterMeta, filterLocale);
                    }

                    if (!localMatch) {
                        break;
                    }
                }
            }

            if (filters[globalFilterFieldName] && !globalMatch && globalFilterFieldsArray) {
                globalMatch = this.initGlobalMatch((<FilterMetadata>filters[globalFilterFieldName]).matchMode);

                for (let globalField of globalFilterFieldsArray) {
                    let globalFilterField = globalField.field || globalField;
                    const matchMode = (<any>filters[globalFilterFieldName]).matchMode;

                    const resolvedData = resolveFieldData(dataItem, globalFilterField);

                    let currentMatch = (<any>this.filterService).filters[matchMode](resolvedData, (<FilterMetadata>filters[globalFilterFieldName]).value, filterLocale);

                    if (!resolvedData && this.isNegating(matchMode)) {
                        currentMatch = true;
                    }

                    if (this.concatWithOr(matchMode)) {
                        globalMatch ||= currentMatch;
                        if (currentMatch) {
                            break;
                        }
                    } else if (this.concatWithAnd(matchMode)) {
                        globalMatch &&= currentMatch;
                        if (!currentMatch) {
                            break;
                        }
                    }
                }
            }

            let matches: boolean;
            if (filters[globalFilterFieldName]) {
                matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
            } else {
                matches = localFiltered && localMatch;
            }

            if (matches) {
                filteredValue.push(dataItem);
            }
        }

        return filteredValue;
    }

    private initGlobalMatch(matchMode: string): boolean {
        if (this.concatWithOr(matchMode)) {
            return false;
        } else if (this.concatWithAnd(matchMode)) {
            return true;
        } else {
            throw new Error(`Unsupported match mode: ${matchMode}`);
        }
    }

    private concatWithOr(matchMode: string): boolean {
        return [
            FilterMatchMode.STARTS_WITH,
            FilterMatchMode.CONTAINS,
            FilterMatchMode.ENDS_WITH,
            FilterMatchMode.EQUALS,
            FilterMatchMode.IN,
            FilterMatchMode.LESS_THAN,
            FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            FilterMatchMode.GREATER_THAN,
            FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
            FilterMatchMode.BETWEEN,
            FilterMatchMode.IS,
            FilterMatchMode.BEFORE,
            FilterMatchMode.AFTER,
            FilterMatchMode.DATE_IS,
            FilterMatchMode.DATE_BEFORE,
            FilterMatchMode.DATE_AFTER
        ].includes(matchMode);
    }

    private concatWithAnd(matchMode: string): boolean {
        return this.isNegating(matchMode);
    }

    private isNegating(matchMode: string): boolean {
        return [FilterMatchMode.NOT_CONTAINS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.IS_NOT, FilterMatchMode.DATE_IS_NOT].includes(matchMode);
    }

    private executeLocalFilter(field: string, rowData: any, filterMeta: FilterMetadata, filterLocale: string | undefined): boolean {
        const filterValue = filterMeta.value;
        const filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
        const dataFieldValue = resolveFieldData(rowData, field);
        const filterConstraint = (<any>this.filterService).filters[filterMatchMode];

        return filterConstraint(dataFieldValue, filterValue, filterLocale);
    }
}
