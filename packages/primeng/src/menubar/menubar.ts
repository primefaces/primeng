import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    effect,
    ElementRef,
    EventEmitter,
    Inject,
    inject,
    Injectable,
    Input,
    NgModule,
    numberAttribute,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    Renderer2,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { findLastIndex, findSingle, focus, isEmpty, isNotEmpty, isPrintableCharacter, isTouchDevice, resolve, uuid } from '@primeuix/utils';
import { MenuItem, PrimeNGConfig, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent } from 'primeng/basecomponent';
import { AngleDownIcon, AngleRightIcon, BarsIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { interval, Subject, Subscription } from 'rxjs';
import { debounce, filter } from 'rxjs/operators';
import { MenuBarStyle } from './style/menubarstyle';

@Injectable()
export class MenubarService {
    autoHide: boolean | undefined;

    autoHideDelay: number | undefined;

    readonly mouseLeaves = new Subject<boolean>();

    readonly mouseLeft$ = this.mouseLeaves.pipe(
        debounce(() => interval(this.autoHideDelay)),
        filter((mouseLeft) => (this.autoHide as boolean) && mouseLeft)
    );
}

@Component({
    selector: 'p-menubarSub, p-menubarsub',
    standalone: true,
    imports: [CommonModule, RouterModule, Ripple, TooltipModule, BarsIcon, AngleDownIcon, AngleRightIcon, BadgeModule, SharedModule],
    template: `
        <ul
            #menubar
            [ngClass]="{ 'p-menubar-submenu': !root, 'p-menubar-root-list': root }"
            [attr.data-pc-section]="'menu'"
            role="menubar"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
            [tabindex]="0"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            (keydown)="menuKeydown.emit($event)"
            [attr.id]="root ? menuId : null"
            [attr.aria-activedescendant]="focusedItemId"
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
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getItemClass(processedItem)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menubar-item-content" [attr.data-pc-section]="'content'" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({ $event, processedItem })">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                [attr.data-pc-section]="'action'"
                                [target]="getItemProp(processedItem, 'target')"
                                [ngClass]="{ 'p-menubar-item-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [attr.tabindex]="-1"
                                pRipple
                            >
                                <span
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    class="p-menubar-item-icon"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.tabindex]="-1"
                                >
                                </span>
                                <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menubar-item-label" [attr.data-pc-section]="'label'" [id]="getItemLabelId(processedItem)">
                                    {{ getItemLabel(processedItem) }}
                                </span>
                                <ng-template #htmlLabel>
                                    <span class="p-menubar-item-label" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'" [id]="getItemLabelId(processedItem)"></span>
                                </ng-template>
                                <p-badge *ngIf="getItemProp(processedItem, 'badge')" [styleClass]="getItemProp(processedItem, 'badgeStyleClass')" [value]="getItemProp(processedItem, 'badge')" />

                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <AngleDownIcon class="p-menubar-submenu-icon" *ngIf="root" [attr.data-pc-section]="'submenuicon'" />
                                        <AngleRightIcon class="p-menubar-submenu-icon" *ngIf="!root" [attr.data-pc-section]="'submenuicon'" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate" [attr.data-pc-section]="'submenuicon'"></ng-template>
                                </ng-container>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                [attr.tabindex]="-1"
                                [attr.data-pc-section]="'action'"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-menubar-item-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(processedItem, 'target')"
                                [ngClass]="{ 'p-menubar-item-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                pRipple
                            >
                                <span
                                    class="p-menubar-item-icon"
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.tabindex]="-1"
                                ></span>
                                <span class="p-menubar-item-label" *ngIf="getItemProp(processedItem, 'escape'); else htmlRouteLabel">{{ getItemLabel(processedItem) }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menubar-item-label" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span></ng-template>
                                <p-badge *ngIf="getItemProp(processedItem, 'badge')" [styleClass]="getItemProp(processedItem, 'badgeStyleClass')" [value]="getItemProp(processedItem, 'badge')" />
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <AngleDownIcon class="p-menubar-submenu-icon" [attr.data-pc-section]="'submenuicon'" *ngIf="root" />
                                        <AngleRightIcon class="p-menubar-submenu-icon" [attr.data-pc-section]="'submenuicon'" *ngIf="!root" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate" [attr.data-pc-section]="'submenuicon'"></ng-template>
                                </ng-container>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item, root: root }"></ng-template>
                        </ng-container>
                    </div>
                    <p-menubarSub
                        *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                        [itemTemplate]="itemTemplate"
                        [items]="processedItem.items"
                        [mobileActive]="mobileActive"
                        [autoDisplay]="autoDisplay"
                        [menuId]="menuId"
                        [activeItemPath]="activeItemPath"
                        [focusedItemId]="focusedItemId"
                        [level]="level + 1"
                        [ariaLabelledBy]="getItemLabelId(processedItem)"
                        (itemClick)="itemClick.emit($event)"
                        (itemMouseEnter)="onItemMouseEnter($event)"
                        [inlineStyles]="{ display: isItemActive(processedItem) ? 'flex' : 'none' }"
                    >
                    </p-menubarSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MenubarSub extends BaseComponent implements OnInit, OnDestroy {
    @Input() items: any[];

    @Input() itemTemplate: TemplateRef<any> | undefined;

    @Input({ transform: booleanAttribute }) root: boolean = false;

    @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;

    @Input({ transform: numberAttribute }) baseZIndex: number = 0;

    @Input({ transform: booleanAttribute }) mobileActive: boolean | undefined;

    @Input({ transform: booleanAttribute }) autoDisplay: boolean | undefined;

    @Input() menuId: string | undefined;

    @Input() ariaLabel: string | undefined;

    @Input() ariaLabelledBy: string | undefined;

    @Input({ transform: numberAttribute }) level: number = 0;

    @Input() focusedItemId: string | undefined;

    @Input() activeItemPath: any[];

    @Input() inlineStyles: any;

    @Input() submenuIconTemplate: TemplateRef<any> | undefined;

    @Output() itemClick: EventEmitter<any> = new EventEmitter();

    @Output() itemMouseEnter: EventEmitter<any> = new EventEmitter();

    @Output() menuFocus: EventEmitter<any> = new EventEmitter();

    @Output() menuBlur: EventEmitter<any> = new EventEmitter();

    @Output() menuKeydown: EventEmitter<any> = new EventEmitter();

    @ViewChild('menubar', { static: true }) menubarViewChild: ElementRef;

    mouseLeaveSubscriber: Subscription | undefined;

    menubarService = inject(MenubarService);

    ngOnInit() {
        super.ngOnInit();
        this.mouseLeaveSubscriber = this.menubarService.mouseLeft$.subscribe(() => {
            this.cd.markForCheck();
        });
    }

    onItemClick(event: any, processedItem: any) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }

    getItemProp(processedItem: any, name: string, params: any | null = null) {
        return processedItem && processedItem.item ? resolve(processedItem.item[name], params) : undefined;
    }

    getItemId(processedItem: any): string {
        return processedItem.item && processedItem.item?.id ? processedItem.item.id : `${this.menuId}_${processedItem.key}`;
    }

    getItemKey(processedItem: any): string {
        return this.getItemId(processedItem);
    }

    getItemLabelId(processedItem: any): string {
        return `${this.menuId}_${processedItem.key}_label`;
    }

    getItemClass(processedItem: any) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-menubar-item': true,
            'p-menubar-item-active': this.isItemActive(processedItem),
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
            'p-menubar-separator': true
        };
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
        return isNotEmpty(processedItem.items);
    }

    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }

    getAriaPosInset(index: number) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }

    onItemMouseLeave() {
        this.menubarService.mouseLeaves.next(true);
    }

    onItemMouseEnter(param: any) {
        if (this.autoDisplay) {
            this.menubarService.mouseLeaves.next(false);
            const { event, processedItem } = param;
            this.itemMouseEnter.emit({ originalEvent: event, processedItem });
        }
    }

    ngOnDestroy() {
        this.mouseLeaveSubscriber?.unsubscribe();
        super.ngOnDestroy();
    }
}
/**
 * Menubar is a horizontal menu component.
 * @group Components
 */
@Component({
    selector: 'p-menubar',
    standalone: true,
    imports: [CommonModule, RouterModule, MenubarSub, Ripple, TooltipModule, BarsIcon, AngleDownIcon, AngleRightIcon, BadgeModule, SharedModule],
    template: `
        <div [ngClass]="{ 'p-menubar p-component': true, 'p-menubar-mobile': queryMatches, 'p-menubar-mobile-active': mobileActive }" [class]="styleClass" [ngStyle]="style" [attr.data-pc-section]="'root'" [attr.data-pc-name]="'menubar'">
            <div class="p-menubar-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <a
                #menubutton
                tabindex="0"
                role="button"
                [attr.aria-haspopup]="model.length && model.length > 0 ? true : false"
                [attr.aria-expanded]="mobileActive"
                [attr.aria-controls]="id"
                [attr.aria-label]="config.translation.aria.navigation"
                [attr.data-pc-section]="'button'"
                *ngIf="model && model.length > 0"
                class="p-menubar-button"
                (click)="menuButtonClick($event)"
                (keydown)="menuButtonKeydown($event)"
            >
                <BarsIcon *ngIf="!menuIconTemplate" />
                <ng-template *ngTemplateOutlet="menuIconTemplate"></ng-template>
            </a>
            <p-menubarSub
                #rootmenu
                [items]="processedItems"
                [itemTemplate]="itemTemplate"
                [menuId]="id"
                [root]="true"
                [baseZIndex]="baseZIndex"
                [autoZIndex]="autoZIndex"
                [mobileActive]="mobileActive"
                [autoDisplay]="autoDisplay"
                [ariaLabel]="ariaLabel"
                [ariaLabelledBy]="ariaLabelledBy"
                [focusedItemId]="focused ? focusedItemId : undefined"
                [submenuIconTemplate]="submenuIconTemplate"
                [activeItemPath]="activeItemPath()"
                (itemClick)="onItemClick($event)"
                (menuFocus)="onMenuFocus($event)"
                (menuBlur)="onMenuBlur($event)"
                (menuKeydown)="onKeyDown($event)"
                (itemMouseEnter)="onItemMouseEnter($event)"
            ></p-menubarSub>
            <div class="p-menubar-end" *ngIf="endTemplate; else legacy">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
            <ng-template #legacy>
                <div class="p-menubar-end">
                    <ng-content></ng-content>
                </div>
            </ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MenubarService, MenuBarStyle]
})
export class Menubar extends BaseComponent implements OnDestroy, OnInit {
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
    @Input({ transform: booleanAttribute }) autoDisplay: boolean | undefined = false;
    /**
     * Whether to hide a root submenu when mouse leaves.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoHide: boolean | undefined;
    /**
     * The breakpoint to define the maximum width boundary.
     * @group Props
     */
    @Input() breakpoint: string = '960px';
    /**
     * Delay to hide the root submenu in milliseconds when mouse leaves.
     * @group Props
     */
    @Input({ transform: numberAttribute }) autoHideDelay: number = 100;
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
     * Callback to execute when button is focused.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    /**
     * Callback to execute when button loses focus.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ViewChild('menubutton') menubutton: ElementRef | undefined;

    @ViewChild('rootmenu') rootmenu: MenubarSub | undefined;

    mobileActive: boolean | undefined;

    private matchMediaListener: () => void;

    private query: MediaQueryList;

    public queryMatches: boolean;

    outsideClickListener: VoidListener;

    resizeListener: VoidListener;

    mouseLeaveSubscriber: Subscription | undefined;

    dirty: boolean = false;

    focused: boolean = false;

    activeItemPath = signal<any>([]);

    number = signal<number>(0);

    focusedItemInfo = signal<any>({ index: -1, level: 0, parentKey: '', item: null });

    searchValue: string = '';

    searchTimeout: any;

    _processedItems: any[];

    _componentStyle = inject(MenuBarStyle);

    _model: MenuItem[] | undefined;

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
        return focusedItem.item && focusedItem.item?.id ? focusedItem.item.id : focusedItem.index !== -1 ? `${this.id}${isNotEmpty(focusedItem.parentKey) ? '_' + focusedItem.parentKey : ''}_${focusedItem.index}` : null;
    }

    constructor(
        @Inject(DOCUMENT) public document: Document,
        @Inject(PLATFORM_ID) public platformId: any,
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        public config: PrimeNGConfig,
        private menubarService: MenubarService
    ) {
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

    ngOnInit(): void {
        super.ngOnInit();
        this.bindMatchMediaListener();
        this.menubarService.autoHide = this.autoHide;
        this.menubarService.autoHideDelay = this.autoHideDelay;
        this.mouseLeaveSubscriber = this.menubarService.mouseLeft$.subscribe(() => this.unbindOutsideClickListener());
        this.id = this.id || uuid('pn_id_');
    }

    /**
     * Defines template option for start.
     * @group Templates
     */
    @ContentChild('start') startTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for end.
     * @group Templates
     */
    @ContentChild('end') endTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for item.
     * @group Templates
     */
    @ContentChild('item') itemTemplate: TemplateRef<any> | undefined;
    /**
     * Defines template option for item.
     * @group Templates
     */
    @ContentChild('menuicon') menuIconTemplate: TemplateRef<any> | undefined;
    /**
     * Defines template option for submenu icon.
     * @group Templates
     */
    @ContentChild('submenuicon') submenuIconTemplate: TemplateRef<any> | undefined;

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

    bindMatchMediaListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.matchMediaListener) {
                const query = window.matchMedia(`(max-width: ${this.breakpoint})`);

                this.query = query;
                this.queryMatches = query.matches;

                this.matchMediaListener = () => {
                    this.queryMatches = query.matches;
                    this.mobileActive = false;
                    this.cd.markForCheck();
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

    getItemProp(item: any, name: string) {
        return item ? resolve(item[name]) : undefined;
    }

    menuButtonClick(event: MouseEvent) {
        this.toggle(event);
    }

    menuButtonKeydown(event: any) {
        (event.code === 'Enter' || event.code === 'Space') && this.menuButtonClick(event);
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

            this.dirty = !root;
            focus(this.rootmenu.menubarViewChild.nativeElement);
        } else {
            if (grouped) {
                this.onItemChange(event);
            } else {
                const rootProcessedItem = root ? processedItem : this.activeItemPath().find((p) => p.parentKey === '');
                this.hide(originalEvent);
                this.changeFocusedItemIndex(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);

                this.mobileActive = false;
                focus(this.rootmenu.menubarViewChild.nativeElement);
            }
        }
    }

    onItemMouseEnter(event: any) {
        if (!isTouchDevice()) {
            if (!this.mobileActive) {
                this.onItemChange(event);
            }
        }
    }

    changeFocusedItemIndex(event: any, index: number) {
        const processedItem = this.findVisibleItem(index);
        if (this.focusedItemInfo().index !== index) {
            const focusedItemInfo = this.focusedItemInfo();
            this.focusedItemInfo.set({ ...focusedItemInfo, item: processedItem.item, index });
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

    onItemChange(event: any) {
        const { processedItem, isFocus } = event;

        if (isEmpty(processedItem)) return;

        const { index, key, level, parentKey, items, item } = processedItem;
        const grouped = isNotEmpty(items);
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== parentKey && p.parentKey !== key);

        grouped && activeItemPath.push(processedItem);
        this.focusedItemInfo.set({ index, level, parentKey, item });
        this.activeItemPath.set(activeItemPath);

        grouped && (this.dirty = true);
        isFocus && focus(this.rootmenu.menubarViewChild.nativeElement);
    }

    toggle(event: MouseEvent) {
        if (this.mobileActive) {
            this.mobileActive = false;
            ZIndexUtils.clear(this.rootmenu.el.nativeElement);
            this.hide();
        } else {
            this.mobileActive = true;
            ZIndexUtils.set('menu', this.rootmenu.el.nativeElement, this.config.zIndex.menu);
            setTimeout(() => {
                this.show();
            }, 0);
        }

        this.bindOutsideClickListener();
        event.preventDefault();
    }

    hide(event?, isFocus?: boolean) {
        if (this.mobileActive) {
            setTimeout(() => {
                focus(this.menubutton.nativeElement);
            }, 0);
        }

        this.activeItemPath.set([]);
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });

        isFocus && focus(this.rootmenu?.menubarViewChild.nativeElement);
        this.dirty = false;
    }

    show() {
        const processedItem = this.findVisibleItem(this.findFirstFocusedItemIndex());
        this.focusedItemInfo.set({ index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '', item: processedItem?.item });
        focus(this.rootmenu?.menubarViewChild.nativeElement);
    }

    onMenuFocus(event: any) {
        this.focused = true;
        const processedItem = this.findVisibleItem(this.findFirstFocusedItemIndex());
        const focusedItemInfo = this.focusedItemInfo().index !== -1 ? this.focusedItemInfo() : { index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '', item: processedItem?.item };

        this.focusedItemInfo.set(focusedItemInfo);
        this.onFocus.emit(event);
    }

    onMenuBlur(event: any) {
        this.focused = false;
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
        this.searchValue = '';
        this.dirty = false;
        this.onBlur.emit(event);
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

    findVisibleItem(index) {
        return isNotEmpty(this.visibleItems) ? this.visibleItems[index] : null;
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
        return processedItem && isNotEmpty(processedItem.items);
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
        return processedItem && isNotEmpty(processedItem.items);
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

    getProccessedItemLabel(processedItem: any) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }

    getItemLabel(item: any) {
        return this.getItemProp(item, 'label');
    }

    onArrowDownKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const root = processedItem ? isEmpty(processedItem.parent) : null;

        if (root) {
            const grouped = this.isProccessedItemGroup(processedItem);

            if (grouped) {
                this.onItemChange({ originalEvent: event, processedItem });
                this.focusedItemInfo.set({ index: -1, parentKey: processedItem.key, item: processedItem.item });
                this.onArrowRightKey(event);
            }
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();

            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        }
    }

    onArrowRightKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const parentItem = processedItem ? this.activeItemPath().find((p) => p.key === processedItem.parentKey) : null;

        if (parentItem) {
            const grouped = this.isProccessedItemGroup(processedItem);

            if (grouped) {
                this.onItemChange({ originalEvent: event, processedItem });
                this.focusedItemInfo.set({ index: -1, parentKey: processedItem.key, item: processedItem.item });
                this.onArrowDownKey(event);
            }
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();

            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        }
    }

    onArrowUpKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const root = isEmpty(processedItem.parent);

        if (root) {
            const grouped = this.isProccessedItemGroup(processedItem);

            if (grouped) {
                this.onItemChange({ originalEvent: event, processedItem });
                this.focusedItemInfo.set({ index: -1, parentKey: processedItem.key, item: processedItem.item });
                const itemIndex = this.findLastItemIndex();

                this.changeFocusedItemIndex(event, itemIndex);
            }
        } else {
            const parentItem = this.activeItemPath().find((p) => p.key === processedItem.parentKey);
            if (this.focusedItemInfo().index === 0) {
                this.focusedItemInfo.set({ index: -1, parentKey: parentItem ? parentItem.parentKey : '', item: processedItem.item });
                this.searchValue = '';
                this.onArrowLeftKey(event);
                const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItemInfo().parentKey);
                this.activeItemPath.set(activeItemPath);
            } else {
                const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
                this.changeFocusedItemIndex(event, itemIndex);
            }
        }

        event.preventDefault();
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const parentItem = processedItem ? this.activeItemPath().find((p) => p.key === processedItem.parentKey) : null;

        if (parentItem) {
            this.onItemChange({ originalEvent: event, processedItem: parentItem });
            const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItemInfo().parentKey);
            this.activeItemPath.set(activeItemPath);

            event.preventDefault();
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        }
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
        }

        event.preventDefault();
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

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                    if (!isTouchDevice()) {
                        this.hide(event, true);
                    }

                    this.mobileActive = false;
                });
            }
        }
    }

    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    const isOutsideContainer = this.rootmenu.el.nativeElement !== event.target && !this.rootmenu.el.nativeElement.contains(event.target);
                    const isOutsideMenuButton = this.mobileActive && this.menubutton.nativeElement !== event.target && !this.menubutton.nativeElement.contains(event.target);

                    if (isOutsideContainer) {
                        isOutsideMenuButton ? (this.mobileActive = false) : this.hide();
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
        this.mouseLeaveSubscriber?.unsubscribe();
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        this.unbindMatchMediaListener();
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [Menubar, SharedModule],
    exports: [Menubar, SharedModule]
})
export class MenubarModule {}
