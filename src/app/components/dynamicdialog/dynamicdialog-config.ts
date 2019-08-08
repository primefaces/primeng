export class DynamicDialogConfig {
	data?: any;
	footer?: string = '';
	visible?: boolean;
	header?: string = '';
	draggable?: boolean = true;
	resizable?: boolean = true;
	positionLeft?: number;
	positionTop?: number;
	contentStyle?: any;
	modal?: boolean;
	closeOnEscape?: boolean = true;
	dismissableMask?: boolean;
	rtl?: boolean;
	closable?: boolean = true;
	responsive?: boolean = true;
	appendTo?: any;
	style?: any;
	styleClass?: string = '';
	showHeader?: boolean = true;
	breakpoint?: number = 640;
	blockScroll?: boolean = false;
	autoZIndex?: boolean = true;
	baseZIndex?: number = 0;
	minX?: number = 0;
	minY?: number = 0;
	focusOnShow?: boolean = true;
	maximizable?: boolean;
	focusTrap?: boolean = true;
	transitionOptions?: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
	closeIcon?: string = 'pi pi-times';
	minimizeIcon?: string = 'pi pi-window-minimize';
	maximizeIcon?: string = 'pi pi-window-maximize';
	width?: string = ''
	height?: string = ''
}
