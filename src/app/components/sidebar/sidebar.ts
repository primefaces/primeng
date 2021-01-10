import {NgModule,Component,AfterViewInit,AfterViewChecked,OnDestroy,Input,Output,EventEmitter,ViewChild,ElementRef,Renderer2,ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, QueryList, AfterContentInit, TemplateRef, ChangeDetectorRef} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {RippleModule} from 'primeng/ripple';
import {DomHandler} from 'primeng/dom';
import {PrimeTemplate} from 'primeng/api';

@Component({
    selector: 'p-sidebar',
    template: `
        <div #container [ngClass]="{'p-sidebar':true, 'p-sidebar-active': visible,
            'p-sidebar-left': (position === 'left'), 'p-sidebar-right': (position === 'right'),
            'p-sidebar-top': (position === 'top'), 'p-sidebar-bottom': (position === 'bottom'),
            'p-sidebar-full': fullScreen}"
            [@panelState]="visible ? 'visible' : 'hidden'" (@panelState.start)="onAnimationStart($event)" [ngStyle]="style" [class]="styleClass"  role="complementary" [attr.aria-modal]="modal">
            <div class="p-sidebar-content">
                <button type="button" class="p-sidebar-close p-link" *ngIf="showCloseIcon" (click)="close($event)" (keydown.enter)="close($event)" [attr.aria-label]="ariaCloseLabel" pRipple>
                    <span class="p-sidebar-close-icon pi pi-times"></span>
                </button>
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
        </div>
    `,
    animations: [
        trigger('panelState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('300ms ease-in')),
            transition('hidden => visible', animate('300ms ease-out'))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./sidebar.css']
})
export class Sidebar implements AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy {

    @Input() position: string = 'left';

    @Input() fullScreen: boolean;

    @Input() appendTo: string;

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

    @ViewChild('container') containerViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange:EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    _visible: boolean;

    preventVisibleChangePropagation: boolean;

    mask: HTMLDivElement;

    maskClickListener: Function;

    documentEscapeListener: Function;

    executePostDisplayActions: boolean;

    contentTemplate: TemplateRef<any>;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.initialized = true;

        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }

        if (this.visible) {
            this.show();
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
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

    set visible(val:boolean) {
        this._visible = val;

        if (this.initialized && this.containerViewChild && this.containerViewChild.nativeElement) {
            if (this._visible)
                this.show();
            else {
                if (this.preventVisibleChangePropagation)
                    this.preventVisibleChangePropagation = false;
                else
                    this.hide();
            }
        }
    }

    ngAfterViewChecked() {
        if (this.executePostDisplayActions) {
            this.onShow.emit({});
            this.executePostDisplayActions = false;
        }
    }

    show() {
        this.executePostDisplayActions = true;
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }

        if (this.modal) {
            this.enableModality();
        }
    }

    hide() {
        this.onHide.emit({});

        if (this.modal) {
            this.disableModality();
        }
    }

    close(event: Event) {
        this.preventVisibleChangePropagation = true;
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    }

    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            DomHandler.addMultipleClasses(this.mask, 'p-component-overlay p-sidebar-mask');

            if (this.dismissible){
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
            this.unbindMaskClickListener();
            document.body.removeChild(this.mask);
            if (this.blockScroll) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
            this.mask = null;
        }
    }

    onAnimationStart(event){
        switch(event.toState) {
            case 'visible':
                if (this.closeOnEscape) {
                    this.bindDocumentEscapeListener();
                }
            break;

            case 'hidden':
                this.unbindGlobalListeners();
            break;
        }
    }

    bindDocumentEscapeListener() {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.containerViewChild.nativeElement.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
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

    ngOnDestroy() {
        this.initialized = false;

        if (this.visible) {
            this.hide();
        }

        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }

		this.unbindGlobalListeners();
    }
}

@NgModule({
    imports: [CommonModule,RippleModule],
    exports: [Sidebar],
    declarations: [Sidebar]
})
export class SidebarModule { }
