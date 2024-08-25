import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    numberAttribute
} from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { ButtonModule } from '../button/button';
import { ButtonProps } from '../button/button.interface';
import { BaseComponent } from 'primeng/basecomponent';
import { DrawerStyle } from './style/drawerstyle';

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}')]);

const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);
/**
 * Drawer is a container component displayed as an overlay.
 * @group Components
 */
@Component({
    selector: 'p-drawer',
    template: `
        <div
            #maskRef
            *ngIf="visible"
            [ngClass]="cx('mask')"
            [ngStyle]="sx('mask')"
            [style]="maskStyle"
            [@panelState]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
            (@panelState.start)="onAnimationStart($event)"
            (@panelState.done)="onAnimationEnd($event)"
            [attr.data-pc-name]="'mask'"
            [attr.data-pc-section]="'mask'"
            (click)="maskClickListener($event)"
        >
            <div [ngClass]="cx('root')" [class]="styleClass" [attr.data-pc-section]="'root'" (keydown)="onKeyDown($event)">
                <ng-container *ngTemplateOutlet="_headlessTemplate || notHeadless"></ng-container>
                <ng-template #notHeadless>
                    <div [ngClass]="cx('header')" [attr.data-pc-section]="'header'">
                        <ng-container *ngTemplateOutlet="_headerTemplate"></ng-container>
                        <p-button
                            *ngIf="showCloseIcon"
                            [ngClass]="cx('closeButton')"
                            (onClick)="close($event)"
                            (keydown.enter)="close($event)"
                            [buttonProps]="closeButtonProps"
                            [ariaLabel]="ariaCloseLabel"
                            [attr.data-pc-section]="'closebutton'"
                            [attr.data-pc-group-section]="'iconcontainer'"
                        >
                            <TimesIcon *ngIf="!closeIconTemplate" [attr.data-pc-section]="'closeicon'" />
                            <span *ngIf="closeIconTemplate" class="p-sidebar-close-icon" [attr.data-pc-section]="'closeicon'">
                                <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                            </span>
                        </p-button>
                    </div>

                    <div [ngClass]="cx('content')" [attr.data-pc-section]="'content'">
                        <ng-content></ng-content>
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </div>

                    <ng-container *ngIf="footerTemplate">
                        <div [ngClass]="cx('footer')" [attr.data-pc-section]="'footer'">
                            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                        </div>
                    </ng-container>
                </ng-template>
            </div>
        </div>
    `,
    animations: [trigger('panelState', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DrawerStyle]
})
export class Drawer extends BaseComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    /**
     *  Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any = 'body';
    /**
     * Whether to block scrolling of the document when drawer is active.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) blockScroll: boolean = false;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Aria label of the close icon.
     * @group Props
     */
    @Input() ariaCloseLabel: string | undefined;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input({ transform: numberAttribute }) baseZIndex: number = 0;
    /**
     * Whether an overlay mask is displayed behind the drawer.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) modal: boolean = true;
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() closeButtonProps: ButtonProps;
    /**
     * Whether to dismiss drawer on click of the mask.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) dismissible: boolean = true;
    /**
     * Whether to display the close icon.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showCloseIcon: boolean = true;
    /**
     * Specifies if pressing escape key should hide the drawer.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) closeOnEscape: boolean = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Specifies the visibility of the dialog.
     * @group Props
     */
    @Input() get visible(): boolean {
        return this._visible as boolean;
    }
    set visible(val: boolean) {
        this._visible = val;
    }
    /**
     * Specifies the position of the drawer, valid values are "left", "right", "bottom" and "top".
     * @group Props
     */
    @Input() get position(): string {
        return this._position;
    }
    set position(value: string) {
        this._position = value;

        switch (value) {
            case 'left':
                this.transformOptions = 'translate3d(-100%, 0px, 0px)';
                break;
            case 'right':
                this.transformOptions = 'translate3d(100%, 0px, 0px)';
                break;
            case 'bottom':
                this.transformOptions = 'translate3d(0px, 100%, 0px)';
                break;
            case 'top':
                this.transformOptions = 'translate3d(0px, -100%, 0px)';
                break;
        }
    }
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    @Input() get fullScreen(): boolean {
        return this._fullScreen;
    }
    set fullScreen(value: boolean) {
        this._fullScreen = value;

        if (value) this.transformOptions = 'none';
    }

    @Input() maskStyle: any;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;
    /**
     * Callback to invoke when dialog is shown.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when dialog is hidden.
     * @group Emits
     */
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when dialog visibility is changed.
     * @param {boolean} value - Visible value.
     * @group Emits
     */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('maskRef') maskRef: ElementRef | undefined;

    @ViewChild('container') containerViewChild: ElementRef | undefined;

    @ViewChild('closeButton') closeButtonViewChild: ElementRef | undefined;

    initialized: boolean | undefined;

    _visible: boolean | undefined;

    _position: string = 'left';

    _fullScreen: boolean = false;

    container: Nullable<HTMLDivElement>;

    transformOptions: any = 'translate3d(-100%, 0px, 0px)';

    mask: Nullable<HTMLDivElement>;

    documentEscapeListener: VoidListener;

    _componentStyle = inject(DrawerStyle);
    /**
     * Header template.
     * @group Props
     */
    @Input() headerTemplate: TemplateRef<any> | undefined;
    _headerTemplate: Nullable<TemplateRef<any>>;
    /**
     * Footer template.
     * @group Props
     */
    @Input() footerTemplate: Nullable<TemplateRef<any>>;
    _footerTemplate: TemplateRef<any>;
    /**
     * Close icon template.
     * @group Props
     */
    @Input() closeIconTemplate: Nullable<TemplateRef<any>>;
    _closeIconTemplate: TemplateRef<any>;
    /**
     * Headless template.
     * @group Props
     */
    @Input() headlessTemplate: Nullable<TemplateRef<any>>;
    _headlessTemplate: TemplateRef<any>;

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.initialized = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        const key = Object.keys(changes).find((k) => k.includes('Template'));
        if (key) {
            this[`_${key}`] = changes[key].currentValue;
        }
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this._headerTemplate = item.template || this.headerTemplate;
                    break;
                case 'footer':
                    this._footerTemplate = item.template || this.footerTemplate;
                    break;
                case 'closeicon':
                    this._closeIconTemplate = item.template || this.closeIconTemplate;
                    break;
                case 'headless':
                    this._headlessTemplate = item.template || this.headlessTemplate;
                    break;
            }
        });
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.code === 'Escape') {
            this.hide(false);
        }
    }

    show() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex || this.config.zIndex.modal);
        }

        this.onShow.emit({});
        this.visibleChange.emit(true);
    }

    hide(emit: boolean = true) {
        if (emit) {
            this.onHide.emit({});
        }
    }

    close(event: Event) {
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    }

    maskClickListener(event) {
        if (this.dismissible) {
            this.close(event);
        }

        if (this.blockScroll) {
            DomHandler.blockBodyScroll();
        }
    }

    onAnimationStart(event: any) {
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

    onAnimationEnd(event: any) {
        switch (event.toState) {
            case 'void':
                this.hide(false);
                ZIndexUtils.clear(this.container);
                this.unbindGlobalListeners();
                break;
        }
    }

    appendContainer() {
        if (this.appendTo) {
            return this.appendTo === 'body' ? this.renderer.appendChild(this.document.body, this.container) : DomHandler.appendChild(this.container, this.appendTo);
        }
    }

    bindDocumentEscapeListener() {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt((this.container as HTMLDivElement).style.zIndex) === ZIndexUtils.get(this.container)) {
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

    unbindGlobalListeners() {
        this.unbindDocumentEscapeListener();
    }

    ngOnDestroy() {
        this.initialized = false;

        if (this.appendTo && this.container) {
            this.renderer.appendChild(this.el.nativeElement, this.container);
        }

        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }

        this.container = null;
        this.unbindGlobalListeners();

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [CommonModule, RippleModule, SharedModule, TimesIcon, ButtonModule],
    exports: [Drawer, SharedModule],
    declarations: [Drawer]
})
export class DrawerModule {}
