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
    booleanAttribute,
    effect,
    forwardRef,
    numberAttribute,
    signal
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MegaMenuItem, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { VoidListener } from 'primeng/ts-helpers';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';

@Component({
    selector: 'p-megaMenuSub',
    template: `
        <ul
            *ngIf="isSubmenuVisible(submenu)"
            #menubar
            [ngClass]="{ 'p-megamenu-root-list': root, 'p-submenu-list p-megamenu-submenu': !root }"
            [attr.role]="root ? 'menubar' : 'menu'"
            [attr.id]="id"
            [attr.aria-orientation]="orientation"
            [tabindex]="tabindex"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="root ? 'root' : 'submenu'"
            (keydown)="menuKeydown.emit($event)"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
        >
            <li *ngIf="submenu" [ngClass]="getSubmenuHeaderClass(submenu)" [style]="getItemProp(submenu, 'style')" role="presentation">{{ getItemLabel(submenu) }}</li>
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
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getItemClass(processedItem)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" [attr.data-pc-section]="'content'" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({$event, processedItem})">
                        <ng-container *ngIf="!itemTemplate">
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
                                    <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
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
                                    class="p-menuitem-icon"
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.aria-hidden]="true"
                                    [attr.tabindex]="-1"
                                ></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape'); else htmlRouteLabel">{{ getItemLabel(processedItem) }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                                </ng-container>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)" class="p-megamenu-panel" [attr.data-pc-section]="'panel'">
                        <div class="p-megamenu-grid" [attr.data-pc-section]="'grid'">
                            <div *ngFor="let col of processedItem.items" [ngClass]="getColumnClass(processedItem)">
                                <p-megaMenuSub
                                    *ngFor="let submenu of col"
                                    [id]="getSubListId(submenu)"
                                    [submenu]="submenu"
                                    [items]="submenu.items"
                                    [itemTemplate]="itemTemplate"
                                    [menuId]="menuId"
                                    [focusedItemId]="focusedItemId"
                                    [level]="level + 1"
                                    [root]="false"
                                    (itemClick)="itemClick.emit($event)"
                                    (itemMouseEnter)="onItemMouseEnter($event)"
                                >
                                </p-megaMenuSub>
                            </div>
                        </div>
                    </div>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class MegaMenuSub {
    @Input() id: string | undefined;

    @Input() items: any[] | undefined;

    @Input() itemTemplate: HTMLElement | undefined;

    @Input() menuId: string | undefined;

    @Input() ariaLabel: string | undefined;

    @Input() ariaLabelledBy: string | undefined;

    @Input({ transform: numberAttribute }) level: number = 0;

    @Input() focusedItemId: string | undefined;

    @Input({ transform: booleanAttribute }) disabled: boolean = false;

    @Input() orientation: string | undefined;

    @Input() activeItem: any;

    @Input() submenu: any;

    @Input({ transform: numberAttribute }) tabindex: number = 0;

    @Input({ transform: booleanAttribute }) root: boolean = false;

    @Output() itemClick: EventEmitter<any> = new EventEmitter();

    @Output() itemMouseEnter: EventEmitter<any> = new EventEmitter();

    @Output() menuFocus: EventEmitter<any> = new EventEmitter();

    @Output() menuBlur: EventEmitter<any> = new EventEmitter();

    @Output() menuKeydown: EventEmitter<any> = new EventEmitter();

    @ViewChild('menubar', { static: true }) menubarViewChild: ElementRef;

    constructor(public el: ElementRef, @Inject(forwardRef(() => MegaMenu)) public megaMenu: MegaMenu) {}

    onItemClick(event: any, processedItem: any) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }

    getItemProp(processedItem: any, name: string, params: any | null = null) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }

    getItemId(processedItem: any): string {
        return processedItem.item && processedItem.item?.id ? processedItem.item.id : `${this.menuId}_${processedItem.key}`;
    }

    getSubListId(processedItem) {
        return `${this.getItemId(processedItem)}_list`;
    }

    getItemClass(processedItem: any) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-menuitem': true,
            'p-menuitem-active p-highlight': this.isItemActive(processedItem),
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

    getColumnClass(processedItem) {
        let length = this.isItemGroup(processedItem) ? processedItem.items.length : 0;
        let columnClass;

        switch (length) {
            case 2:
                columnClass = 'p-megamenu-col-6';
                break;

            case 3:
                columnClass = 'p-megamenu-col-4';
                break;

            case 4:
                columnClass = 'p-megamenu-col-3';
                break;

            case 6:
                columnClass = 'p-megamenu-col-2';
                break;

            default:
                columnClass = 'p-megamenu-col-12';
                break;
        }

        return columnClass;
    }

    getSubmenuHeaderClass(processedItem) {
        return {
            'p-megamenu-submenu-header p-submenu-header': true,
            'p-disabled': this.isItemDisabled(processedItem),
            ...this.getItemProp(processedItem, 'class')
        };
    }

    isSubmenuVisible(submenu: any) {
        if (this.submenu && !this.root) {
            return this.isItemVisible(submenu);
        } else {
            return true;
        }
    }

    isItemVisible(processedItem: any): boolean {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemActive(processedItem) {
        return ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem.key === processedItem.key : false;
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

    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }

    getAriaPosInset(index: number) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }

    onItemMouseEnter(param: any) {
        const { event, processedItem } = param;
        this.itemMouseEnter.emit({ originalEvent: event, processedItem });
    }
}
/**
 * MegaMenu is navigation component that displays submenus together.
 * @group Components
 */
@Component({
    selector: 'p-megaMenu',
    template: `
        <div
            [ngClass]="{ 'p-megamenu p-component': true, 'p-megamenu-horizontal': orientation == 'horizontal', 'p-megamenu-vertical': orientation == 'vertical' }"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'megamenu'"
            [attr.id]="id"
        >
            <div class="p-megamenu-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <p-megaMenuSub
                #rootmenu
                [itemTemplate]="itemTemplate"
                [items]="processedItems"
                [attr.id]="id + '_list'"
                [menuId]="id"
                [root]="true"
                [orientation]="orientation"
                [ariaLabel]="ariaLabel"
                [disabled]="disabled"
                [tabindex]="!disabled ? tabindex : -1"
                [activeItem]="activeItem()"
                [level]="0"
                [ariaLabelledBy]="ariaLabelledBy"
                [focusedItemId]="focused ? focusedItemId : undefined"
                (itemClick)="onItemClick($event)"
                (menuFocus)="onMenuFocus($event)"
                (menuBlur)="onMenuBlur($event)"
                (menuKeydown)="onKeyDown($event)"
                (itemMouseEnter)="onItemMouseEnter($event)"
            ></p-megaMenuSub>
            <div class="p-megamenu-end" *ngIf="endTemplate; else legacy">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
            <ng-template #legacy>
                <div class="p-megamenu-end">
                    <ng-content></ng-content>
                </div>
            </ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./megamenu.css'],
    host: {
        class: 'p-element'
    }
})
export class MegaMenu implements AfterContentInit, OnDestroy, OnInit {
    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() set model(value: MegaMenuItem[] | undefined) {
        this._model = value;
        this._processedItems = this.createProcessedItems(this._model || []);
    }
    get model(): MegaMenuItem[] | undefined {
        return this._model;
    }
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
     * Defines the orientation.
     * @group Props
     */
    @Input() orientation: 'horizontal' | 'vertical' | string = 'horizontal';
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

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    @ViewChild('menubutton') menubutton: ElementRef | undefined;

    @ViewChild('rootmenu') rootmenu: MegaMenuSub | undefined;

    startTemplate: TemplateRef<any> | undefined;

    endTemplate: TemplateRef<any> | undefined;

    menuIconTemplate: TemplateRef<any> | undefined;

    submenuIconTemplate: TemplateRef<any> | undefined;

    itemTemplate: TemplateRef<any> | undefined;

    outsideClickListener: VoidListener;

    resizeListener: VoidListener;

    dirty: boolean = false;

    focused: boolean = false;

    activeItem = signal<any>(null);

    focusedItemInfo = signal<any>({ index: -1, level: 0, parentKey: '', item: null });

    searchValue: string = '';

    searchTimeout: any;

    _processedItems: any[];

    _model: MegaMenuItem[] | undefined;

    get visibleItems() {
        const processedItem = ObjectUtils.isNotEmpty(this.activeItem()) ? this.activeItem() : null;

        return processedItem ? processedItem.items.reduce((items, col) => {
                  col.forEach((submenu) => {
                      submenu.items.forEach((a) => {
                          items.push(a);
                      });
                  });

                  return items;
              }, [])
            : this.processedItems;
    }

    get processedItems() {
        if (!this._processedItems || !this._processedItems.length) {
            this._processedItems = this.createProcessedItems(this.model || []);
        }
        return this._processedItems;
    }

    get focusedItemId() {
        const focusedItem = this.focusedItemInfo();
        return focusedItem?.item && focusedItem.item?.id ? focusedItem.item.id : ObjectUtils.isNotEmpty(focusedItem.key) ? `${this.id}_${focusedItem.key}` : null;
    }

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, public el: ElementRef, public renderer: Renderer2, public config: PrimeNGConfig, public cd: ChangeDetectorRef) {
        effect(() => {
            const activeItem = this.activeItem();
            if (ObjectUtils.isNotEmpty(activeItem)) {
                this.bindOutsideClickListener();
                this.bindResizeListener();
            } else {
                this.unbindOutsideClickListener();
                this.unbindResizeListener();
            }
        });
    }

    ngOnInit(): void {
        this.id = this.id || UniqueComponentId();
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'start':
                    this.startTemplate = item.template;
                    break;

                case 'end':
                    this.endTemplate = item.template;
                    break;

                case 'menuicon':
                    this.menuIconTemplate = item.template;
                    break;

                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;

                case 'item':
                    this.itemTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    createProcessedItems(items, level = 0, parent = {}, parentKey = '', columnIndex?) {
        const processedItems = [];

        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + (columnIndex !== undefined ? columnIndex + '_' : '') + index;
                const newItem = {
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey,
                    columnIndex: columnIndex !== undefined ? columnIndex : (<any>parent).columnIndex !== undefined ? (<any>parent).columnIndex : index
                };

                newItem['items'] =
                    level === 0 && item.items && item.items.length > 0 ? item.items.map((_items, _index) => this.createProcessedItems(_items, level + 1, newItem, key, _index)) : this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }

    getItemProp(item: any, name: string) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }

    onItemClick(event: any) {
        const { originalEvent, processedItem } = event;
        const grouped = this.isProcessedItemGroup(processedItem);
        const root = ObjectUtils.isEmpty(processedItem.parent);
        const selected = this.isSelected(processedItem);

        if (selected) {
            const { index, key, parentKey, item } = processedItem;

            this.activeItem.set(null);
            this.focusedItemInfo.set({ index, key, parentKey, item });

            this.dirty = !root;
            DomHandler.focus(this.rootmenu?.menubarViewChild?.nativeElement);
        } else {
            if (grouped) {
                this.onItemChange(event);
            } else {
                const rootProcessedItem = root ? processedItem : this.activeItem();
                this.hide(originalEvent);
                this.changeFocusedItemInfo(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);

                DomHandler.focus(this.rootmenu?.menubarViewChild?.nativeElement);
            }
        }
    }

    onItemMouseEnter(event: any) {
        if (!DomHandler.isTouchDevice()) {
            this.onItemChange(event);
        }
    }

    scrollInView(index: number = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedItemId;
        const element = DomHandler.findSingle(this.rootmenu?.el.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    onItemChange(event: any) {
        const { processedItem, isFocus } = event;

        if (ObjectUtils.isEmpty(processedItem)) return;

        const { index, key, parentKey, items, item } = processedItem;
        const grouped = ObjectUtils.isNotEmpty(items);

        if (grouped) {
            this.activeItem.set(processedItem);
        }
        this.focusedItemInfo.set({ index, key, parentKey, item });

        grouped && (this.dirty = true);
        isFocus && DomHandler.focus(this.rootmenu?.menubarViewChild?.nativeElement);
    }

    hide(event?, isFocus?: boolean) {
        this.activeItem.set(null);
        this.focusedItemInfo.set({ index: -1, key: '', parentKey: '', item: null });

        isFocus && DomHandler.focus(this.rootmenu?.menubarViewChild?.nativeElement);
        this.dirty = false;
    }

    onMenuFocus(event: any) {
        this.focused = true;
        if (this.focusedItemInfo().index === -1) {
            const index = this.findFirstFocusedItemIndex();
            const processedItem = this.findVisibleItem(index);

            this.focusedItemInfo.set({ index, key: processedItem.key, parentKey: processedItem.parentKey, item: processedItem.item });
        }
    }

    onMenuBlur(event: any) {
        this.focused = false;
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
        this.searchValue = '';
        this.dirty = false;
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
                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }

                break;
        }
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

    isProcessedItemGroup(processedItem: any): boolean {
        return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    }

    isSelected(processedItem: any): boolean {
        return ObjectUtils.isNotEmpty(this.activeItem()) ? this.activeItem().key === processedItem.key : false;
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
            this.changeFocusedItemInfo(event, itemIndex);
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

    getProccessedItemLabel(processedItem: any) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }

    getItemLabel(item: any) {
        return this.getItemProp(item, 'label');
    }

    changeFocusedItemInfo(event, index) {
        const processedItem = this.findVisibleItem(index);
        if (ObjectUtils.isNotEmpty(processedItem)) {
            const { key, parentKey, item } = processedItem;
            this.focusedItemInfo.set({ index, key: key ? key : '', parentKey, item });
        }

        this.scrollInView();
    }

    onArrowDownKey(event: KeyboardEvent) {
        if (this.orientation === 'horizontal') {
            if (ObjectUtils.isNotEmpty(this.activeItem()) && this.activeItem().key === this.focusedItemInfo().key) {
                const { key, item } = this.activeItem();
                this.focusedItemInfo.set({ index: -1, key: '', parentKey: key, item });
            } else {
                const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                const grouped = this.isProccessedItemGroup(processedItem);

                if (grouped) {
                    const { parentKey, key, item } = processedItem;
                    this.onItemChange({ originalEvent: event, processedItem });
                    this.focusedItemInfo.set({ index: -1, key: key, parentKey: parentKey, item: item });
                    this.searchValue = '';
                }
            }
        }

        const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
        this.changeFocusedItemInfo(event, itemIndex);
        event.preventDefault();
    }

    onArrowRightKey(event: KeyboardEvent) {
        const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
        const grouped = this.isProccessedItemGroup(processedItem);

        if (grouped) {
            if (this.orientation === 'vertical') {
                if (ObjectUtils.isNotEmpty(this.activeItem()) && this.activeItem().key === processedItem.key) {
                    this.focusedItemInfo.set({ index: -1, key: '', parentKey: this.activeItem().key, item: processedItem.item });
                } else {
                    const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                    const grouped = this.isProccessedItemGroup(processedItem);

                    if (grouped) {
                        this.onItemChange({ originalEvent: event, processedItem });
                        this.focusedItemInfo.set({ index: -1, key: processedItem.key, parentKey: processedItem.parentKey, item: processedItem.item });
                        this.searchValue = '';
                    }
                }
            }

            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();

            this.changeFocusedItemInfo(event, itemIndex);
        } else {
            const columnIndex = processedItem.columnIndex + 1;
            const itemIndex = this.visibleItems.findIndex((item) => item.columnIndex === columnIndex);

            itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
        }

        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        if (event.altKey && this.orientation === 'horizontal') {
            if (this.focusedItemInfo().index !== -1) {
                const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                const grouped = this.isProccessedItemGroup(processedItem);

                if (!grouped && ObjectUtils.isNotEmpty(this.activeItem)) {
                    if (this.focusedItemInfo().index === 0) {
                        this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, parentKey: this.activeItem().parentKey, item: processedItem.item });
                        this.activeItem.set(null);
                    } else {
                        this.changeFocusedItemInfo(event, this.findFirstItemIndex());
                    }
                }
            }

            event.preventDefault();
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();

            this.changeFocusedItemInfo(event, itemIndex);
            event.preventDefault();
        }
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
        const grouped = this.isProccessedItemGroup(processedItem);

        if (grouped) {
            if (this.orientation === 'horizontal') {
                const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();

                this.changeFocusedItemInfo(event, itemIndex);
            }
        } else {
            if (this.orientation === 'vertical' && ObjectUtils.isNotEmpty(this.activeItem())) {
                if (processedItem.columnIndex === 0) {
                    this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, parentKey: this.activeItem().parentKey, item: processedItem.item });
                    this.activeItem.set(null);
                }
            }

            const columnIndex = processedItem.columnIndex - 1;
            const itemIndex = this.visibleItems.findIndex((item) => item.columnIndex === columnIndex);

            itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
        }

        event.preventDefault();
    }

    onHomeKey(event: KeyboardEvent) {
        this.changeFocusedItemInfo(event, this.findFirstItemIndex());
        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent) {
        this.changeFocusedItemInfo(event, this.findLastItemIndex());
        event.preventDefault();
    }

    onSpaceKey(event: KeyboardEvent) {
        this.onEnterKey(event);
    }

    onEscapeKey(event: KeyboardEvent) {
        if (ObjectUtils.isNotEmpty(this.activeItem())) {
            this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, item: this.activeItem().item });
            this.activeItem.set(null);
        }

        event.preventDefault();
    }

    onTabKey(event: KeyboardEvent) {
        if (this.focusedItemInfo().index !== -1) {
            const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
            const grouped = this.isProccessedItemGroup(processedItem);

            !grouped && this.onItemChange({ originalEvent: event, processedItem });
        }

        this.hide();
    }

    onEnterKey(event: KeyboardEvent) {
        if (this.focusedItemInfo().index !== -1) {
            const element = DomHandler.findSingle(this.rootmenu?.el?.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');

            anchorElement ? anchorElement.click() : element && element.click();

            const processedItem = this.visibleItems[this.focusedItemInfo().index];
            const grouped = this.isProccessedItemGroup(processedItem);

            !grouped && this.changeFocusedItemInfo(event, this.findFirstFocusedItemIndex());
        }

        event.preventDefault();
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

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                    this.hide(event, true);
                });
            }
        }
    }

    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    const isOutsideContainer = this.rootmenu?.el.nativeElement !== event.target && !this.rootmenu?.el.nativeElement.contains(event.target);

                    if (isOutsideContainer) {
                        this.hide();
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

    ngOnDestroy() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
    }
}

@NgModule({
    imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon],
    exports: [MegaMenu, RouterModule, TooltipModule, SharedModule],
    declarations: [MegaMenu, MegaMenuSub]
})
export class MegaMenuModule {}
