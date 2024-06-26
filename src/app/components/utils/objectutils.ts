export class ObjectUtils {
    public static isArray(value, empty = true) {
        return Array.isArray(value) && (empty || value.length !== 0);
    }

    public static isObject(value, empty = true) {
        return typeof value === 'object' && !Array.isArray(value) && value != null && (empty || Object.keys(value).length !== 0);
    }

    public static equals(obj1: any, obj2: any, field?: string): boolean {
        if (field) return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
        else return this.equalsByValue(obj1, obj2);
    }

    public static equalsByValue(obj1: any, obj2: any): boolean {
        if (obj1 === obj2) return true;

        if (obj1 && obj2 && typeof obj1 == 'object' && typeof obj2 == 'object') {
            var arrA = Array.isArray(obj1),
                arrB = Array.isArray(obj2),
                i,
                length,
                key;

            if (arrA && arrB) {
                length = obj1.length;
                if (length != obj2.length) return false;
                for (i = length; i-- !== 0; ) if (!this.equalsByValue(obj1[i], obj2[i])) return false;
                return true;
            }

            if (arrA != arrB) return false;

            var dateA = this.isDate(obj1),
                dateB = this.isDate(obj2);
            if (dateA != dateB) return false;
            if (dateA && dateB) return obj1.getTime() == obj2.getTime();

            var regexpA = obj1 instanceof RegExp,
                regexpB = obj2 instanceof RegExp;
            if (regexpA != regexpB) return false;
            if (regexpA && regexpB) return obj1.toString() == obj2.toString();

            var keys = Object.keys(obj1);
            length = keys.length;

            if (length !== Object.keys(obj2).length) return false;

            for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(obj2, keys[i])) return false;

            for (i = length; i-- !== 0; ) {
                key = keys[i];
                if (!this.equalsByValue(obj1[key], obj2[key])) return false;
            }

            return true;
        }

        return obj1 !== obj1 && obj2 !== obj2;
    }

    public static resolveFieldData(data: any, field: any): any {
        if (data && field) {
            if (this.isFunction(field)) {
                return field(data);
            } else if (field.indexOf('.') == -1) {
                return data[field];
            } else {
                let fields: string[] = field.split('.');
                let value = data;
                for (let i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        } else {
            return null;
        }
    }

    public static isFunction(obj: any) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }

    public static reorderArray(value: any[], from: number, to: number) {
        let target: number;
        if (value && from !== to) {
            if (to >= value.length) {
                to %= value.length;
                from %= value.length;
            }
            value.splice(to, 0, value.splice(from, 1)[0]);
        }
    }

    public static insertIntoOrderedArray(item: any, index: number, arr: any[], sourceArr: any[]): void {
        if (arr.length > 0) {
            let injected = false;
            for (let i = 0; i < arr.length; i++) {
                let currentItemIndex = this.findIndexInList(arr[i], sourceArr);
                if (currentItemIndex > index) {
                    arr.splice(i, 0, item);
                    injected = true;
                    break;
                }
            }

            if (!injected) {
                arr.push(item);
            }
        } else {
            arr.push(item);
        }
    }

    public static findIndexInList(item: any, list: any): number {
        let index: number = -1;

        if (list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i] == item) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    public static contains(value, list) {
        if (value != null && list && list.length) {
            for (let val of list) {
                if (this.equals(value, val)) return true;
            }
        }

        return false;
    }

    public static removeAccents(str) {
        if (str) {
            str = str.normalize('NFKD').replace(/\p{Diacritic}/gu, '');
        }

        return str;
    }

    public static isDate(input: any) {
        return Object.prototype.toString.call(input) === '[object Date]';
    }

    public static isEmpty(value) {
        return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0) || (!this.isDate(value) && typeof value === 'object' && Object.keys(value).length === 0);
    }

    public static isNotEmpty(value) {
        return !this.isEmpty(value);
    }

    public static compare(value1, value2, locale, order = 1) {
        let result = -1;
        const emptyValue1 = this.isEmpty(value1);
        const emptyValue2 = this.isEmpty(value2);

        if (emptyValue1 && emptyValue2) result = 0;
        else if (emptyValue1) result = order;
        else if (emptyValue2) result = -order;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, locale, { numeric: true });
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return result;
    }

    public static sort(value1, value2, order = 1, locale, nullSortOrder = 1) {
        const result = ObjectUtils.compare(value1, value2, locale, order);
        let finalSortOrder = order;

        // nullSortOrder == 1 means Excel like sort nulls at bottom
        if (ObjectUtils.isEmpty(value1) || ObjectUtils.isEmpty(value2)) {
            finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
        }

        return finalSortOrder * result;
    }

    public static merge(obj1?: any, obj2?: any): any {
        if (obj1 == undefined && obj2 == undefined) {
            return undefined;
        } else if ((obj1 == undefined || typeof obj1 === 'object') && (obj2 == undefined || typeof obj2 === 'object')) {
            return { ...(obj1 || {}), ...(obj2 || {}) };
        } else if ((obj1 == undefined || typeof obj1 === 'string') && (obj2 == undefined || typeof obj2 === 'string')) {
            return [obj1 || '', obj2 || ''].join(' ');
        }

        return obj2 || obj1;
    }

    public static isPrintableCharacter(char = '') {
        return this.isNotEmpty(char) && char.length === 1 && char.match(/\S| /);
    }

    public static getItemValue(obj, ...params) {
        return this.isFunction(obj) ? obj(...params) : obj;
    }

    public static findLastIndex(arr, callback) {
        let index = -1;

        if (this.isNotEmpty(arr)) {
            try {
                index = arr.findLastIndex(callback);
            } catch {
                index = arr.lastIndexOf([...arr].reverse().find(callback));
            }
        }

        return index;
    }

    public static findLast(arr, callback) {
        let item;

        if (this.isNotEmpty(arr)) {
            try {
                item = arr.findLast(callback);
            } catch {
                item = [...arr].reverse().find(callback);
            }
        }

        return item;
    }

    public static deepEquals(a, b) {
        if (a === b) return true;

        if (a && b && typeof a == 'object' && typeof b == 'object') {
            var arrA = Array.isArray(a),
                arrB = Array.isArray(b),
                i,
                length,
                key;

            if (arrA && arrB) {
                length = a.length;
                if (length != b.length) return false;
                for (i = length; i-- !== 0; ) if (!this.deepEquals(a[i], b[i])) return false;

                return true;
            }

            if (arrA != arrB) return false;

            var dateA = a instanceof Date,
                dateB = b instanceof Date;

            if (dateA != dateB) return false;
            if (dateA && dateB) return a.getTime() == b.getTime();

            var regexpA = a instanceof RegExp,
                regexpB = b instanceof RegExp;

            if (regexpA != regexpB) return false;
            if (regexpA && regexpB) return a.toString() == b.toString();

            var keys = Object.keys(a);

            length = keys.length;

            if (length !== Object.keys(b).length) return false;

            for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

            for (i = length; i-- !== 0; ) {
                key = keys[i];
                if (!this.deepEquals(a[key], b[key])) return false;
            }

            return true;
        }

        return a !== a && b !== b;
    }

    public static minifyCSS(css) {
        return css
            ? css
                  .replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '')
                  .replace(/ {2,}/g, ' ')
                  .replace(/ ([{:}]) /g, '$1')
                  .replace(/([;,]) /g, '$1')
                  .replace(/ !/g, '!')
                  .replace(/: /g, ':')
            : css;
    }

    public static toFlatCase(str: string) {
        // convert snake, kebab, camel and pascal cases to flat case
        return this.isString(str) ? str.replace(/(-|_)/g, '').toLowerCase() : str;
    }

    public static isString(value: any, empty: boolean = true) {
        return typeof value === 'string' && (empty || value !== '');
    }
}
