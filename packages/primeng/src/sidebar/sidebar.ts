import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    NgModule,
    numberAttribute,
    OnDestroy,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { appendChild, blockBodyScroll } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ButtonModule, ButtonProps } from 'primeng/button';
import { TimesIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { DrawerStyle } from './style/drawerstyle';

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}')]);

const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);
/**
 * Sidebar is a panel component displayed as an overlay at the edges of the screen.
 * @group Components
 */
@Component({
    selector: 'p-sidebar',
    standalone: true,
    imports: [CommonModule, Ripple, SharedModule, TimesIcon, ButtonModule],
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
                <ng-container *ngTemplateOutlet="headlessTemplate || notHeadless"></ng-container>
                <ng-template #notHeadless>
                    <div [ngClass]="cx('header')" [attr.data-pc-section]="'header'">
                        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
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
export class Sidebar extends BaseComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    /**
     *  Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any = 'body';
    /**
     * Whether to block scrolling of the document when sidebar is active.
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
     * Whether an overlay mask is displayed behind the sidebar.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) modal: boolean = true;
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() closeButtonProps: ButtonProps;
    /**
     * Whether to dismiss sidebar on click of the mask.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) dismissible: boolean = true;
    /**
     * Whether to display the close icon.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showCloseIcon: boolean = true;
    /**
     * Specifies if pressing escape key should hide the sidebar.
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
     * Specifies the position of the sidebar, valid values are "left", "right", "bottom" and "top".
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
    /**
     * Footer template.
     * @group Props
     */
    @Input() footerTemplate: Nullable<TemplateRef<any>>;
    /**
     *
     * Close icon template.
     * @group Props
     */
    @Input() closeIconTemplate: Nullable<TemplateRef<any>>;
    /**
     * Headless template.
     * @group Props
     */
    @Input() headlessTemplate: Nullable<TemplateRef<any>>;

    /**
     * Headless template.
     * @group Props
     */
    @Input() contentTemplate: Nullable<TemplateRef<any>>;

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
                    this.headerTemplate = item.template || this.headerTemplate;
                    break;
                case 'footer':
                    this.footerTemplate = item.template || this.footerTemplate;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template || this.closeIconTemplate;
                    break;
                case 'headless':
                    this.headlessTemplate = item.template || this.headlessTemplate;
                    break;
                case 'content':
                    this.contentTemplate = item.template || this.headlessTemplate;
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
            blockBodyScroll();
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
            return this.appendTo === 'body' ? this.renderer.appendChild(this.document.body, this.container) : appendChild(this.container, this.appendTo);
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
    imports: [Sidebar, SharedModule],
    exports: [Sidebar, SharedModule]
})
export class SidebarModule {}
