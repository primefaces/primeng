export class DynamicDialogConfig<D = any> {
    data?: D;
    header?: string;
    footer?: string;
    width?: string;
    height?: string;
    closeOnEscape?: boolean;
    baseZIndex?: number;
    autoZIndex?: boolean;
    dismissableMask?: boolean;
    rtl?: boolean;
    style?: any;
    contentStyle?: any;
    styleClass?: string;
    transitionOptions?: string;
    closable?: boolean;
    showHeader?: boolean;
}
