import { ElementRef, Renderer2, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
export declare class Lightbox implements AfterViewInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    private cd;
    images: any[];
    type: string;
    style: any;
    styleClass: string;
    appendTo: any;
    easing: 'ease-out';
    effectDuration: any;
    autoZIndex: boolean;
    baseZIndex: number;
    closeOnEscape: boolean;
    visible: boolean;
    loading: boolean;
    currentImage: any;
    captionText: string;
    zindex: any;
    panel: any;
    index: number;
    mask: any;
    preventDocumentClickListener: boolean;
    documentClickListener: any;
    documentEscapeListener: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    onImageClick(event: any, image: any, i: any, content: any): void;
    ngAfterViewInit(): void;
    onLinkClick(event: any, content: any): void;
    displayImage(image: any): void;
    show(): void;
    hide(event: any): void;
    center(): void;
    onImageLoad(event: any, content: any): void;
    prev(placeholder: any): void;
    next(placeholder: any): void;
    bindGlobalListeners(): void;
    unbindGlobalListeners(): void;
    get leftVisible(): boolean;
    get rightVisible(): boolean;
    ngOnDestroy(): void;
}
export declare class LightboxModule {
}
