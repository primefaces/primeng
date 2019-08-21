import { ObjectUtils } from '../utils/objectutils';

export class FilterUtils {

    public static filter(value: any[], fields: any[], filterValue: any, filterMatchMode: string) {
        let filteredItems: any[] = [];
        let sanitizedFilterText = filterValue;

        if (sanitizedFilterText) {
            if (Object.prototype.toString.call(filterValue) === '[object Array]') {
                sanitizedFilterText = (sanitizedFilterText as any[]).map(x => this.sanitizeForFiltering(x));
            } else {
                sanitizedFilterText = this.sanitizeForFiltering(sanitizedFilterText);
            }
        }

        if (value) {
            for (let item of value) {
                for (let field of fields) {
                    const fieldValue = ObjectUtils.resolveFieldData(item, field);
                    let sanitizedFieldValue = fieldValue;

                    if (Object.prototype.toString.call(fieldValue) === '[object Array]') {
                        sanitizedFieldValue = (fieldValue as any[]).map(x => this.sanitizeForFiltering(String(x)));
                    } else {
                        sanitizedFieldValue = this.sanitizeForFiltering(String(fieldValue));
                    }

                    if (FilterUtils[filterMatchMode](sanitizedFieldValue, sanitizedFilterText)) {
                        filteredItems.push(item);
                        break;
                    }
                }
            }
        }

        return filteredItems;
    }

    private static sanitizeForFiltering(value: any): any {
        const isValueString  = Object.prototype.toString.call(value) === '[object String]';

        if (isValueString) {
            return ObjectUtils.removeAccents(value).toLowerCase();
        }

        return value;
    }

    public static startsWith(value, filter): boolean {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        let filterValue = ObjectUtils.removeAccents(filter.toString()).toLowerCase();
        let stringValue = ObjectUtils.removeAccents(value.toString()).toLowerCase();

        return stringValue.slice(0, filterValue.length) === filterValue;
    }

    public static contains(value, filter): boolean {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        let filterValue = ObjectUtils.removeAccents(filter.toString()).toLowerCase();
        let stringValue = ObjectUtils.removeAccents(value.toString()).toLowerCase();

        return stringValue.indexOf(filterValue) !== -1;
    }

    public static endsWith(value, filter): boolean {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        let filterValue = ObjectUtils.removeAccents(filter.toString()).toLowerCase();
        let stringValue = ObjectUtils.removeAccents(value.toString()).toLowerCase();

        return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    }

    public static equals(value, filter): boolean {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        if (value.getTime && filter.getTime)
            return value.getTime() === filter.getTime();
        else
            return ObjectUtils.removeAccents(value.toString()).toLowerCase() == ObjectUtils.removeAccents(filter.toString()).toLowerCase();
    }

    public static notEquals(value, filter): boolean {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return false;
        }

        if (value === undefined || value === null) {
            return true;
        }

        if (value.getTime && filter.getTime)
            return value.getTime() !== filter.getTime();
        else
            return ObjectUtils.removeAccents(value.toString()).toLowerCase() != ObjectUtils.removeAccents(filter.toString()).toLowerCase();
    }

    public static in(value: any, filter: any[]): boolean {
        if (filter === undefined || filter === null || filter.length === 0) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        for (let i = 0; i < filter.length; i++) {
            if (filter[i] === value || (value.getTime && filter[i].getTime && value.getTime() === filter[i].getTime())) {
                return true;
            }
        }

        return false;
    }

    public static containsAny(values: any[], filters: any[]): boolean {
        if (filters === undefined || filters === null || filters.length === 0) {
            return true;
        }

        if (values === undefined || values === null || values.length === 0) {
            return false;
        }

        for (const value of values) {
            if (this.in(value, filters)) {
                return true;
            }
        }

        return false;
    }

    public static lt(value, filter): boolean {
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
    }
    
    public static lte(value, filter): boolean {
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
    }

    public static gt(value, filter): boolean {
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
    }
    
    public static gte(value, filter): boolean {
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
    }
}
