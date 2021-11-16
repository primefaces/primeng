export class ObjectUtils {

    public static equals(obj1: any, obj2: any, field?: string): boolean {
        if (field)
            return (this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field));
        else
            return this.equalsByValue(obj1, obj2);
    }

    public static equalsByValue(obj1: any, obj2: any): boolean {
        if (obj1 === obj2) return true;

        if (obj1 && obj2 && typeof obj1 == 'object' && typeof obj2 == 'object') {
            var arrA = Array.isArray(obj1)
                , arrB = Array.isArray(obj2)
                , i
                , length
                , key;

            if (arrA && arrB) {
                length = obj1.length;
                if (length != obj2.length) return false;
                for (i = length; i-- !== 0;)
                    if (!this.equalsByValue(obj1[i], obj2[i])) return false;
                return true;
            }

            if (arrA != arrB) return false;

            var dateA = obj1 instanceof Date
                , dateB = obj2 instanceof Date;
            if (dateA != dateB) return false;
            if (dateA && dateB) return obj1.getTime() == obj2.getTime();

            var regexpA = obj1 instanceof RegExp
                , regexpB = obj2 instanceof RegExp;
            if (regexpA != regexpB) return false;
            if (regexpA && regexpB) return obj1.toString() == obj2.toString();

            var keys = Object.keys(obj1);
            length = keys.length;

            if (length !== Object.keys(obj2).length)
                return false;

            for (i = length; i-- !== 0;)
                if (!Object.prototype.hasOwnProperty.call(obj2, keys[i])) return false;

            for (i = length; i-- !== 0;) {
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
            }
            else if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields: string[] = field.split('.');
                let value = data;
                for(let i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
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
            for(let i = 0; i < arr.length; i++) {
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
        }
        else {
            arr.push(item);
        }
    }

    public static findIndexInList(item: any, list: any): number {
        let index: number = -1;

        if (list) {
            for(let i = 0; i < list.length; i++) {
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
                if (this.equals(value, val))
                    return true;
            }
        }

        return false;
    }

    public static removeAccents(str) {
        if (str && str.search(/[\xC0-\xFF]/g) > -1) {
            str = str
                    .replace(/[\xC0-\xC5]/g, "A")
                    .replace(/[\xC6]/g, "AE")
                    .replace(/[\xC7]/g, "C")
                    .replace(/[\xC8-\xCB]/g, "E")
                    .replace(/[\xCC-\xCF]/g, "I")
                    .replace(/[\xD0]/g, "D")
                    .replace(/[\xD1]/g, "N")
                    .replace(/[\xD2-\xD6\xD8]/g, "O")
                    .replace(/[\xD9-\xDC]/g, "U")
                    .replace(/[\xDD]/g, "Y")
                    .replace(/[\xDE]/g, "P")
                    .replace(/[\xE0-\xE5]/g, "a")
                    .replace(/[\xE6]/g, "ae")
                    .replace(/[\xE7]/g, "c")
                    .replace(/[\xE8-\xEB]/g, "e")
                    .replace(/[\xEC-\xEF]/g, "i")
                    .replace(/[\xF1]/g, "n")
                    .replace(/[\xF2-\xF6\xF8]/g, "o")
                    .replace(/[\xF9-\xFC]/g, "u")
                    .replace(/[\xFE]/g, "p")
                    .replace(/[\xFD\xFF]/g, "y");
        }

        return str;
      }
}
