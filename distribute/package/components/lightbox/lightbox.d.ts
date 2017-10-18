import { ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Lightbox implements AfterViewInit, OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    images: any[];
    type: string;
    style: any;
    styleClass: string;
    appendTo: any;
    easing: 'ease-out';
    effectDuration: any;
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
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
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
    readonly leftVisible: boolean;
    readonly rightVisible: boolean;
    ngOnDestroy(): void;
}
export declare class LightboxModule {
}
