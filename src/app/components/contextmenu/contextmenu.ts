import { CommonModule, DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextMenuService, MenuItem, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ZIndexUtils } from 'primeng/utils';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Nullable, VoidListener } from 'primeng/ts-helpers';

@Component({
    selector: 'p-contextMenuSub',
    template: `
        <ul #sublist [ngClass]="{ 'p-submenu-list': !root }">
            <ng-template ngFor let-child let-index="index" [ngForOf]="root ? item : item?.items">
                <li *ngIf="child.separator" #menuitem class="p-menu-separator" [ngClass]="{ 'p-hidden': child.visible === false }" role="separator"></li>
                <li
                    *ngIf="!child.separator"
                    #menuitem
                    [ngClass]="{ 'p-menuitem': true, 'p-menuitem-active': isActive(getKey(index)), 'p-hidden': child.visible === false }"
                    [ngStyle]="child.style"
                    [class]="child.styleClass"
                    pTooltip
                    [tooltipOptions]="child.tooltipOptions"
                    (mouseenter)="onItemMouseEnter($event, child, getKey(index))"
                    (mouseleave)="onItemMouseLeave($event, child)"
                    role="none"
                    [attr.data-ik]="getKey(index)"
                >
                    <a
                        *ngIf="!child.routerLink"
                        [attr.href]="child.url ? child.url : null"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [attr.id]="child.id"
                        [attr.tabindex]="child.disabled ? null : '0'"
                        (click)="onItemClick($event, child, menuitem, getKey(index))"
                        [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': child.disabled }"
                        pRipple
                        [attr.aria-haspopup]="item.items != null"
                        [attr.aria-expanded]="isActive(getKey(index))"
                    >
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{ child.label }}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                        <ng-container *ngIf="child.items">
                            <AngleRightIcon *ngIf="!contextMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" />
                            <span *ngIf="contextMenu.submenuIconTemplate" class="p-submenu-icon">
                                <ng-template *ngTemplateOutlet="contextMenu.submenuIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </a>
                    <a
                        *ngIf="child.routerLink"
                        [routerLink]="child.routerLink"
                        [queryParams]="child.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        role="menuitem"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions || { exact: false }"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [attr.id]="child.id"
                        [attr.tabindex]="child.disabled ? null : '0'"
                        (click)="onItemClick($event, child, menuitem, getKey(index))"
                        [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': child.disabled }"
                        pRipple
                        [fragment]="child.fragment"
                        [queryParamsHandling]="child.queryParamsHandling"
                        [preserveFragment]="child.preserveFragment"
                        [skipLocationChange]="child.skipLocationChange"
                        [replaceUrl]="child.replaceUrl"
                        [state]="child.state"
                    >
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{ child.label }}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                        <ng-container *ngIf="child.items">
                            <AngleRightIcon *ngIf="!contextMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" />
                            <span *ngIf="contextMenu.submenuIconTemplate" class="p-submenu-icon">
                                <ng-template *ngTemplateOutlet="contextMenu.submenuIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </a>
                    <p-contextMenuSub [parentItemKey]="getKey(index)" [item]="child" *ngIf="child.items" (leafClick)="onLeafClick()"></p-contextMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class ContextMenuSub {
    @Input() item: MenuItem | undefined;

    @Input() root: boolean | undefined;

    @Input() parentItemKey: any;

    @Output() leafClick: EventEmitter<any> = new EventEmitter();

    @ViewChild('sublist') sublistViewChild: ElementRef | undefined;

    @ViewChild('menuitem') menuitemViewChild: ElementRef | undefined;

    contextMenu: ContextMenu;

    activeItemKey: Nullable<string>;

    hideTimeout: any;

    activeItemKeyChangeSubscription: Subscription | undefined;

    constructor(@Inject(forwardRef(() => ContextMenu)) contextMenu: ContextMenu) {
        this.contextMenu = contextMenu as ContextMenu;
    }

    ngOnInit() {
        this.activeItemKeyChangeSubscription = this.contextMenu.contextMenuService.activeItemKeyChange$.pipe(takeUntil(this.contextMenu.ngDestroy$)).subscribe((activeItemKey) => {
            this.activeItemKey = activeItemKey;

            if (this.isActive(this.parentItemKey) && DomHandler.hasClass(this.sublistViewChild?.nativeElement, 'p-submenu-list-active')) {
                this.contextMenu.positionSubmenu(this.sublistViewChild?.nativeElement);
            }

            this.contextMenu.cd.markForCheck();
        });
    }

    onItemMouseEnter(event: Event, item: MenuItem, key: string) {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        if (item.disabled) {
            this.activeItemKey = null;
            return;
        }

        if (item.items) {
            let childSublist = DomHandler.findSingle(event.currentTarget, '.p-submenu-list');
            DomHandler.addClass(childSublist, 'p-submenu-list-active');
        }

        this.contextMenu.contextMenuService.changeKey(key);
    }

    onItemMouseLeave(event: MouseEvent, item: MenuItem) {
        if (item.disabled) {
            return;
        }

        if (this.contextMenu.el.nativeElement.contains(<Node>event.target)) {
            if (item.items) {
                this.contextMenu.removeActiveFromSubLists(event.currentTarget as Element);
            }

            if (!this.root) {
                this.contextMenu.contextMenuService.changeKey(this.parentItemKey);
            }
        }
    }

    onItemClick(event: MouseEvent, item: MenuItem, menuitem: Element, key: string) {
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
            let childSublist = DomHandler.findSingle(menuitem, '.p-submenu-list');

            if (childSublist) {
                if (this.isActive(key) && DomHandler.hasClass(childSublist, 'p-submenu-list-active')) {
                    this.contextMenu.removeActiveFromSubLists(menuitem);
                } else {
                    DomHandler.addClass(childSublist, 'p-submenu-list-active');
                }

                this.contextMenu.contextMenuService.changeKey(key);
            }
        }

        if (!item.items) {
            this.onLeafClick();
        }
    }

    onLeafClick() {
        if (this.root) {
            this.contextMenu.hide();
        }

        this.leafClick.emit();
    }

    getKey(index: number) {
        return this.root ? String(index) : this.parentItemKey + '_' + index;
    }

    isActive(key: string) {
        return this.activeItemKey && (this.activeItemKey.startsWith(key + '_') || this.activeItemKey === key);
    }
}

@Component({
    selector: 'p-contextMenu',
    template: `
        <div #container [ngClass]="'p-contextmenu p-component'" [class]="styleClass" [ngStyle]="style">
            <p-contextMenuSub [item]="model" [root]="true"></p-contextMenuSub>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./contextmenu.css'],
    host: {
        class: 'p-element'
    }
})
export class ContextMenu implements AfterViewInit, OnDestroy {
    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
    /**
     * Attaches the menu to document instead of a particular item.
     * @group Props
     */
    @Input() global: boolean | undefined;
    /**
     * Local template variable name of the element to attach the context menu.
     * @group Props
     */
    @Input() target: HTMLElement | string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
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
     * Event for which the menu must be displayed.
     * @group Props
     */
    @Input() triggerEvent: string = 'contextmenu';
    /**
     * Displays the popup menu.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter();
    /**
     * Hides the popup menu.
     * @group Emits
     */
    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: ElementRef | undefined;

    documentClickListener: VoidListener;

    documentTriggerListener: VoidListener;

    documentKeydownListener: VoidListener;

    windowResizeListener: VoidListener;

    triggerEventListener: VoidListener;

    ngDestroy$ = new Subject();

    preventDocumentDefault: boolean = false;

    private window: Window;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    submenuIconTemplate: TemplateRef<any> | undefined;

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public zone: NgZone, public contextMenuService: ContextMenuService, private config: PrimeNGConfig) {
        this.window = this.document.defaultView as Window;
    }

    ngAfterViewInit() {
        if (this.global) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.triggerEventListener = this.renderer.listen(documentTarget, this.triggerEvent, (event) => {
                this.show(event);
                event.preventDefault();
            });
        } else if (this.target) {
            this.triggerEventListener = this.renderer.listen(this.target, this.triggerEvent, (event) => {
                this.show(event);
                event.preventDefault();
            });
        }

        if (this.appendTo) {
            if (this.appendTo === 'body') this.renderer.appendChild(this.document.body, this.containerViewChild?.nativeElement);
            else DomHandler.appendChild(this.containerViewChild?.nativeElement, this.appendTo);
        }
    }

    show(event?: MouseEvent) {
        this.clearActiveItem();
        this.position(event);
        this.moveOnTop();
        (<ElementRef>this.containerViewChild).nativeElement.style.display = 'block';
        this.preventDocumentDefault = true;
        DomHandler.fadeIn(this.containerViewChild?.nativeElement, 250);
        this.bindGlobalListeners();

        if (event) {
            event.preventDefault();
        }

        this.onShow.emit();
    }

    hide() {
        (<ElementRef>this.containerViewChild).nativeElement.style.display = 'none';

        if (this.autoZIndex) {
            ZIndexUtils.clear(this.containerViewChild?.nativeElement);
        }

        this.clearActiveItem();
        this.unbindGlobalListeners();
        this.onHide.emit();
    }

    moveOnTop() {
        if (this.autoZIndex && this.containerViewChild && this.containerViewChild.nativeElement.style.display !== 'block') {
            ZIndexUtils.set('menu', this.containerViewChild.nativeElement, this.baseZIndex + this.config.zIndex.menu);
        }
    }

    toggle(event?: MouseEvent) {
        if ((<ElementRef>this.containerViewChild).nativeElement.offsetParent) this.hide();
        else this.show(event);
    }

    position(event?: MouseEvent) {
        if (event) {
            let left = event.pageX + 1;
            let top = event.pageY + 1;
            let width = this.containerViewChild?.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetWidth : DomHandler.getHiddenElementOuterWidth(this.containerViewChild?.nativeElement);
            let height = this.containerViewChild?.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetHeight : DomHandler.getHiddenElementOuterHeight(this.containerViewChild?.nativeElement);
            let viewport = DomHandler.getViewport();

            //flip
            if (left + width - (<any>this.document).scrollingElement.scrollLeft > viewport.width) {
                left -= width;
            }

            //flip
            if (top + height - (<any>this.document).scrollingElement.scrollTop > viewport.height) {
                top -= height;
            }

            //fit
            if (left < (<any>this.document).scrollingElement.scrollLeft) {
                left = (<any>this.document).scrollingElement.scrollLeft;
            }

            //fit
            if (top < (<any>this.document).scrollingElement.scrollTop) {
                top = (<any>this.document).scrollingElement.scrollTop;
            }

            (<ElementRef>this.containerViewChild).nativeElement.style.left = left + 'px';
            (<ElementRef>this.containerViewChild).nativeElement.style.top = top + 'px';
        }
    }

    positionSubmenu(sublist: HTMLElement) {
        let parentMenuItem = sublist.parentElement?.parentElement;
        let viewport = DomHandler.getViewport();
        let sublistWidth = sublist.offsetParent ? sublist.offsetWidth : DomHandler.getHiddenElementOuterWidth(sublist);
        let sublistHeight = sublist.offsetHeight ? sublist.offsetHeight : DomHandler.getHiddenElementOuterHeight(sublist);
        let itemOuterWidth = DomHandler.getOuterWidth(parentMenuItem?.children[0]);
        let itemOuterHeight = DomHandler.getOuterHeight(parentMenuItem?.children[0]);
        let containerOffset = DomHandler.getOffset(parentMenuItem?.parentElement);

        sublist.style.zIndex = (++DomHandler.zindex).toString();

        if (parseInt(containerOffset.top) + itemOuterHeight + sublistHeight > viewport.height - DomHandler.calculateScrollbarHeight()) {
            sublist.style.removeProperty('top');
            sublist.style.bottom = '0px';
        } else {
            sublist.style.removeProperty('bottom');
            sublist.style.top = '0px';
        }

        if (parseInt(containerOffset.left) + itemOuterWidth + sublistWidth > viewport.width - DomHandler.calculateScrollbarWidth()) {
            sublist.style.left = -sublistWidth + 'px';
        } else {
            sublist.style.left = itemOuterWidth + 'px';
        }
    }

    isItemMatched(menuitem: Element) {
        return DomHandler.hasClass(menuitem, 'p-menuitem') && !DomHandler.hasClass(menuitem.children[0], 'p-disabled');
    }

    findNextItem(menuitem: Element, isRepeated?: boolean): any {
        let nextMenuitem = menuitem.nextElementSibling;

        if (nextMenuitem) {
            return this.isItemMatched(nextMenuitem) ? nextMenuitem : this.findNextItem(nextMenuitem, isRepeated);
        } else {
            let firstItem = menuitem.parentElement?.children[0];

            return this.isItemMatched(firstItem!) ? firstItem : !isRepeated ? this.findNextItem(firstItem as Element, true) : null;
        }
    }

    findPrevItem(menuitem: Element, isRepeated?: boolean): any {
        let prevMenuitem = menuitem.previousElementSibling;

        if (prevMenuitem) {
            return this.isItemMatched(prevMenuitem) ? prevMenuitem : this.findPrevItem(prevMenuitem, isRepeated);
        } else {
            let lastItem = menuitem.parentElement?.children[menuitem.parentElement.children.length - 1];

            return this.isItemMatched(<Element>lastItem) ? lastItem : !isRepeated ? this.findPrevItem(<Element>lastItem, true) : null;
        }
    }

    getActiveItem() {
        let activeItemKey = this.contextMenuService.activeItemKey;

        return activeItemKey == null ? null : DomHandler.findSingle(this.containerViewChild?.nativeElement, '.p-menuitem[data-ik="' + activeItemKey + '"]');
    }

    clearActiveItem() {
        if (this.contextMenuService.activeItemKey) {
            this.removeActiveFromSubLists(this.containerViewChild?.nativeElement);
            this.contextMenuService.reset();
        }
    }

    removeActiveFromSubLists(el: Element) {
        let sublists = DomHandler.find(el, '.p-submenu-list-active');

        for (let sublist of sublists) {
            DomHandler.removeClass(sublist, 'p-submenu-list-active');
        }
    }

    removeActiveFromSublist(menuitem: MenuItem) {
        if (menuitem) {
            let sublist = DomHandler.findSingle(menuitem, '.p-submenu-list');

            if (sublist && DomHandler.hasClass(menuitem, 'p-submenu-list-active')) {
                DomHandler.removeClass(menuitem, 'p-submenu-list-active');
            }
        }
    }

    bindGlobalListeners() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                if (this.containerViewChild?.nativeElement.offsetParent && this.isOutsideClicked(event) && !event.ctrlKey && event.button !== 2 && this.triggerEvent !== 'click') {
                    this.hide();
                }
            });

            this.documentTriggerListener = this.renderer.listen(documentTarget, this.triggerEvent, (event) => {
                if (this.containerViewChild?.nativeElement.offsetParent && this.isOutsideClicked(event) && !this.preventDocumentDefault) {
                    this.hide();
                }
                this.preventDocumentDefault = false;
            });
        }

        this.zone.runOutsideAngular(() => {
            if (!this.windowResizeListener) {
                this.renderer.listen(this.window, 'resize', this.onWindowResize.bind(this));
            }
        });

        if (!this.documentKeydownListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentKeydownListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
                let activeItem = this.getActiveItem();

                switch (event.key) {
                    case 'ArrowDown':
                        if (activeItem) {
                            this.removeActiveFromSublist(activeItem);
                            activeItem = this.findNextItem(activeItem);
                        } else {
                            let firstItem = DomHandler.findSingle(this.containerViewChild?.nativeElement, '.p-menuitem-link').parentElement;
                            activeItem = this.isItemMatched(firstItem) ? firstItem : this.findNextItem(firstItem);
                        }

                        if (activeItem) {
                            this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                        }

                        event.preventDefault();
                        break;

                    case 'ArrowUp':
                        if (activeItem) {
                            this.removeActiveFromSublist(activeItem);
                            activeItem = this.findPrevItem(activeItem);
                        } else {
                            let sublist = DomHandler.findSingle(this.containerViewChild?.nativeElement, 'ul');
                            let lastItem = sublist.children[sublist.children.length - 1];
                            activeItem = this.isItemMatched(lastItem) ? lastItem : this.findPrevItem(lastItem);
                        }

                        if (activeItem) {
                            this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                        }

                        event.preventDefault();
                        break;

                    case 'ArrowRight':
                        if (activeItem) {
                            let sublist = DomHandler.findSingle(activeItem, '.p-submenu-list');

                            if (sublist) {
                                DomHandler.addClass(sublist, 'p-submenu-list-active');

                                activeItem = DomHandler.findSingle(sublist, '.p-menuitem-link:not(.p-disabled)').parentElement;

                                if (activeItem) {
                                    this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                                }
                            }
                        }

                        event.preventDefault();
                        break;

                    case 'ArrowLeft':
                        if (activeItem) {
                            let sublist = activeItem.parentElement;

                            if (sublist && DomHandler.hasClass(sublist, 'p-submenu-list-active')) {
                                DomHandler.removeClass(sublist, 'p-submenu-list-active');

                                activeItem = sublist.parentElement.parentElement;

                                if (activeItem) {
                                    this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                                }
                            }
                        }

                        event.preventDefault();
                        break;

                    case 'Escape':
                        this.hide();
                        event.preventDefault();

                        break;

                    case 'Enter':
                        if (activeItem) {
                            this.handleItemClick(event, this.findModelItemFromKey(this.contextMenuService.activeItemKey!), activeItem);
                        }

                        event.preventDefault();
                        break;

                    default:
                        break;
                }
            });
        }
    }

    findModelItemFromKey(key: string) {
        if (key == null || !this.model) {
            return null;
        }

        let indexes = key.split('_');
        return indexes.reduce((item: any, currentIndex: any) => {
            return item ? item.items[currentIndex] : this.model![currentIndex];
        }, null);
    }

    handleItemClick(event: Event, item: any, menuitem: any) {
        if (!item || item.disabled) {
            return;
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }

        if (item.items) {
            let childSublist = DomHandler.findSingle(menuitem, '.p-submenu-list');

            if (childSublist) {
                if (DomHandler.hasClass(childSublist, 'p-submenu-list-active')) {
                    this.removeActiveFromSubLists(menuitem);
                } else {
                    DomHandler.addClass(childSublist, 'p-submenu-list-active');
                    this.positionSubmenu(childSublist);
                }
            }
        }

        if (!item.items) {
            this.hide();
        }
    }

    unbindGlobalListeners() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }

        if (this.documentTriggerListener) {
            this.documentTriggerListener();
            this.documentTriggerListener = null;
        }

        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }

        if (this.documentKeydownListener) {
            this.documentKeydownListener();
            this.documentKeydownListener = null;
        }
    }

    onWindowResize() {
        if (this.containerViewChild?.nativeElement.offsetParent) {
            this.hide();
        }
    }

    isOutsideClicked(event: Event) {
        return !(this.containerViewChild?.nativeElement.isSameNode(event.target) || this.containerViewChild?.nativeElement.contains(event.target));
    }

    ngOnDestroy() {
        this.unbindGlobalListeners();

        if (this.triggerEventListener) {
            this.triggerEventListener();
            this.triggerEventListener = null;
        }

        if (this.containerViewChild && this.autoZIndex) {
            ZIndexUtils.clear(this.containerViewChild.nativeElement);
        }

        if (this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.containerViewChild?.nativeElement);
        }

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }
}

@NgModule({
    imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleRightIcon],
    exports: [ContextMenu, RouterModule, TooltipModule, SharedModule],
    declarations: [ContextMenu, ContextMenuSub],
    providers: [ContextMenuService]
})
export class ContextMenuModule {}
