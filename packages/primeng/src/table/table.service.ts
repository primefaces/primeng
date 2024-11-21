import { Injectable } from '@angular/core';
import { resolveFieldData } from '@primeuix/utils';
import { FilterMatchMode, FilterMetadata, FilterOperator, FilterService, SortMeta } from 'primeng/api';

import { Subject } from 'rxjs';

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

    filter(value: any[], filters: any, globalFilterFieldsArray: any[], filterLocale: string | undefined): any[] {
        if (!value || value.length === 0 || !filters || Object.keys(filters).length === 0) {
            return value;
        }

        let filteredValue = [];

        for (let i = 0; i < value.length; i++) {
            let localMatch = true;
            let globalMatch = false;
            let localFiltered = false;

            for (let prop in filters) {
                if (filters.hasOwnProperty(prop) && prop !== 'global') {
                    localFiltered = true;
                    let filterField = prop;
                    let filterMeta = filters[filterField];

                    if (Array.isArray(filterMeta)) {
                        for (let meta of filterMeta) {
                            localMatch = this.executeLocalFilter(filterField, value[i], meta, filterLocale);

                            if ((meta.operator === FilterOperator.OR && localMatch) || (meta.operator === FilterOperator.AND && !localMatch)) {
                                break;
                            }
                        }
                    } else {
                        localMatch = this.executeLocalFilter(filterField, value[i], <any>filterMeta, filterLocale);
                    }

                    if (!localMatch) {
                        break;
                    }
                }
            }

            if (filters['global'] && !globalMatch && globalFilterFieldsArray) {
                for (let j = 0; j < globalFilterFieldsArray.length; j++) {
                    let globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                    globalMatch = (<any>this.filterService).filters[(<any>filters['global']).matchMode](resolveFieldData(value[i], globalFilterField), (<FilterMetadata>filters['global']).value, filterLocale);

                    if (globalMatch) {
                        break;
                    }
                }
            }

            let matches: boolean;
            if (filters['global']) {
                matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
            } else {
                matches = localFiltered && localMatch;
            }

            if (matches) {
                filteredValue.push(value[i]);
            }
        }

        return filteredValue;
    }

    private executeLocalFilter(field: string, rowData: any, filterMeta: FilterMetadata, filterLocale: string | undefined): boolean {
        const filterValue = filterMeta.value;
        const filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
        const dataFieldValue = resolveFieldData(rowData, field);
        const filterConstraint = (<any>this.filterService).filters[filterMatchMode];

        return filterConstraint(dataFieldValue, filterValue, filterLocale);
    }
}
