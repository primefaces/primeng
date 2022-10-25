import { AnimationEvent } from '@angular/animations';

export interface OverlayOptions {
    style?: any;
    styleClass?: string;
    appendTo?: 'body' | HTMLElement | undefined;
    autoZIndex?: boolean;
    baseZIndex?: number;
    showTransitionOptions?: string;
    hideTransitionOptions?: string;
    listener?: any;
    responsive?: ResponsiveOverlayOptions | undefined;
    onShow?: (event?: OverlayOnShowEvent) => void;
    onHide?: (event?: OverlayOnHideEvent) => void;
    onAnimationStart?: (event?: AnimationEvent) => void;
    onAnimationDone?: (event?: AnimationEvent) => void;
}

export type ResponsiveOverlayDirectionType = 'start' | 'center' | 'end' | undefined;

export interface ResponsiveOverlayOptions {
    style?: any;
    styleClass?: string;
    breakpoint?: string;
    media?: string;
    direction?: ResponsiveOverlayDirectionType;
}

export type OverlayModeType = 'modal' | 'overlay' | undefined;

export interface OverlayOnShowEvent {
    container?: HTMLElement | undefined;
    target?: HTMLElement | undefined;
    mode?: OverlayModeType;
}

export interface OverlayOnHideEvent extends OverlayOnShowEvent {}
