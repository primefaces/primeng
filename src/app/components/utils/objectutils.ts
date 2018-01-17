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

    public equalsByValue(obj1: any, obj2: any, visited?: any[]): boolean {
        if (obj1 == null && obj2 == null) {
            return true;
        }
        if (obj1 == null || obj2 == null) {
            return false;
        }

        if (obj1 == obj2) {
            return true;
        }

        if (typeof obj1 == 'object' && typeof obj2 == 'object') {
            if (visited) {
                if (visited.indexOf(obj1) !== -1) return false;
            } else {
                visited = [];
            }
            visited.push(obj1);

            for (var p in obj1) {
                if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
                    return false;
                }

                switch (typeof (obj1[p])) {
                    case 'object':
                        if (!this.equalsByValue(obj1[p], obj2[p], visited)) return false;
                        break;

                    case 'function':
                        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
                        break;

                    default:
                        if (obj1[p] != obj2[p]) return false;
                        break;
                }
            }

            for (var p in obj2) {
                if (typeof (obj1[p]) == 'undefined') return false;
            }

            delete obj1._$visited;
            return true;
        }

        return false;
    }

    resolveFieldData(data: any, field: string): any {
        if(data && field) {
            if(field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields: string[] = field.split('.');
                let value = data;
                for(var i = 0, len = fields.length; i < len; ++i) {
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

    filter(value: any[], fields: any[], filterValue: string) {
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

    reorderArray(value: any[], from: number, to: number) {
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

    generateSelectItems(val: any[], field: string): SelectItem[] {
        let selectItems: SelectItem[];
        if(val && val.length) {
            selectItems = [];
            for(let item of val) {
                selectItems.push({label: this.resolveFieldData(item, field), value: item});
            }
        }

        return selectItems;
    }

    insertIntoOrderedArray(item: any, index: number, arr: any[], sourceArr: any[]): void {
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

    findIndexInList(item: any, list: any): number {
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
