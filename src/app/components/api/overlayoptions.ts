import { AnimationEvent } from '@angular/animations';

export type OverlayModeType = 'modal' | 'overlay' | undefined;

export type ResponsiveOverlayDirectionType = 'start' | 'center' | 'end' | undefined;

export interface OverlayListenerOptions {
    type?: 'scroll' | 'outside' | 'resize' | undefined;
    mode?: OverlayModeType;
    valid?: boolean;
}

export interface ResponsiveOverlayOptions {
    style?: any;
    styleClass?: string;
    breakpoint?: string;
    media?: string;
    direction?: ResponsiveOverlayDirectionType;
}

export interface OverlayOnShowEvent {
    container?: HTMLElement | undefined;
    target?: HTMLElement | undefined;
    mode?: OverlayModeType;
}

export interface OverlayOnHideEvent extends OverlayOnShowEvent {}

export interface OverlayOptions {
    style?: any;
    styleClass?: string;
    appendTo?: 'body' | HTMLElement | undefined;
    autoZIndex?: boolean;
    baseZIndex?: number;
    showTransitionOptions?: string;
    hideTransitionOptions?: string;
    listener?: (event: Event, options?: OverlayListenerOptions) => boolean | void;
    responsive?: ResponsiveOverlayOptions | undefined;
    onShow?: (event?: OverlayOnShowEvent) => void;
    onHide?: (event?: OverlayOnHideEvent) => void;
    onAnimationStart?: (event?: AnimationEvent) => void;
    onAnimationDone?: (event?: AnimationEvent) => void;
}
