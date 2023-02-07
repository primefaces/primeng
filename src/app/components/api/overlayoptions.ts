import { AnimationEvent } from '@angular/animations';

export type OverlayModeType = 'modal' | 'overlay' | undefined;

export type ResponsiveOverlayDirectionType = 'center' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | undefined;

export interface OverlayListenerOptions {
    type?: 'scroll' | 'outside' | 'resize' | undefined;
    mode?: OverlayModeType;
    valid?: boolean;
}

export interface ResponsiveOverlayOptions {
    style?: any;
    styleClass?: string;
    contentStyle?: any;
    contentStyleClass?: string;
    breakpoint?: string;
    media?: string;
    direction?: ResponsiveOverlayDirectionType;
}

export interface OverlayOnShowEvent {
    overlay?: HTMLElement | undefined;
    target?: HTMLElement | undefined;
    mode?: OverlayModeType;
}

export interface OverlayOnBeforeShowEvent extends OverlayOnShowEvent {}

export interface OverlayOnBeforeHideEvent extends OverlayOnBeforeShowEvent {}

export interface OverlayOnHideEvent extends OverlayOnShowEvent {}

export interface OverlayOptions {
    mode?: OverlayModeType;
    style?: any;
    styleClass?: string;
    contentStyle?: any;
    contentStyleClass?: string;
    target?: any;
    appendTo?: 'body' | HTMLElement | undefined;
    autoZIndex?: boolean;
    baseZIndex?: number;
    showTransitionOptions?: string;
    hideTransitionOptions?: string;
    hideOnEscape?: boolean;
    listener?: (event: Event, options?: OverlayListenerOptions) => boolean | void;
    responsive?: ResponsiveOverlayOptions | undefined;
    onBeforeShow?: (event?: OverlayOnBeforeShowEvent) => void;
    onShow?: (event?: OverlayOnShowEvent) => void;
    onBeforeHide?: (event?: OverlayOnBeforeHideEvent) => void;
    onHide?: (event?: OverlayOnHideEvent) => void;
    onAnimationStart?: (event?: AnimationEvent) => void;
    onAnimationDone?: (event?: AnimationEvent) => void;
}
