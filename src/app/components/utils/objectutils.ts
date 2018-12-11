import {Injectable} from '@angular/core';
import {SelectItem} from '../common/selectitem';

@Injectable()
export class ObjectUtils {

    public equals(obj1: any, obj2: any, field?: string): boolean {
        if (field)
            return (this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field));
        else
            return this.equalsByValue(obj1, obj2);
    }

    public equalsByValue(obj1: any, obj2: any): boolean {
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

    public resolveFieldData(data: any, field: any): any {
        if(data && field) {
            if (this.isFunction(field)) {
                return field(data);
            }
            else if(field.indexOf('.') == -1) {
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

    private isFunction = (obj: any) => !!(obj && obj.constructor && obj.call && obj.apply);

    public filter(value: any[], fields: any[], filterValue: string) {
        let filteredItems: any[] = [];

        if(value) {
            for(let item of value) {
                for(let field of fields) {
                    if(String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                        filteredItems.push(item);
                        break;
                    }
                }
            }
        }

        return filteredItems;
    }

    public reorderArray(value: any[], from: number, to: number) {
        let target: number;
        if(value && (from !== to)) {
            if(to >= value.length) {
                target = to - value.length;
                while((target--) + 1) {
                    value.push(undefined);
                }
            }
            value.splice(to, 0, value.splice(from, 1)[0]);
        }
    }

    public generateSelectItems(val: any[], field: string): SelectItem[] {
        let selectItems: SelectItem[];
        if(val && val.length) {
            selectItems = [];
            for(let item of val) {
                selectItems.push({label: this.resolveFieldData(item, field), value: item});
            }
        }

        return selectItems;
    }

    public insertIntoOrderedArray(item: any, index: number, arr: any[], sourceArr: any[]): void {
        if(arr.length > 0) {
            let injected = false;
            for(let i = 0; i < arr.length; i++) {
                let currentItemIndex = this.findIndexInList(arr[i], sourceArr);
                if(currentItemIndex > index) {
                    arr.splice(i, 0, item);
                    injected = true;
                    break;
                }
            }

            if(!injected) {
                arr.push(item);
            }
        }
        else {
            arr.push(item);
        }
    }

    public findIndexInList(item: any, list: any): number {
        let index: number = -1;

        if(list) {
            for(let i = 0; i < list.length; i++) {
                if(list[i] == item) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }
}
