export interface SelectItem<T = any> {
    label?: string;
    value: T;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
