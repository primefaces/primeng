import { Injectable } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

@Injectable({providedIn: 'root'})
export class FilterService {

    filter(value: any[], fields: any[], filterValue: any, filterMatchMode: string, filterLocale?: string) {
        let filteredItems: any[] = [];

        if (value) {
            for (let item of value) {
                for (let field of fields) {
                    let fieldValue = ObjectUtils.resolveFieldData(item, field);

                    if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                        filteredItems.push(item);
                        break;
                    }
                }
            }
        }

        return filteredItems;
    }
    
    public filters = {
        startsWith: (value, filter, filterLocale?):boolean =>  {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
    
            return stringValue.slice(0, filterValue.length) === filterValue;
        },

        contains: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
    
            return stringValue.indexOf(filterValue) !== -1;
        },

        notContains: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
    
            return stringValue.indexOf(filterValue) === -1;
        },

        endsWith: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
    
            return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
        },

        equals: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() === filter.getTime();
            else
                return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        },

        notEquals: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return false;
            }
    
            if (value === undefined || value === null) {
                return true;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() !== filter.getTime();
            else
                return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        },

        in: (value, filter: any[]):boolean => {
            if (filter === undefined || filter === null || filter.length === 0) {
                return true;
            }
    
            for (let i = 0; i < filter.length; i++) {
                if (ObjectUtils.equals(value, filter[i])) {
                    return true;
                }
            }
    
            return false;
        },

        between: (value, filter: any[]):boolean => {
            if (filter == null || filter[0] == null || filter[1] == null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime)
            return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
            else
                return filter[0] <= value && value <= filter[1];
        },

        lt: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() < filter.getTime();
            else
                return value < filter;
        },

        lte: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() <= filter.getTime();
            else
                return value <= filter;
        },

        gt: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() > filter.getTime();
            else
                return value > filter;
        },

        gte: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() >= filter.getTime();
            else
                return value >= filter;
        },

        is: (value, filter, filterLocale?):boolean => {
            return this.filters.equals(value, filter, filterLocale);
        },

        isNot: (value, filter, filterLocale?): boolean => {
            return this.filters.notEquals(value, filter, filterLocale);
        },

        before: (value, filter, filterLocale?): boolean => {
            return this.filters.lt(value, filter, filterLocale);
        },

        after: (value, filter, filterLocale?): boolean => {
            return this.filters.gt(value, filter, filterLocale);
        },

        dateIs: (value, filter): boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }

            return value.toDateString() === filter.toDateString();
        },

        dateIsNot: (value, filter): boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }

            return value.toDateString() !== filter.toDateString();
        },

        dateBefore: (value, filter): boolean =>  {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }

            return value.getTime() < filter.getTime();
        },

        dateAfter: (value, filter): boolean =>  {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }

            return value.getTime() > filter.getTime();
        }
    
    }

    register(rule: string, fn: Function) {
        this.filters[rule] = fn;
    }
}