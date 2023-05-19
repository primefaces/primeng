import { AnimationEvent, animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem, OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ZIndexUtils } from 'primeng/utils';
import { Nullable, VoidListener } from 'primeng/ts-helpers';

@Component({
    selector: 'p-tieredMenuSub',
    template: `
        <ul #sublist [ngClass]="{ 'p-submenu-list': !root }">
            <ng-template ngFor let-child [ngForOf]="root ? item : item?.items">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{ 'p-hidden': child.visible === false }"></li>
                <li
                    *ngIf="!child.separator"
                    #listItem
                    [ngClass]="{ 'p-menuitem': true, 'p-menuitem-active': child === activeItem, 'p-hidden': child.visible === false }"
                    [ngStyle]="child.style"
                    [class]="child.styleClass"
                    pTooltip
                    [tooltipOptions]="child.tooltipOptions"
                >
                    <a
                        *ngIf="!child.routerLink"
                        (keydown)="onItemKeyDown($event, child)"
                        [attr.href]="child.url"
                        [attr.data-automationid]="child.automationId"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [attr.id]="child.id"
                        (click)="onItemClick($event, child)"
                        (mouseenter)="onItemMouseEnter($event, child)"
                        [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': child.disabled }"
                        [attr.tabindex]="child.disabled ? null : '0'"
                        [attr.aria-haspopup]="item.items != null"
                        [attr.aria-expanded]="item === activeItem"
                        pRipple
                    >
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{ child.label }}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                        <ng-container *ngIf="child.items">
                            <AngleRightIcon *ngIf="!tieredMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" />
                            <ng-template *ngTemplateOutlet="tieredMenu.submenuIconTemplate"></ng-template>
                        </ng-container>
                    </a>
                    <a
                        *ngIf="child.routerLink"
                        (keydown)="onItemKeyDown($event, child)"
                        [routerLink]="child.routerLink"
                        [attr.data-automationid]="child.automationId"
                        [queryParams]="child.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions || { exact: false }"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [attr.id]="child.id"
                        [attr.tabindex]="child.disabled ? null : '0'"
                        role="menuitem"
                        (click)="onItemClick($event, child)"
                        (mouseenter)="onItemMouseEnter($event, child)"
                        [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': child.disabled }"
                        [fragment]="child.fragment"
                        [queryParamsHandling]="child.queryParamsHandling"
                        [preserveFragment]="child.preserveFragment"
                        [skipLocationChange]="child.skipLocationChange"
                        [replaceUrl]="child.replaceUrl"
                        [state]="child.state"
                        pRipple
                    >
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{ child.label }}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                        <ng-container *ngIf="child.items">
                            <AngleRightIcon *ngIf="!tieredMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" />
                            <ng-template *ngTemplateOutlet="tieredMenu.submenuIconTemplate"></ng-template>
                        </ng-container>
                    </a>
                    <p-tieredMenuSub
                        (keydownItem)="onChildItemKeyDown($event)"
                        [parentActive]="child === activeItem"
                        [item]="child"
                        *ngIf="child.items"
                        [mobileActive]="mobileActive"
                        [autoDisplay]="autoDisplay"
                        (leafClick)="onLeafClick()"
                        [popup]="popup"
                    ></p-tieredMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class TieredMenuSub implements OnDestroy {
    @Input() item: MenuItem | undefined;

    @Input() root: boolean | undefined;

    @Input() autoDisplay: boolean | undefined;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() mobileActive: boolean | undefined;

    @Input() popup: boolean | undefined;

    @Input() get parentActive(): boolean {
        return this._parentActive!;
    }
    set parentActive(value) {
        if (!this.root) {
            this._parentActive = value;

            if (!value) this.activeItem = null;
            else this.positionSubmenu();
        }
    }

    @ViewChild('sublist') sublistViewChild: ElementRef | undefined;

    @Output() leafClick: EventEmitter<any> = new EventEmitter();

    @Output() keydownItem: EventEmitter<any> = new EventEmitter();

    _parentActive: boolean | undefined;

    documentClickListener: VoidListener;

    menuHoverActive: boolean = false;

    activeItem: any;

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public renderer: Renderer2, private cd: ChangeDetectorRef, public tieredMenu: TieredMenu) {}

    onItemClick(event: Event, item: MenuItem) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }

        if (item.items) {
            if (this.activeItem && item === this.activeItem) {
                this.activeItem = null;
                this.unbindDocumentClickListener();
            } else {
                this.activeItem = item;
                if (this.root) {
                    this.bindDocumentClickListener();
                }
            }
        }

        if (!item.items) {
            this.onLeafClick();
        }
    }

    onItemMouseEnter(event: MouseEvent, item: MenuItem) {
        if (item.disabled || this.mobileActive) {
            event.preventDefault();
            return;
        }

        if (this.root) {
            if (this.activeItem || this.autoDisplay || this.popup) {
                this.activeItem = item;
                this.bindDocumentClickListener();
            }
        } else {
            this.activeItem = item;
            this.bindDocumentClickListener();
        }
    }

    onLeafClick() {
        this.activeItem = null;
        if (this.root) {
            this.unbindDocumentClickListener();
        }

        this.leafClick.emit();
    }

    onItemKeyDown(event: KeyboardEvent, item: MenuItem) {
        let listItem = (event.currentTarget as HTMLElement).parentElement;

        switch (event.key) {
            case 'ArrowDown':
                const nextItem = this.findNextItem(listItem!);
                if (nextItem) {
                    nextItem.children[0].focus();
                }

                event.preventDefault();
                break;

            case 'ArrowUp':
                const prevItem = this.findPrevItem(listItem!);
                if (prevItem) {
                    prevItem.children[0].focus();
                }

                event.preventDefault();
                break;

            case 'ArrowRight':
                if (item.items) {
                    this.activeItem = item;

                    if (this.root) {
                        this.bindDocumentClickListener();
                    }

                    setTimeout(() => {
                        (listItem?.children[1].children[0].children[0].children[0] as HTMLElement).focus();
                    }, 50);
                }

                event.preventDefault();
                break;

            case 'Enter':
                if (!item.routerLink) {
                    this.onItemClick(event, item);
                }

                break;

            default:
                break;
        }

        this.keydownItem.emit({
            originalEvent: event,
            element: listItem
        });
    }

    positionSubmenu() {
        let sublist = this.sublistViewChild && this.sublistViewChild.nativeElement;

        if (sublist) {
            const parentItem = sublist.parentElement.parentElement;
            const containerOffset = DomHandler.getOffset(parentItem);
            const viewport = DomHandler.getViewport();
            const sublistWidth = sublist.offsetParent ? sublist.offsetWidth : DomHandler.getHiddenElementOuterWidth(sublist);
            const itemOuterWidth = DomHandler.getOuterWidth(parentItem.children[0]);

            if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - DomHandler.calculateScrollbarWidth()) {
                DomHandler.addClass(sublist, 'p-submenu-list-flipped');
            }
        }
    }

    findNextItem(item: Element): any {
        let nextItem = item.nextElementSibling;

        if (nextItem) return DomHandler.hasClass(nextItem, 'p-disabled') || !DomHandler.hasClass(nextItem, 'p-menuitem') ? this.findNextItem(nextItem) : nextItem;
        else return null;
    }

    findPrevItem(item: Element): any {
        let prevItem = item.previousElementSibling;

        if (prevItem) return DomHandler.hasClass(prevItem, 'p-disabled') || !DomHandler.hasClass(prevItem, 'p-menuitem') ? this.findPrevItem(prevItem) : prevItem;
        else return null;
    }

    onChildItemKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.activeItem = null;

            if (this.root) {
                this.unbindDocumentClickListener();
            }
            if (event.target) {
                const parent = (event.target as HTMLElement).parentElement;
                if (parent && parent.parentElement && parent.parentElement.parentElement) {
                    (parent.parentElement.parentElement.children[0] as HTMLElement).focus();
                }
            }
        }
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                if (this.el && !this.el.nativeElement.contains(event.target)) {
                    this.activeItem = null;
                    this.cd.markForCheck();
                    this.unbindDocumentClickListener();
                }
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindDocumentClickListener();
    }
}

@Component({
    selector: 'p-tieredMenu',
    template: `
        <div
            [ngClass]="{ 'p-tieredmenu p-component': true, 'p-tieredmenu-overlay': popup }"
            [class]="styleClass"
            [ngStyle]="style"
            (click)="onOverlayClick($event)"
            [@overlayAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            [@.disabled]="popup !== true"
            (@overlayAnimation.start)="onOverlayAnimationStart($event)"
            (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
            *ngIf="!popup || visible"
        >
            <p-tieredMenuSub [item]="model" root="root" [parentActive]="parentActive" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex" (leafClick)="onLeafClick()" [autoDisplay]="autoDisplay" [popup]="popup"></p-tieredMenuSub>
        </div>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}')]), transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tieredmenu.css'],
    host: {
        class: 'p-element'
    }
})
export class TieredMenu implements AfterContentInit, OnDestroy {
    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
    /**
     * Defines if menu would displayed as a popup.
     * @group Props
     */
    @Input() popup: boolean | undefined;
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
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element.
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input() autoZIndex: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input() baseZIndex: number = 0;
    /**
     * Whether to show a root submenu on mouse over.
     * @group Props
     */
    @Input() autoDisplay: boolean | undefined;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    @Input() hideTransitionOptions: string = '.1s linear';
    /**
     * Callback to invoke when overlay menu is shown.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when overlay menu is hidden.
     * @group Emits
     */
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    submenuIconTemplate: Nullable<TemplateRef<any>>;

    parentActive: boolean | undefined;

    container: HTMLDivElement | undefined;

    documentClickListener: VoidListener;

    documentResizeListener: VoidListener;

    preventDocumentDefault: boolean | undefined;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    target: any;

    visible: boolean | undefined;

    relativeAlign: boolean | undefined;

    private window: Window;

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public config: PrimeNGConfig, public overlayService: OverlayService) {
        this.window = this.document.defaultView as Window;
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
            }
        });
    }
    /**
     * Toggles the visibility of the popup menu.
     * @param event
     * @group Methods
     */
    toggle(event: any) {
        if (this.visible) this.hide();
        else this.show(event);

        this.preventDocumentDefault = true;
    }

    /**
     * Displays the popup menu.
     * @param event
     * @group Methods
     */
    show(event: any) {
        this.target = event.currentTarget;
        this.relativeAlign = event.relativeAlign;
        this.visible = true;
        this.parentActive = true;
        this.preventDocumentDefault = true;
        this.cd.markForCheck();
    }

    onOverlayClick(event: MouseEvent) {
        if (this.popup) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }

        this.preventDocumentDefault = true;
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                }
                break;

            case 'void':
                this.onOverlayHide();
                this.onHide.emit({});
                break;
        }
    }

    alignOverlay() {
        if (this.relativeAlign) DomHandler.relativePosition(this.container, this.target);
        else DomHandler.absolutePosition(this.container, this.target);
    }

    onOverlayAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.renderer.appendChild(this.document.body, this.container);
            else DomHandler.appendChild(this.container, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.container);
        }
    }

    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('menu', this.container, this.baseZIndex + this.config.zIndex.menu);
        }
    }

    /**
     * Hides the popup menu.
     * @group Methods
     */
    hide() {
        this.visible = false;
        this.relativeAlign = false;
        this.parentActive = false;
        this.cd.markForCheck();
    }

    onWindowResize() {
        if (this.visible && !DomHandler.isTouchDevice()) {
            this.hide();
        }
    }

    onLeafClick() {
        if (this.popup) {
            this.hide();
        }

        this.unbindDocumentClickListener();
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', () => {
                if (!this.preventDocumentDefault && this.popup) {
                    this.hide();
                }

                this.preventDocumentDefault = false;
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', this.onWindowResize.bind(this));
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                if (this.visible) {
                    this.hide();
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.preventDocumentDefault = false;

        if (!(this.cd as ViewRef).destroyed) {
            this.target = null;
        }
    }

    ngOnDestroy() {
        if (this.popup) {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            if (this.container && this.autoZIndex) {
                ZIndexUtils.clear(this.container);
            }

            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    }
}

@NgModule({
    imports: [CommonModule, RouterModule, RippleModule, TooltipModule, AngleRightIcon, SharedModule],
    exports: [TieredMenu, RouterModule, TooltipModule, SharedModule],
    declarations: [TieredMenu, TieredMenuSub]
})
export class TieredMenuModule {}
