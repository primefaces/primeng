import { AnimationEvent, animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    ViewRef,
    booleanAttribute,
    effect,
    forwardRef,
    inject,
    input,
    numberAttribute,
    signal
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { absolutePosition, appendChild, findLastIndex, findSingle, focus, isEmpty, isNotEmpty, isPrintableCharacter, isTouchDevice, nestedPosition, relativePosition, resolve, uuid } from '@primeuix/utils';
import { MenuItem, OverlayService, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { AngleRightIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { TieredMenuStyle } from './style/tieredmenustyle';

@Component({
    selector: 'p-tieredMenuSub, p-tieredmenusub',
    standalone: true,
    imports: [CommonModule, RouterModule, Ripple, TooltipModule, AngleRightIcon, SharedModule],
    template: `
        <ul
            #sublist
            role="menu"
            [ngClass]="{ 'p-tieredmenu-submenu': !root, 'p-tieredmenu-root-list': root }"
            [id]="menuId + '_list'"
            [tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.aria-orientation]="'vertical'"
            [attr.data-pc-section]="'menu'"
            (keydown)="menuKeydown.emit($event)"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
            [ngStyle]="inlineStyles"
        >
            <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
                <li
                    *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                    [attr.id]="getItemId(processedItem)"
                    [style]="getItemProp(processedItem, 'style')"
                    [ngClass]="getSeparatorItemClass(processedItem)"
                    role="separator"
                    [attr.data-pc-section]="'separator'"
                ></li>
                <li
                    #listItem
                    *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                    role="menuitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.data-pc-section]="'menuitem'"
                    [attr.data-p-highlight]="isItemActive(processedItem)"
                    [attr.data-p-focused]="isItemFocused(processedItem)"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [attr.aria-label]="getItemLabel(processedItem)"
                    [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                    [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getItemClass(processedItem)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div [attr.data-pc-section]="'content'" class="p-tieredmenu-item-content" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({ $event, processedItem })">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                [attr.data-pc-section]="'action'"
                                [target]="getItemProp(processedItem, 'target')"
                                [ngClass]="{ 'p-tieredmenu-item-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [attr.tabindex]="-1"
                                pRipple
                            >
                                <span
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    class="p-tieredmenu-item-icon"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.tabindex]="-1"
                                >
                                </span>
                                <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-tieredmenu-item-label" [attr.data-pc-section]="'label'">
                                    {{ getItemLabel(processedItem) }}
                                </span>
                                <ng-template #htmlLabel>
                                    <span class="p-tieredmenu-item-label" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                                </ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <AngleRightIcon *ngIf="!tieredMenu.submenuIconTemplate" [ngClass]="'p-tieredmenu-submenu-icon'" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true" />
                                    <ng-template *ngTemplateOutlet="tieredMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                                </ng-container>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                [attr.tabindex]="-1"
                                [attr.data-pc-section]="'action'"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-tieredmenu-item-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(processedItem, 'target')"
                                [ngClass]="{ 'p-tieredmenu-item-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                pRipple
                            >
                                <span
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    class="p-tieredmenu-item-icon"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.aria-hidden]="true"
                                    [attr.tabindex]="-1"
                                >
                                </span>
                                <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-tieredmenu-item-label" [attr.data-pc-section]="'label'">
                                    {{ getItemLabel(processedItem) }}
                                </span>
                                <ng-template #htmlLabel>
                                    <span class="p-tieredmenu-item-label" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                                </ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <AngleRightIcon *ngIf="!tieredMenu.submenuIconTemplate" [ngClass]="'p-tieredmenu-submenu-icon'" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true" />
                                    <ng-template *ngTemplateOutlet="tieredMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                                </ng-container>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item, hasSubmenu: getItemProp(processedItem, 'items') }"></ng-template>
                        </ng-container>
                    </div>

                    <p-tieredmenusub
                        *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                        [items]="processedItem.items"
                        [itemTemplate]="itemTemplate"
                        [autoDisplay]="autoDisplay"
                        [menuId]="menuId"
                        [activeItemPath]="activeItemPath()"
                        [focusedItemId]="focusedItemId"
                        [ariaLabelledBy]="getItemId(processedItem)"
                        [level]="level + 1"
                        (itemClick)="itemClick.emit($event)"
                        (itemMouseEnter)="onItemMouseEnter($event)"
                        [inlineStyles]="{ display: isItemActive(processedItem) ? 'flex' : 'none' }"
                    ></p-tieredmenusub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None
})
export class TieredMenuSub extends BaseComponent {
    @Input() items: any[];

    @Input() itemTemplate: HTMLElement | undefined;

    @Input({ transform: booleanAttribute }) root: boolean | undefined = false;

    @Input({ transform: booleanAttribute }) autoDisplay: boolean | undefined;

    @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;

    @Input({ transform: numberAttribute }) baseZIndex: number = 0;

    @Input({ transform: booleanAttribute }) popup: boolean | undefined;

    @Input() menuId: string | undefined;

    @Input() ariaLabel: string | undefined;

    @Input() ariaLabelledBy: string | undefined;

    @Input({ transform: numberAttribute }) level: number = 0;

    @Input() focusedItemId: string | undefined;

    activeItemPath = input<any[]>([]);

    @Input({ transform: numberAttribute }) tabindex: number = 0;

    @Input() inlineStyles: { [klass: string]: any } | null | undefined;

    @Output() itemClick: EventEmitter<any> = new EventEmitter();

    @Output() itemMouseEnter: EventEmitter<any> = new EventEmitter();

    @Output() menuFocus: EventEmitter<any> = new EventEmitter();

    @Output() menuBlur: EventEmitter<any> = new EventEmitter();

    @Output() menuKeydown: EventEmitter<any> = new EventEmitter();

    @ViewChild('sublist', { static: true }) sublistViewChild: ElementRef;

    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        @Inject(forwardRef(() => TieredMenu)) public tieredMenu: TieredMenu
    ) {
        super();
        effect(() => {
            const path = this.activeItemPath();
            if (isNotEmpty(path)) {
                this.positionSubmenu();
            }
        });
    }

    positionSubmenu() {
        if (isPlatformBrowser(this.tieredMenu.platformId)) {
            const sublist = this.sublistViewChild && this.sublistViewChild.nativeElement;
            if (sublist) {
                nestedPosition(sublist, this.level);
            }
        }
    }

    getItemProp(processedItem: any, name: string, params: any | null = null) {
        return processedItem && processedItem.item ? resolve(processedItem.item[name], params) : undefined;
    }

    getItemId(processedItem: any): string {
        return processedItem.item?.id ?? `${this.menuId}_${processedItem.key}`;
    }

    getItemKey(processedItem: any): string {
        return this.getItemId(processedItem);
    }

    getItemClass(processedItem: any) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-tieredmenu-item': true,
            'p-tieredmenu-item-active': this.isItemActive(processedItem),
            'p-focus': this.isItemFocused(processedItem),
            'p-disabled': this.isItemDisabled(processedItem)
        };
    }

    getItemLabel(processedItem: any): string {
        return this.getItemProp(processedItem, 'label');
    }

    getSeparatorItemClass(processedItem: any) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-tieredmenu-separator': true
        };
    }

    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }

    getAriaPosInset(index: number) {
        return (
            index -
            this.items.slice(0, index).filter((processedItem) => {
                const isItemVisible = this.isItemVisible(processedItem);
                const isVisibleSeparator = isItemVisible && this.getItemProp(processedItem, 'separator');
                return !isItemVisible || isVisibleSeparator;
            }).length +
            1
        );
    }

    isItemVisible(processedItem: any): boolean {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemActive(processedItem: any): boolean {
        if (this.activeItemPath()) {
            return this.activeItemPath().some((path) => path.key === processedItem.key);
        }
    }

    isItemDisabled(processedItem: any): boolean {
        return this.getItemProp(processedItem, 'disabled');
    }

    isItemFocused(processedItem: any): boolean {
        return this.focusedItemId === this.getItemId(processedItem);
    }

    isItemGroup(processedItem: any): boolean {
        return isNotEmpty(processedItem.items);
    }

    onItemMouseEnter(param: any) {
        if (this.autoDisplay) {
            const { event, processedItem } = param;
            this.itemMouseEnter.emit({ originalEvent: event, processedItem });
        }
    }

    onItemClick(event: any, processedItem: any) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }
}
/**
 * TieredMenu displays submenus in nested overlays.
 * @group Components
 */
@Component({
    selector: 'p-tieredMenu, p-tieredmenu, p-tiered-menu',
    standalone: true,
    imports: [CommonModule, TieredMenuSub, RouterModule, Ripple, TooltipModule, AngleRightIcon, SharedModule],
    template: `
        <div
            #container
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'tieredmenu'"
            [id]="id"
            [ngClass]="{ 'p-tieredmenu p-component': true, 'p-tieredmenu-mobile': queryMatches, 'p-tieredmenu-overlay': popup }"
            [class]="styleClass"
            [ngStyle]="style"
            (click)="onOverlayClick($event)"
            [@overlayAnimation]="{
                value: 'visible',
                params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions }
            }"
            [@.disabled]="popup !== true"
            (@overlayAnimation.start)="onOverlayAnimationStart($event)"
            (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
            *ngIf="!popup || visible"
        >
            <p-tieredMenuSub
                #rootmenu
                [root]="true"
                [items]="processedItems"
                [itemTemplate]="itemTemplate"
                [menuId]="id"
                [tabindex]="!disabled ? tabindex : -1"
                [ariaLabel]="ariaLabel"
                [ariaLabelledBy]="ariaLabelledBy"
                [baseZIndex]="baseZIndex"
                [autoZIndex]="autoZIndex"
                [autoDisplay]="autoDisplay"
                [popup]="popup"
                [focusedItemId]="focused ? focusedItemId : undefined"
                [activeItemPath]="activeItemPath()"
                (itemClick)="onItemClick($event)"
                (menuFocus)="onMenuFocus($event)"
                (menuBlur)="onMenuBlur($event)"
                (menuKeydown)="onKeyDown($event)"
                (itemMouseEnter)="onItemMouseEnter($event)"
            ></p-tieredMenuSub>
        </div>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}')]), transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TieredMenuStyle]
})
export class TieredMenu extends BaseComponent implements OnInit, OnDestroy {
    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() set model(value: MenuItem[] | undefined) {
        this._model = value;
        this._processedItems = this.createProcessedItems(this._model || []);
    }
    get model(): MenuItem[] | undefined {
        return this._model;
    }
    /**
     * Defines if menu would displayed as a popup.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) popup: boolean | undefined;
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
     * The breakpoint to define the maximum width boundary.
     * @group Props
     */
    @Input() breakpoint: string = '960px';
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
     * Whether to show a root submenu on mouse over.
     * @defaultValue true
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoDisplay: boolean | undefined = true;
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
     * Current id state as a string.
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean = false;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number = 0;
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

    @ViewChild('rootmenu') rootmenu: TieredMenuSub | undefined;

    @ViewChild('container') containerViewChild: ElementRef<any> | undefined;
    /**
     * Template of the submenu icon.
     * @group Templates
     */
    @ContentChild('submenuicon') submenuIconTemplate: TemplateRef<any>;
    /**
     * Template of the item.
     * @group Templates
     */
    @ContentChild('item') itemTemplate: TemplateRef<any>;

    container: HTMLDivElement | undefined;

    outsideClickListener: VoidListener;

    resizeListener: VoidListener;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    target: any;

    relatedTarget: any;

    visible: boolean | undefined;

    relativeAlign: boolean | undefined;

    dirty: boolean = false;

    focused: boolean = false;

    activeItemPath = signal<any>([]);

    number = signal<number>(0);

    focusedItemInfo = signal<any>({ index: -1, level: 0, parentKey: '', item: null });

    searchValue: string = '';

    searchTimeout: any;

    _processedItems: any[];

    _model: MenuItem[] | undefined;

    _componentStyle = inject(TieredMenuStyle);

    private matchMediaListener: () => void;

    private query: MediaQueryList;

    public queryMatches: boolean;

    get visibleItems() {
        const processedItem = this.activeItemPath().find((p) => p.key === this.focusedItemInfo().parentKey);
        return processedItem ? processedItem.items : this.processedItems;
    }

    get processedItems() {
        if (!this._processedItems || !this._processedItems.length) {
            this._processedItems = this.createProcessedItems(this.model || []);
        }
        return this._processedItems;
    }

    get focusedItemId() {
        const focusedItemInfo = this.focusedItemInfo();
        return focusedItemInfo.item?.id ? focusedItemInfo.item.id : focusedItemInfo.index !== -1 ? `${this.id}${isNotEmpty(focusedItemInfo.parentKey) ? '_' + focusedItemInfo.parentKey : ''}_${focusedItemInfo.index}` : null;
    }

    constructor(public overlayService: OverlayService) {
        super();
        effect(() => {
            const path = this.activeItemPath();

            if (isNotEmpty(path)) {
                this.bindOutsideClickListener();
                this.bindResizeListener();
            } else {
                this.unbindOutsideClickListener();
                this.unbindResizeListener();
            }
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.bindMatchMediaListener();
        this.id = this.id || uuid('pn_id_');
    }

    bindMatchMediaListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.matchMediaListener) {
                const query = window.matchMedia(`(max-width: ${this.breakpoint})`);

                this.query = query;
                this.queryMatches = query.matches;

                this.matchMediaListener = () => {
                    this.queryMatches = query.matches;
                };

                query.addEventListener('change', this.matchMediaListener);
            }
        }
    }

    unbindMatchMediaListener() {
        if (this.matchMediaListener) {
            this.query.removeEventListener('change', this.matchMediaListener);
            this.matchMediaListener = null;
        }
    }

    createProcessedItems(items: any, level: number = 0, parent: any = {}, parentKey: any = '') {
        const processedItems = [];

        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem = {
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };

                newItem['items'] = this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });

        return processedItems;
    }

    getItemProp(item: any, name: string) {
        return item ? resolve(item[name]) : undefined;
    }

    getProccessedItemLabel(processedItem: any) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }

    getItemLabel(item: any) {
        return this.getItemProp(item, 'label');
    }

    isProcessedItemGroup(processedItem: any): boolean {
        return processedItem && isNotEmpty(processedItem.items);
    }

    isSelected(processedItem: any): boolean {
        return this.activeItemPath().some((p) => p.key === processedItem.key);
    }

    isValidSelectedItem(processedItem: any): boolean {
        return this.isValidItem(processedItem) && this.isSelected(processedItem);
    }

    isValidItem(processedItem: any): boolean {
        return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item) && this.isItemVisible(processedItem.item);
    }

    isItemDisabled(item: any): boolean {
        return this.getItemProp(item, 'disabled');
    }

    isItemVisible(item: any): boolean {
        return this.getItemProp(item, 'visible') !== false;
    }

    isItemSeparator(item: any): boolean {
        return this.getItemProp(item, 'separator');
    }

    isItemMatched(processedItem: any): boolean {
        return this.isValidItem(processedItem) && this.getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }

    isProccessedItemGroup(processedItem: any): boolean {
        return processedItem && isNotEmpty(processedItem.items);
    }

    onOverlayClick(event: MouseEvent) {
        if (this.popup) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }
    }

    onItemClick(event: any) {
        const { originalEvent, processedItem } = event;
        const grouped = this.isProcessedItemGroup(processedItem);
        const root = isEmpty(processedItem.parent);
        const selected = this.isSelected(processedItem);

        if (selected) {
            const { index, key, level, parentKey, item } = processedItem;

            this.activeItemPath.set(this.activeItemPath().filter((p) => key !== p.key && key.startsWith(p.key)));
            this.focusedItemInfo.set({ index, level, parentKey, item });

            this.dirty = true;
            focus(this.rootmenu.sublistViewChild.nativeElement);
        } else {
            if (grouped) {
                this.onItemChange(event);
            } else {
                const rootProcessedItem = root ? processedItem : this.activeItemPath().find((p) => p.parentKey === '');
                this.hide(originalEvent);
                this.changeFocusedItemIndex(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);

                focus(this.rootmenu.sublistViewChild.nativeElement);
            }
        }
    }

    onItemMouseEnter(event: any) {
        if (!isTouchDevice()) {
            if (this.dirty) {
                this.onItemChange(event, 'hover');
            }
        } else {
            this.onItemChange({ event, processedItem: event.processedItem, focus: this.autoDisplay }, 'hover');
        }
    }

    onKeyDown(event: KeyboardEvent) {
        const metaKey = event.metaKey || event.ctrlKey;

        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;

            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;

            case 'ArrowRight':
                this.onArrowRightKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            case 'Space':
                this.onSpaceKey(event);
                break;

            case 'Enter':
                this.onEnterKey(event);
                break;

            case 'Escape':
                this.onEscapeKey(event);
                break;

            case 'Tab':
                this.onTabKey(event);
                break;

            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;

            default:
                if (!metaKey && isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }

                break;
        }
    }

    onArrowDownKey(event: KeyboardEvent) {
        const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();

        this.changeFocusedItemIndex(event, itemIndex);
        event.preventDefault();
    }

    onArrowRightKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const grouped = this.isProccessedItemGroup(processedItem);
        const item = processedItem?.item;

        if (grouped) {
            this.onItemChange({ originalEvent: event, processedItem });
            this.focusedItemInfo.set({ index: -1, parentKey: processedItem.key, item });
            this.searchValue = '';
            this.onArrowDownKey(event);
        }

        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        if (event.altKey) {
            if (this.focusedItemInfo().index !== -1) {
                const processedItem = this.visibleItems[this.focusedItemInfo().index];
                const grouped = this.isProccessedItemGroup(processedItem);

                !grouped && this.onItemChange({ originalEvent: event, processedItem });
            }

            this.popup && this.hide(event, true);
            event.preventDefault();
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();

            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        }
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const parentItem = this.activeItemPath().find((p) => p.key === processedItem.parentKey);
        const root = isEmpty(processedItem.parent);

        if (!root) {
            this.focusedItemInfo.set({ index: -1, parentKey: parentItem ? parentItem.parentKey : '', item: processedItem.item });
            this.searchValue = '';
            this.onArrowDownKey(event);
        }

        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItemInfo().parentKey);
        this.activeItemPath.set(activeItemPath);

        event.preventDefault();
    }

    onHomeKey(event: KeyboardEvent) {
        this.changeFocusedItemIndex(event, this.findFirstItemIndex());
        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent) {
        this.changeFocusedItemIndex(event, this.findLastItemIndex());
        event.preventDefault();
    }

    onSpaceKey(event: KeyboardEvent) {
        this.onEnterKey(event);
    }

    onEscapeKey(event: KeyboardEvent) {
        this.hide(event, true);
        this.focusedItemInfo().index = this.findFirstFocusedItemIndex();

        event.preventDefault();
    }

    onTabKey(event: KeyboardEvent) {
        if (this.focusedItemInfo().index !== -1) {
            const processedItem = this.visibleItems[this.focusedItemInfo().index];
            const grouped = this.isProccessedItemGroup(processedItem);

            !grouped && this.onItemChange({ originalEvent: event, processedItem });
        }

        this.hide();
    }

    onEnterKey(event: KeyboardEvent) {
        if (this.focusedItemInfo().index !== -1) {
            const element = <any>findSingle(this.rootmenu.el.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && <any>findSingle(element, 'a[data-pc-section="action"]');

            anchorElement ? anchorElement.click() : element && element.click();

            if (!this.popup) {
                const processedItem = this.visibleItems[this.focusedItemInfo().index];
                const grouped = this.isProccessedItemGroup(processedItem);

                !grouped && (this.focusedItemInfo().index = this.findFirstFocusedItemIndex());
            }
        }

        event.preventDefault();
    }

    onItemChange(event: any, type?: string | undefined) {
        const { processedItem, isFocus } = event;

        if (isEmpty(processedItem)) return;

        const { index, key, level, parentKey, items, item } = processedItem;
        const grouped = isNotEmpty(items);
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== parentKey && p.parentKey !== key);

        grouped && activeItemPath.push(processedItem);
        this.focusedItemInfo.set({ index, level, parentKey, item });

        grouped && (this.dirty = true);
        isFocus && focus(this.rootmenu.sublistViewChild.nativeElement);

        if (type === 'hover' && this.queryMatches) {
            return;
        }

        this.activeItemPath.set(activeItemPath);
    }

    onMenuFocus(event: any) {
        this.focused = true;
        if (this.focusedItemInfo().index === -1 && !this.popup) {
            // this.onArrowDownKey(event);
        }
    }

    onMenuBlur(event: any) {
        this.focused = false;
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
        this.searchValue = '';
        this.dirty = false;
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
                    this.bindOutsideClickListener();
                    this.bindResizeListener();
                    this.bindScrollListener();
                    focus(this.rootmenu.sublistViewChild.nativeElement);
                    this.scrollInView();
                }
                break;

            case 'void':
                this.onOverlayHide();
                this.onHide.emit({});
                break;
        }
    }

    alignOverlay() {
        if (this.relativeAlign) relativePosition(this.container, this.target);
        else absolutePosition(this.container, this.target);
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
            else appendChild(this.container, this.appendTo);
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
     * @group Method
     */
    hide(event?, isFocus?: boolean) {
        if (this.popup) {
            this.onHide.emit({});
            this.visible = false;
        }
        this.activeItemPath.set([]);
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '' });

        isFocus && focus(this.relatedTarget || this.target || this.rootmenu.sublistViewChild.nativeElement);
        this.dirty = false;
    }

    /**
     * Toggles the visibility of the popup menu.
     * @param {Event} event - Browser event.
     * @group Method
     */
    toggle(event: any) {
        this.visible ? this.hide(event, true) : this.show(event);
    }

    /**
     * Displays the popup menu.
     * @param {Event} even - Browser event.
     * @group Method
     */
    show(event: any, isFocus?) {
        if (this.popup) {
            this.visible = true;
            this.target = this.target || event.currentTarget;
            this.relatedTarget = event.relatedTarget || null;
            this.relativeAlign = event?.relativeAlign || null;
        }

        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '' });

        isFocus && focus(this.rootmenu.sublistViewChild.nativeElement);

        this.cd.markForCheck();
    }

    searchItems(event: any, char: string) {
        this.searchValue = (this.searchValue || '') + char;

        let itemIndex = -1;
        let matched = false;

        if (this.focusedItemInfo().index !== -1) {
            itemIndex = this.visibleItems.slice(this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem));
            itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem)) : itemIndex + this.focusedItemInfo().index;
        } else {
            itemIndex = this.visibleItems.findIndex((processedItem) => this.isItemMatched(processedItem));
        }

        if (itemIndex !== -1) {
            matched = true;
        }

        if (itemIndex === -1 && this.focusedItemInfo().index === -1) {
            itemIndex = this.findFirstFocusedItemIndex();
        }

        if (itemIndex !== -1) {
            this.changeFocusedItemIndex(event, itemIndex);
        }

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = null;
        }, 500);

        return matched;
    }

    findLastFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
    }

    findLastItemIndex() {
        return findLastIndex(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
    }

    findPrevItemIndex(index: number) {
        const matchedItemIndex = index > 0 ? findLastIndex(this.visibleItems.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;

        return matchedItemIndex > -1 ? matchedItemIndex : index;
    }

    findNextItemIndex(index: number) {
        const matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex((processedItem) => this.isValidItem(processedItem)) : -1;

        return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    }

    findFirstFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();

        return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
    }

    findFirstItemIndex() {
        return this.visibleItems.findIndex((processedItem) => this.isValidItem(processedItem));
    }

    findSelectedItemIndex() {
        return this.visibleItems.findIndex((processedItem) => this.isValidSelectedItem(processedItem));
    }

    changeFocusedItemIndex(event: any, index: number) {
        if (this.focusedItemInfo().index !== index) {
            const focusedItemInfo = this.focusedItemInfo();
            this.focusedItemInfo.set({ ...focusedItemInfo, item: this.visibleItems[index].item, index });
            this.scrollInView();
        }
    }

    scrollInView(index: number = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedItemId;
        const element = findSingle(this.rootmenu.el.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, (event) => {
                if (this.visible) {
                    this.hide(event, true);
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
            this.scrollHandler = null;
        }
    }

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                    if (!isTouchDevice()) {
                        this.hide(event, true);
                    }
                });
            }
        }
    }

    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    const isOutsideContainer = this.containerViewChild && !this.containerViewChild.nativeElement.contains(event.target);
                    const isOutsideTarget = this.popup ? !(this.target && (this.target === event.target || this.target.contains(event.target))) : true;
                    if (isOutsideContainer && isOutsideTarget) {
                        this.hide();
                    }
                });
            }
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }

    unbindResizeListener() {
        if (this.resizeListener) {
            this.resizeListener();
            this.resizeListener = null;
        }
    }

    onOverlayHide() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        this.unbindScrollListener();

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
        this.unbindMatchMediaListener();
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [TieredMenu, SharedModule],
    exports: [TieredMenu, SharedModule]
})
export class TieredMenuModule {}
