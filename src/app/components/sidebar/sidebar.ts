import { NgModule, Component, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ElementRef, Renderer2, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, QueryList, AfterContentInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { trigger, style, transition, animate, animation, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { DomHandler } from 'primeng/dom';
import { PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { ZIndexUtils } from 'primeng/utils';

const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}')
]);

const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);

@Component({
    selector: 'p-sidebar',
    template: `
        <div #container [ngClass]="{'p-sidebar':true, 'p-sidebar-active': visible,
            'p-sidebar-left': (position === 'left' && !fullScreen), 'p-sidebar-right': (position === 'right' && !fullScreen),
            'p-sidebar-top': (position === 'top' && !fullScreen), 'p-sidebar-bottom': (position === 'bottom' && !fullScreen),
            'p-sidebar-full': fullScreen}"  *ngIf="visible" [@panelState]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@panelState.start)="onAnimationStart($event)" (@panelState.done)="onAnimationEnd($event)" [ngStyle]="style" [class]="styleClass"  role="complementary" [attr.aria-modal]="modal">
            <div class="p-sidebar-header">
                <button type="button" class="p-sidebar-close p-sidebar-icon p-link" (click)="close($event)" (keydown.enter)="close($event)" [attr.aria-label]="ariaCloseLabel"  *ngIf="showCloseIcon" pRipple>
                    <span class="p-sidebar-close-icon pi pi-times"></span>
                </button>
            </div>
            <div class="p-sidebar-content">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
        </div>
    `,
    animations: [
        trigger('panelState', [
            transition('void => visible', [
                useAnimation(showAnimation)
            ]),
            transition('visible => void', [
                useAnimation(hideAnimation)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./sidebar.css'],
    host: {
        'class': 'p-element'
    }
})
export class Sidebar implements AfterViewInit, AfterContentInit, OnDestroy {

    @Input() appendTo: any;

    @Input() blockScroll: boolean = false;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() ariaCloseLabel: string;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() modal: boolean = true;

    @Input() dismissible: boolean = true;

    @Input() showCloseIcon: boolean = true;

    @Input() closeOnEscape: boolean = true;

    @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    _visible: boolean;

    _position: string = "left";

    _fullScreen: boolean = false;

    container: HTMLDivElement;

    transformOptions: any = "translate3d(-100%, 0px, 0px)";

    mask: HTMLDivElement;

    maskClickListener: Function;

    documentEscapeListener: Function;

    animationEndListener: any;

    contentTemplate: TemplateRef<any>;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public config: PrimeNGConfig) { }

    ngAfterViewInit() {
        this.initialized = true;
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    @Input() get visible(): boolean {
        return this._visible;
    }

    set visible(val: boolean) {
        this._visible = val;
    }

    @Input() get position(): string {
        return this._position;
    };

    set position(value: string) {
        this._position = value;

        switch (value) {
            case 'left':
                this.transformOptions = "translate3d(-100%, 0px, 0px)";
                break;
            case 'right':
                this.transformOptions = "translate3d(100%, 0px, 0px)";
                break;
            case 'bottom':
                this.transformOptions = "translate3d(0px, 100%, 0px)";
                break;
            case 'top':
                this.transformOptions = "translate3d(0px, -100%, 0px)";
                break;
        }
    }

    @Input() get fullScreen(): boolean {
        return this._fullScreen;
    }

    set fullScreen(value: boolean) {
        this._fullScreen = value;

        if (value)
            this.transformOptions = "none";
    }

    show() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex || this.config.zIndex.modal);
        }

        if (this.modal) {
            this.enableModality();
        }

        this.onShow.emit({});
        this.visibleChange.emit(true);
    }

    hide() {
        this.onHide.emit({});

        if (this.modal) {
            this.disableModality();
        }
    }

    close(event: Event) {
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    }

    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
            DomHandler.addMultipleClasses(this.mask, 'p-component-overlay p-sidebar-mask p-component-overlay p-component-overlay-enter');

            if (this.dismissible) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', (event: any) => {
                    if (this.dismissible) {
                        this.close(event);
                    }
                });
            }

            document.body.appendChild(this.mask);
            if (this.blockScroll) {
                DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
        }
    }

    disableModality() {
        if (this.mask) {
            DomHandler.addClass(this.mask, 'p-component-overlay-leave');
            this.animationEndListener = this.destroyModal.bind(this);
            this.mask.addEventListener('animationend', this.animationEndListener);
        }
    }

    destroyModal() {
        this.unbindMaskClickListener();

        if (this.mask) {
            document.body.removeChild(this.mask);
        }

        if (this.blockScroll) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }

        this.unbindAnimationEndListener();
        this.mask = null;
    }

    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.appendContainer();
                this.show();

                if (this.closeOnEscape) {
                    this.bindDocumentEscapeListener();
                }
                break;
        }
    }

    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.hide();
                ZIndexUtils.clear(this.container);
                this.unbindGlobalListeners();
            break;
        }
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }

    bindDocumentEscapeListener() {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
                    this.close(event);
                }
            }
        });
    }

    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    unbindGlobalListeners() {
        this.unbindMaskClickListener();
        this.unbindDocumentEscapeListener();
    }

    unbindAnimationEndListener() {
        if (this.animationEndListener && this.mask) {
            this.mask.removeEventListener('animationend', this.animationEndListener);
            this.animationEndListener = null;
        }
    }

    ngOnDestroy() {
        this.initialized = false;

        if (this.visible && this.modal) {
            this.destroyModal();
        }

        if (this.appendTo && this.container) {
            this.el.nativeElement.appendChild(this.container);
        }

        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }

        this.container = null;
        this.unbindGlobalListeners();
        this.unbindAnimationEndListener();
    }
}

@NgModule({
    imports: [CommonModule, RippleModule],
    exports: [Sidebar],
    declarations: [Sidebar]
})
export class SidebarModule { }
