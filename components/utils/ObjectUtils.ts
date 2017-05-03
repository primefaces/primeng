import {Injectable} from '@angular/core';

@Injectable()
export class ObjectUtils {
    
    public equals(obj1: any, obj2: any, field?: string): boolean {
        if(field)
            return (this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field));
        else
            return this.equalsByValue(obj1, obj2);
    }
    
    public equalsByValue(obj1: any, obj2: any): boolean {
        if (obj1 == null && obj2 == null) {
            return true;
        }
        if (obj1 == null || obj2 == null) {
            return false;
        }

        if (obj1 == obj2) {
            delete obj1._$visited;
            return true;
        }

        if (typeof obj1 == 'object' && typeof obj2 == 'object') {
            obj1._$visited = true;
            for (var p in obj1) {
                if (p === "_$visited") continue;
                if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
                    return false;
                }

                switch (typeof (obj1[p])) {
                    case 'object':
                        if (obj1[p] && obj1[p]._$visited || !this.equals(obj1[p], obj2[p])) return false;
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
    
    public resolveFieldData(data: any, field: string): any {
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

    /**
     * Retrieves the property value from the item.
     * If the property is falsy, then the entire item will be returned.
     * The property can be a dot-separated path.
     * 
     * @param item - The item whose property value will be returned.
     * @param property - A property name or a dot-separated path of property names.
     * @returns The property value retrieved from the item or the entire item if the property is falsy.
     */
    public resolveProperty(item: Object, property: string): any {
        return !property ? item : this.resolveFieldData(item, property);
    }
}
