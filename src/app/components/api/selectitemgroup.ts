import { SelectItem } from './selectitem';
/**
 * Represents a group of select items.
 * @group Interface
 */
export interface SelectItemGroup<T = any> {
    label: string;
    value?: any;
    items: SelectItem<T>[];
}
