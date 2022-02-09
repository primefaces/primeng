export class DynamicDialogConfig {
	data?: any;
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
	modal?: boolean;
    draggable?: boolean = true;
    minX?: number = 0;
    minY?: number = 0;
    keepInViewport?: boolean = true;
}
