import { SelectItem } from './selectitem';

export interface SelectItemGroup {
    label: string;
    value?: any;
    items: SelectItem[];
}