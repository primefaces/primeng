import { AnimationEvent, animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
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
    OnInit,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    ViewRef,
    booleanAttribute,
    effect,
    forwardRef,
    numberAttribute,
    signal
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem, OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { CaretLeftIcon } from 'primeng/icons/caretleft';

@Component({
    selector: 'p-slideMenuSub',
    template: `
        <ul
            #sublist
            role="menu"
            [ngClass]="{ 'p-submenu-list': !root, 'p-slidemenu-root-list': root, 'p-active-submenu': isActive }"
            [id]="menuId + '_list'"
            [ngStyle]="{
                'width.px': menuWidth,
                'left.px': root ? slideMenu.left : slideMenu.menuWidth,
                'transition-property': root ? 'left' : 'none',
                'transition-duration': effectDuration + 'ms',
                'transition-timing-function': easing
            }"
            [tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-aria-activedescendant]="focusedItemId"
            [attr.aria-orientation]="'vertical'"
            [attr.data-pc-section]="'menu'"
            (keydown)="menuKeydown.emit($event)"
            (focusin)="menuFocus.emit($event)"
            [attr.data-pc-state]="isActive ? 'active' : 'inactive'"
        >
            <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
                <li
                    *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                    [id]="getItemId(processedItem)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getSeparatorItemClass(processedItem)"
                    role="separator"
                    [attr.data-pc-section]="'separator'"
                ></li>
                <li
                    #listItem
                    *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                    role="menuitem"
                    [id]="getItemId(processedItem)"
                    [attr.data-pc-section]="'menuitem'"
                    [attr.data-p-highlight]="isItemActive(processedItem)"
                    [attr.data-p-focused]="isItemFocused(processedItem)"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [attr.aria-label]="getItemLabel(processedItem)"
                    [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                    [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getItemClass(processedItem)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div [attr.data-pc-section]="'content'" class="p-menuitem-content" (click)="onItemClick($event, processedItem)" (mouseenter)="itemMouseEnter.emit({ originalEvent: $event, processedItem })">
                        <a
                            *ngIf="!getItemProp(processedItem, 'routerLink')"
                            [attr.href]="getItemProp(processedItem, 'url')"
                            [attr.aria-hidden]="true"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.data-pc-section]="'action'"
                            [target]="getItemProp(processedItem, 'target')"
                            [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                            [attr.tabindex]="-1"
                            pRipple
                        >
                            <span
                                *ngIf="getItemProp(processedItem, 'icon')"
                                class="p-menuitem-icon"
                                [ngClass]="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.data-pc-section]="'icon'"
                                [attr.aria-hidden]="true"
                                [attr.tabindex]="-1"
                            >
                            </span>
                            <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menuitem-text" [attr.data-pc-section]="'label'">
                                {{ getItemLabel(processedItem) }}
                            </span>
                            <ng-template #htmlLabel>
                                <span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                            </ng-template>
                            <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <AngleRightIcon *ngIf="!slideMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true" />
                                <ng-template *ngTemplateOutlet="slideMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                            </ng-container>
                        </a>
                        <a
                            *ngIf="getItemProp(processedItem, 'routerLink')"
                            [routerLink]="getItemProp(processedItem, 'routerLink')"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.tabindex]="-1"
                            [attr.aria-hidden]="true"
                            [attr.data-pc-section]="'action'"
                            [queryParams]="getItemProp(processedItem, 'queryParams')"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                            [target]="getItemProp(processedItem, 'target')"
                            [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
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
                                class="p-menuitem-icon"
                                [ngClass]="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.data-pc-section]="'icon'"
                                [attr.aria-hidden]="true"
                                [attr.tabindex]="-1"
                            >
                            </span>
                            <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menuitem-text" [attr.data-pc-section]="'label'">
                                {{ getItemLabel(processedItem) }}
                            </span>
                            <ng-template #htmlLabel>
                                <span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                            </ng-template>
                            <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <AngleRightIcon *ngIf="!slideMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true" />
                                <ng-template *ngTemplateOutlet="slideMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                            </ng-container>
                        </a>
                    </div>

                    <p-slideMenuSub
                        *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                        class="p-submenu"
                        [items]="processedItem.items"
                        [autoDisplay]="autoDisplay"
                        [menuId]="menuId"
                        [activeItemPath]="activeItemPath"
                        [focusedItemId]="focusedItemId"
                        [level]="level + 1"
                        [menuWidth]="menuWidth"
                        (itemClick)="itemClick.emit($event)"
                        (itemMouseEnter)="itemMouseEnter.emit($event)"
                    ></p-slideMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class SlideMenuSub {
    @Input() items: any[];

    @Input({ transform: numberAttribute }) menuWidth: number;

    @Input({ transform: booleanAttribute }) root: boolean | undefined = false;

    @Input() easing: string = 'ease-out';

    @Input({ transform: numberAttribute }) effectDuration: number;

    @Input({ transform: booleanAttribute }) autoDisplay: boolean | undefined;

    @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;

    @Input({ transform: numberAttribute }) baseZIndex: number = 0;

    @Input({ transform: booleanAttribute }) popup: boolean | undefined;

    @Input() menuId: string | undefined;

    @Input() ariaLabel: string | undefined;

    @Input() ariaLabelledBy: string | undefined;

    @Input({ transform: numberAttribute }) level: number = 0;

    @Input() focusedItemId: string | undefined;

    @Input() activeItemPath: any[];

    @Input({ transform: numberAttribute }) tabindex: number = 0;

    @Output() itemClick: EventEmitter<any> = new EventEmitter();

    @Output() itemMouseEnter: EventEmitter<any> = new EventEmitter();

    @Output() menuFocus: EventEmitter<any> = new EventEmitter();

    @Output() menuBlur: EventEmitter<any> = new EventEmitter();

    @Output() menuKeydown: EventEmitter<any> = new EventEmitter();

    @ViewChild('sublist', { static: true }) sublistViewChild: ElementRef;

    get isActive() {
        return -this.slideMenu.left == this.level * this.menuWidth;
    }

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public renderer: Renderer2, private cd: ChangeDetectorRef, @Inject(forwardRef(() => SlideMenu)) public slideMenu: SlideMenu) {}

    getItemProp(processedItem: any, name: string, params: any | null = null) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }

    getItemId(processedItem: any): string {
        return processedItem.item && processedItem.item?.id ? processedItem.item.id : `${this.menuId}_${processedItem.key}`;
    }

    getItemKey(processedItem: any): string {
        return this.getItemId(processedItem);
    }

    getItemClass(processedItem: any) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-menuitem': true,
            'p-menuitem-active': this.isItemActive(processedItem),
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
            'p-menuitem-separator': true
        };
    }

    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }

    getAriaPosInset(index: number) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }

    isItemVisible(processedItem: any): boolean {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemActive(processedItem: any): boolean {
        if (this.activeItemPath) {
            return this.activeItemPath.some((path) => path.key === processedItem.key);
        }
    }

    isItemDisabled(processedItem: any): boolean {
        return this.getItemProp(processedItem, 'disabled');
    }

    isItemFocused(processedItem: any): boolean {
        return this.focusedItemId === this.getItemId(processedItem);
    }

    isItemGroup(processedItem: any): boolean {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }

    onItemClick(event: any, processedItem: any) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
        event.preventDefault();
    }

    onMenuKeyDown(event: KeyboardEvent) {
        this.menuKeydown.emit(event);
    }
}
/**
 * SlideMenu displays submenus with slide animation.
 * @group Components
 */
@Component({
    selector: 'p-slideMenu',
    template: `
        <div
            #container
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'slidemenu'"
            [id]="id"
            [ngClass]="{ 'p-slidemenu p-component': true, 'p-slidemenu-overlay': popup }"
            [class]="styleClass"
            [ngStyle]="style"
            (click)="onOverlayClick($event)"
            [@overlayAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            [@.disabled]="popup !== true"
            (@overlayAnimation.start)="onOverlayAnimationStart($event)"
            (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
            *ngIf="!popup || visible"
        >
            <div
                class="p-slidemenu-wrapper"
                [ngStyle]="{
                    height: left ? viewportHeight + 'px' : 'auto',
                    width: menuWidth + 'px'
                }"
            >
                <div #slideMenuContent class="p-slidemenu-content" (focus)="logFocus($event, slideMenuContent)">
                    <p-slideMenuSub
                        #rootmenu
                        [root]="true"
                        [items]="processedItems"
                        [menuId]="id"
                        [tabindex]="!disabled ? tabindex : -1"
                        [ariaLabel]="ariaLabel"
                        [ariaLabelledBy]="ariaLabelledBy"
                        [baseZIndex]="baseZIndex"
                        [autoZIndex]="autoZIndex"
                        [autoDisplay]="autoDisplay"
                        [menuWidth]="menuWidth"
                        [popup]="popup"
                        [effectDuration]="effectDuration"
                        [easing]="easing"
                        [focusedItemId]="focused ? focusedItemId : undefined"
                        [activeItemPath]="activeItemPath()"
                        (itemClick)="onItemClick($event)"
                        (menuFocus)="onMenuFocus($event)"
                        (menuKeydown)="onKeyDown($event)"
                        (itemMouseEnter)="onItemMouseEnter($event)"
                    ></p-slideMenuSub>
                </div>
                <a
                    #backward
                    class="p-slidemenu-backward p-menuitem-link"
                    tabindex="0"
                    [ngStyle]="{
                        display: left ? 'block' : 'none'
                    }"
                    (click)="goBack($event)"
                    (keydown)="onNavigationKeyDown($event)"
                    [attr.data-pc-section]="'navigation'"
                >
                    <CaretLeftIcon *ngIf="!backIconTemplate" [styleClass]="'p-slidemenu-backward-icon'" [ngStyle]="{ 'vertical-align': 'middle' }" />
                    <ng-template *ngTemplateOutlet="backIconTemplate"></ng-template>
                    <span>{{ backLabel }}</span>
                </a>
            </div>
        </div>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}')]), transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./slidemenu.css'],
    host: {
        class: 'p-element'
    }
})
export class SlideMenu implements OnInit, AfterContentInit, OnDestroy {
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
     * Width of the submenus.
     * @group Props
     */
    @Input({ transform: numberAttribute }) menuWidth: number = 190;
    /**
     * Height of the scrollable area, a scrollbar appears if a menu height is longer than this value.
     * @group Props
     */
    @Input({ transform: numberAttribute }) viewportHeight: number = 180;
    /**
     * Duration of the sliding animation in milliseconds.
     * @group Props
     */
    @Input({ transform: numberAttribute }) effectDuration: number = 250;
    /**
     * Easing animation to use for sliding.
     * @group Props
     */
    @Input() easing: string = 'ease-out';
    /**
     * Label of element to navigate back.
     * @group Props
     */
    @Input() backLabel: string = 'Back';
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

    @ViewChild('rootmenu') rootmenu: SlideMenuSub | undefined;

    @ViewChild('container') containerViewChild: ElementRef<any> | undefined;

    @ViewChild('backward') set backward(element: ElementRef) {
        this.backwardViewChild = element;
    }

    @ViewChild('slideMenuContent') slideMenuContentViewChild: ElementRef<any> | undefined;

    submenuIconTemplate: Nullable<TemplateRef<any>>;

    backIconTemplate: TemplateRef<any>;

    outsideClickListener: VoidListener;

    resizeListener: VoidListener;

    transitionEndListener: VoidListener;

    transitionStartListener: VoidListener;

    backwardViewChild: ElementRef;

    transition: boolean = false;

    left: number = 0;

    animating: boolean = false;

    target: any;

    visible: boolean | undefined;

    relativeAlign: boolean | undefined;

    private window: Window;

    focused: boolean = false;

    activeItemPath = signal<any>([]);

    focusedItemInfo = signal<any>({ index: -1, level: 0, parentKey: '' });

    searchValue: string = '';

    searchTimeout: any;

    _processedItems: any[];

    _model: MenuItem[] | undefined;

    container: any;

    itemClick: boolean = false;

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
        const focusedItem = this.focusedItemInfo();
        return focusedItem.item && focusedItem.item?.id ? focusedItem.item.id : focusedItem.index !== -1 ? `${this.id}${ObjectUtils.isNotEmpty(focusedItem.parentKey) ? '_' + focusedItem.parentKey : ''}_${focusedItem.index}` : null;
    }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        public config: PrimeNGConfig,
        public overlayService: OverlayService
    ) {
        this.window = this.document.defaultView as Window;
        effect(() => {
            const path = this.activeItemPath();
            if (this.popup) {
                if (ObjectUtils.isNotEmpty(path)) {
                    this.bindOutsideClickListener();
                    this.bindResizeListener();
                } else {
                    this.unbindOutsideClickListener();
                    this.unbindResizeListener();
                }
            }
        });
    }

    documentFocusListener: any;

    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'backicon':
                    this.backIconTemplate = item.template;
                    break;

                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
            }
        });
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
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }

    getProccessedItemLabel(processedItem: any) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }

    getItemLabel(item: any) {
        return this.getItemProp(item, 'label');
    }

    isProcessedItemGroup(processedItem: any): boolean {
        return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    }

    isSelected(processedItem: any): boolean {
        return this.activeItemPath().some((p) => p.key === processedItem.key);
    }

    isValidSelectedItem(processedItem: any): boolean {
        return this.isValidItem(processedItem) && this.isSelected(processedItem);
    }

    isValidItem(processedItem: any): boolean {
        return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
    }

    isItemDisabled(item: any): boolean {
        return this.getItemProp(item, 'disabled');
    }

    isItemSeparator(item: any): boolean {
        return this.getItemProp(item, 'separator');
    }

    isItemMatched(processedItem: any): boolean {
        return this.isValidItem(processedItem) && this.getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }

    isProccessedItemGroup(processedItem: any): boolean {
        return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    }

    onOverlayClick(event: MouseEvent) {
        if (this.popup) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }
    }

    goBack(event) {
        this.animate('left');

        event.stopPropagation();
        event.preventDefault();
    }

    onItemClick(event: any) {
        if (this.transition) {
            return;
        } else {
            if (!this.itemClick) {
                this.itemClick = true;
                this.onMenuFocus();
            }
            const { originalEvent, processedItem } = event;
            const grouped = this.isProcessedItemGroup(processedItem);
            const focusedItemInfo = this.focusedItemInfo();

            if (grouped) {
                this.focusedItemInfo.set({ ...focusedItemInfo, index: -1, level: focusedItemInfo.level + 1, parentKey: processedItem.key, item: processedItem.item });
                this.animate('right');
            } else {
                this.onItemChange(event);
                this.popup && this.hide();
            }
        }
    }

    onItemMouseEnter(event: any) {
        this.onItemChange(event);
    }

    onKeyDown(event: KeyboardEvent) {
        if (!this.transition) {
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
                    if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                        this.searchItems(event, event.key);
                    }

                    break;
            }
        }
    }

    onNavigationKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.onArrowLeftKey(event);
                const focusedItemInfo = this.focusedItemInfo();
                this.focusedItemInfo.set({
                    ...focusedItemInfo,
                    index: -1,
                    item: null
                });
                break;
            default:
                break;
        }
    }

    animate(to: string) {
        switch (to) {
            case 'right':
                this.left -= this.menuWidth;
                break;
            case 'left':
                this.left += this.menuWidth;
                break;

            default:
                break;
        }

        this.animating = true;
        setTimeout(() => (this.animating = false), this.effectDuration);
    }

    onArrowDownKey(event: KeyboardEvent) {
        const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();

        this.changeFocusedItemIndex(event, itemIndex);
        event.preventDefault();
    }

    onArrowRightKey(event: KeyboardEvent) {
        const focusedItemInfo = this.focusedItemInfo();

        if (focusedItemInfo.index === -1) {
            focusedItemInfo.index = 0;
        }

        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const grouped = this.isProccessedItemGroup(processedItem);
        if (grouped) {
            let { index, level, key, item } = processedItem;
            this.onItemChange({ originalEvent: event, processedItem });
            this.focusedItemInfo.set({ index: 0, level: level, parentKey: key });

            this.searchValue = '';
            this.animate('right');
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
        const focusedItemInfo = this.focusedItemInfo();
        if (focusedItemInfo.index === -1) {
            focusedItemInfo.index = 0;
        }

        const processedItem = this.visibleItems[focusedItemInfo.index];
        const parentItem = this.activeItemPath().find((p) => p.key === processedItem.parentKey);
        const root = ObjectUtils.isEmpty(processedItem.parent);

        if (!root) {
            let { level, index, parentKey } = parentItem;
            this.focusedItemInfo.set({ index, level, parentKey, item: parentItem.item });
            this.searchValue = '';
        }

        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== focusedItemInfo.parentKey);
        this.activeItemPath.set(activeItemPath);
        parentItem && this.animate('left');
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
        if (this.popup) {
            this.hide(event, true);
            const focusedItemInfo = this.focusedItemInfo();
            this.focusedItemInfo.set({
                ...focusedItemInfo,
                index: this.findLastFocusedItemIndex(),
                item: null
            });

            event.preventDefault();
        }
    }

    onTabKey(event: KeyboardEvent) {
        if (this.backwardViewChild.nativeElement.style.display !== 'none') {
            this.backwardViewChild.nativeElement.focus();
        }

        if (this.popup && !this.containerViewChild.nativeElement.contains(event.target)) {
            this.hide();
        }
        event.preventDefault();
    }

    onEnterKey(event: KeyboardEvent) {
        if (this.focusedItemInfo().index !== -1) {
            const processedItem = this.visibleItems[this.focusedItemInfo().index];
            const grouped = this.isProccessedItemGroup(processedItem);

            if (grouped) {
                this.onArrowRightKey(event);
            } else {
                const element = DomHandler.findSingle(this.rootmenu.el.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
                const anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');

                anchorElement ? anchorElement.click() : element && element.click();

                const focusedItemInfo = this.focusedItemInfo();
                this.focusedItemInfo.set({
                    ...focusedItemInfo,
                    index: processedItem.index,
                    item: processedItem.item
                });
            }
        }

        event.preventDefault();
    }

    onItemChange(event: any) {
        const { processedItem, isFocus } = event;
        if (ObjectUtils.isEmpty(processedItem)) return;

        const { index, key, level, parentKey, items, item } = processedItem;
        const grouped = ObjectUtils.isNotEmpty(items);
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== parentKey && p.parentKey !== key);

        grouped && activeItemPath.push(processedItem);
        this.focusedItemInfo.set({ index, level, parentKey, item });
        this.activeItemPath.set(activeItemPath);
        isFocus && DomHandler.focus(this.rootmenu.sublistViewChild.nativeElement);
    }

    onMenuFocus() {
        this.focused = true;

        this.bindOutsideClickListener();
        this.bindTransitionListeners();

        if (!this.left && this.focusedItemInfo().level > 0) {
            this.focusedItemInfo.set({ index: 0, level: 0, parentKey: '', item: this.findVisibleItem(0).item });
        }

        if (this.focusedItemInfo().index === -1 && this.left < 0) {
            this.focusedItemInfo.set({ ...this.focusedItemInfo(), index: 0 });
        }

        if (this.focusedItemInfo().index === -1 && !this.left) {
            this.focusedItemInfo.set({ index: 0, level: 0, parentKey: '', item: this.findVisibleItem(0).item });
        }
    }

    onMenuBlur() {
        this.focused = false;
        this.popup && this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
        if (!this.popup) {
            this.focusedItemInfo.set({
                ...this.focusedItemInfo(),
                index: -1,
                item: null
            });
        }
        this.searchValue = '';
        !this.popup && this.unbindOutsideClickListener();
    }

    activeLevel = signal<number>(0);

    bindTransitionListeners() {
        if (!this.transitionStartListener) {
            this.transitionStartListener = this.renderer.listen(this.rootmenu.sublistViewChild.nativeElement, 'transitionstart', (event) => {
                this.transition = true;
                event.preventDefault();
            });
        }
        if (!this.transitionEndListener) {
            this.transitionEndListener = this.renderer.listen(this.rootmenu.sublistViewChild.nativeElement, 'transitionend', (event) => {
                const activeMenu = DomHandler.findSingle(this.rootmenu.el.nativeElement, `ul[data-pc-state="active"]`);
                const activeLevel = DomHandler.getAttribute(activeMenu.firstElementChild, 'aria-level') - 1;
                this.activeLevel.set(activeLevel);

                if (!this.left) {
                    this.rootmenu.sublistViewChild.nativeElement.focus();
                } else {
                    const activeLevel = DomHandler.getAttribute(activeMenu.firstElementChild, 'aria-level') - 1;
                    this.activeLevel.set(activeLevel);

                    if (this.focusedItemInfo().level > this.activeLevel()) {
                        let newActiveItemPath = this.activeItemPath().slice(0, this.activeItemPath().length - 1);
                        let lastActiveParent = newActiveItemPath[newActiveItemPath.length - 1];
                        this.focusedItemInfo.set({ index: -1, level: this.activeLevel(), parentKey: lastActiveParent.key });
                        this.activeItemPath.set(newActiveItemPath);
                    }
                }
                this.transition = false;
                event.preventDefault();
            });
        }
    }

    unbindTransitionListeners() {
        if (this.transitionEndListener) {
            this.transitionEndListener();
            this.transitionEndListener = null;
        }

        if (this.transitionStartListener) {
            this.transitionStartListener();
            this.transitionStartListener = null;
        }
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

                    DomHandler.focus(this.rootmenu.sublistViewChild.nativeElement);
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
            if (this.appendTo === 'body') this.renderer.appendChild(this.document.body, this.containerViewChild.nativeElement);
            else DomHandler.appendChild(this.container, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.containerViewChild && this.appendTo) {
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
        isFocus && DomHandler.focus(this.target || this.rootmenu.sublistViewChild.nativeElement);
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
            this.target = event.currentTarget;
        }

        this.focusedItemInfo.set({ index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '' });

        if (!this.popup) {
            isFocus && DomHandler.focus(this.rootmenu.sublistViewChild.nativeElement);
        }
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

    findVisibleItem(index) {
        return ObjectUtils.isNotEmpty(this.visibleItems) ? this.visibleItems[index] : null;
    }

    findLastFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
    }

    findLastItemIndex() {
        return ObjectUtils.findLastIndex(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
    }

    findPrevItemIndex(index: number) {
        const matchedItemIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;

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
            this.focusedItemInfo.set({ ...this.focusedItemInfo(), index });
            this.scrollInView();
        }
    }

    scrollInView(index: number = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedItemId;
        const element = DomHandler.findSingle(this.rootmenu.el.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                    if (!DomHandler.isTouchDevice()) {
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

                    if (this.popup) {
                        if (isOutsideContainer && isOutsideTarget) {
                            this.onMenuBlur();
                            this.hide();
                        }
                    } else {
                        if (isOutsideContainer && isOutsideTarget && this.focused) {
                            this.onMenuBlur();
                        }
                    }
                });
            }
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            this.outsideClickListener();
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
        this.left = 0;

        if (!(this.cd as ViewRef).destroyed) {
            this.target = null;
        }

        if (this.container) {
            this.container = null;
        }
    }

    ngOnDestroy() {
        if (this.popup) {
            if (this.container && this.autoZIndex) {
                ZIndexUtils.clear(this.container);
            }

            this.restoreOverlayAppend();
            this.onOverlayHide();
        }

        this.unbindTransitionListeners();
    }
}

@NgModule({
    imports: [CommonModule, RouterModule, RippleModule, TooltipModule, AngleRightIcon, SharedModule, CaretLeftIcon],
    exports: [SlideMenu, RouterModule, TooltipModule, SharedModule],
    declarations: [SlideMenu, SlideMenuSub]
})
export class SlideMenuModule {}
