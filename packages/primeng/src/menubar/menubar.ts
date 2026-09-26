import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    effect,
    ElementRef,
    EventEmitter,
    Inject,
    inject,
    Injectable,
    InjectionToken,
    Input,
    NgModule,
    numberAttribute,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { findLastIndex, findSingle, focus, isEmpty, isNotEmpty, isPrintableCharacter, isTouchDevice, resolve, uuid } from '@primeuix/utils';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { AngleDownIcon, AngleRightIcon, BarsIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { VoidListener } from 'primeng/ts-helpers';
import { MenubarItemTemplateContext, MenubarPassThrough } from 'primeng/types/menubar';
import { ZIndexUtils } from 'primeng/utils';
import { interval, Subject, Subscription } from 'rxjs';
import { debounce, filter } from 'rxjs/operators';
import { MenuBarStyle } from './style/menubarstyle';

const MENUBAR_INSTANCE = new InjectionToken<Menubar>('MENUBAR_INSTANCE');

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
    selector: 'p-menubarSub, p-menubarsub, [pMenubarSub]',
    standalone: true,
    imports: [CommonModule, RouterModule, Ripple, TooltipModule, AngleDownIcon, AngleRightIcon, BadgeModule, SharedModule, BindModule],
    template: `
        <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
            <li
                *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                [attr.id]="getItemId(processedItem)"
                [style]="getItemProp(processedItem, 'style')"
                [class]="cn(cx('separator'), processedItem?.styleClass)"
                role="separator"
                [pBind]="ptm('separator')"
            ></li>
            <li
                #listItem
                *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                role="menuitem"
                [attr.id]="getItemId(processedItem)"
                [attr.data-p-highlight]="isItemActive(processedItem)"
                [attr.data-p-focused]="isItemFocused(processedItem)"
                [attr.data-p-disabled]="isItemDisabled(processedItem)"
                [attr.aria-label]="getItemLabel(processedItem)"
                [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                [attr.aria-setsize]="getAriaSetSize()"
                [attr.aria-posinset]="getAriaPosInset(index)"
                [style]="getItemProp(processedItem, 'style')"
                [class]="cn(cx('item', { instance: this, processedItem }), getItemProp(processedItem, 'styleClass'))"
                [pBind]="getPTOptions(processedItem, index, 'item')"
                pTooltip
                [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                [pTooltipUnstyled]="unstyled()"
            >
                <div [class]="cx('itemContent')" [pBind]="getPTOptions(processedItem, index, 'itemContent')" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({ $event, processedItem })">
                    <ng-container *ngIf="!itemTemplate">
                        <a
                            *ngIf="!getItemProp(processedItem, 'routerLink')"
                            [attr.href]="getItemProp(processedItem, 'url')"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.title]="getItemProp(processedItem, 'title')"
                            [attr.target]="getItemProp(processedItem, 'target')"
                            [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                            [ngStyle]="getItemProp(processedItem, 'linkStyle')"
                            [attr.tabindex]="-1"
                            [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                            pRipple
                        >
                            <span
                                *ngIf="getItemProp(processedItem, 'icon')"
                                [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.tabindex]="-1"
                                [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                            >
                            </span>
                            <span
                                *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel"
                                [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                [ngStyle]="getItemProp(processedItem, 'labelStyle')"
                                [id]="getItemLabelId(processedItem)"
                                [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                            >
                                {{ getItemLabel(processedItem) }}
                            </span>
                            <ng-template #htmlLabel>
                                <span
                                    [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                    [ngStyle]="getItemProp(processedItem, 'labelStyle')"
                                    [innerHTML]="getItemLabel(processedItem)"
                                    [id]="getItemLabelId(processedItem)"
                                    [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                                ></span>
                            </ng-template>
                            <p-badge
                                *ngIf="getItemProp(processedItem, 'badge')"
                                [class]="getItemProp(processedItem, 'badgeStyleClass')"
                                [value]="getItemProp(processedItem, 'badge')"
                                [pt]="getPTOptions(processedItem, index, 'pcBadge')"
                                [unstyled]="unstyled()"
                            />

                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!submenuiconTemplate">
                                    <svg data-p-icon="angle-down" [class]="cx('submenuIcon')" *ngIf="root" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" />
                                    <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" *ngIf="!root" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="submenuiconTemplate"></ng-template>
                            </ng-container>
                        </a>
                        <a
                            *ngIf="getItemProp(processedItem, 'routerLink')"
                            [routerLink]="getItemProp(processedItem, 'routerLink')"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.title]="getItemProp(processedItem, 'title')"
                            [attr.tabindex]="-1"
                            [queryParams]="getItemProp(processedItem, 'queryParams')"
                            [routerLinkActive]="'p-menubar-item-link-active'"
                            [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                            [target]="getItemProp(processedItem, 'target')"
                            [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                            [ngStyle]="getItemProp(processedItem, 'linkStyle')"
                            [fragment]="getItemProp(processedItem, 'fragment')"
                            [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                            [state]="getItemProp(processedItem, 'state')"
                            [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                            pRipple
                        >
                            <span
                                [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                *ngIf="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.tabindex]="-1"
                                [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                            ></span>
                            <span
                                [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                [ngStyle]="getItemProp(processedItem, 'labelStyle')"
                                *ngIf="getItemProp(processedItem, 'escape'); else htmlRouteLabel"
                                [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                                >{{ getItemLabel(processedItem) }}</span
                            >
                            <ng-template #htmlRouteLabel
                                ><span
                                    [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                    [ngStyle]="getItemProp(processedItem, 'labelStyle')"
                                    [innerHTML]="getItemLabel(processedItem)"
                                    [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                                ></span
                            ></ng-template>
                            <p-badge
                                *ngIf="getItemProp(processedItem, 'badge')"
                                [class]="getItemProp(processedItem, 'badgeStyleClass')"
                                [value]="getItemProp(processedItem, 'badge')"
                                [pt]="getPTOptions(processedItem, index, 'pcBadge')"
                                [unstyled]="unstyled()"
                            />
                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!submenuiconTemplate">
                                    <svg data-p-icon="angle-down" [class]="cx('submenuIcon')" *ngIf="root" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" />
                                    <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" *ngIf="!root" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="submenuiconTemplate"></ng-template>
                            </ng-container>
                        </a>
                    </ng-container>
                    <ng-container *ngIf="itemTemplate">
                        <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item, root: root }"></ng-template>
                    </ng-container>
                </div>
                <ul
                    pMenubarSub
                    *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                    [itemTemplate]="itemTemplate"
                    [items]="processedItem.items"
                    [mobileActive]="mobileActive"
                    [autoDisplay]="autoDisplay"
                    [menuId]="menuId"
                    [activeItemPath]="activeItemPath"
                    [focusedItemId]="focusedItemId"
                    [level]="level + 1"
                    [attr.aria-labelledby]="getItemLabelId(processedItem)"
                    (itemClick)="itemClick.emit($event)"
                    (itemMouseEnter)="onItemMouseEnter($event)"
                    [inlineStyles]="sx('submenu', true, { instance: this, processedItem })"
                    [pt]="pt()"
                    [pBind]="ptm('submenu')"
                    [unstyled]="unstyled()"
                ></ul>
            </li>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'root ? menuId : null',
        '[attr.aria-activedescendant]': 'focusedItemId',
        '[class]': "level === 0 ? cx('rootList') : cx('submenu')",
        '[attr.role]': "'menubar'",
        '[style]': 'inlineStyles'
    }
})
export class MenubarSub extends BaseComponent<MenubarPassThrough> {
    @Input() items: any[];

    @Input() itemTemplate: TemplateRef<MenubarItemTemplateContext> | undefined;

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

    @Input() submenuiconTemplate: TemplateRef<void> | undefined;

    @Output() itemClick: EventEmitter<any> = new EventEmitter();

    @Output() itemMouseEnter: EventEmitter<any> = new EventEmitter();

    @Output() menuFocus: EventEmitter<any> = new EventEmitter();

    @Output() menuBlur: EventEmitter<any> = new EventEmitter();

    @Output() menuKeydown: EventEmitter<any> = new EventEmitter();

    mouseLeaveSubscriber: Subscription | undefined;

    menubarService = inject(MenubarService);

    _componentStyle = inject(MenuBarStyle);

    hostName = 'Menubar';

    onInit() {
        this.mouseLeaveSubscriber = this.menubarService.mouseLeft$.subscribe(() => {
            this.cd.markForCheck();
        });
    }

    onItemClick(event: any, processedItem: any) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }

    getItemProp(processedItem: any, name: string, params: any | null = null): any {
        return processedItem && processedItem.item ? resolve(processedItem.item[name], params) : undefined;
    }

    getItemId(processedItem: any): string {
        return processedItem.item && processedItem.item?.id ? processedItem.item.id : `${this.menuId}_${processedItem.key}`;
    }

    getItemLabelId(processedItem: any): string {
        return `${this.menuId}_${processedItem.key}_label`;
    }

    getItemLabel(processedItem: any): string {
        return this.getItemProp(processedItem, 'label');
    }

    isItemVisible(processedItem: any): boolean {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemActive(processedItem: any): boolean {
        if (this.activeItemPath) {
            return this.activeItemPath.some((path) => path.key === processedItem.key);
        }
        return false;
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

    onItemMouseEnter(param: any) {
        if (this.autoDisplay) {
            const { event, processedItem } = param;
            this.itemMouseEnter.emit({ originalEvent: event, processedItem });
        }
    }

    getPTOptions(processedItem: any, index: number, key: string) {
        return this.ptm(key, {
            context: {
                item: processedItem.item,
                index,
                active: this.isItemActive(processedItem),
                focused: this.isItemFocused(processedItem),
                disabled: this.isItemDisabled(processedItem),
                level: this.level
            }
        });
    }

    onDestroy() {
        this.mouseLeaveSubscriber?.unsubscribe();
    }
}
/**
 * Menubar is a horizontal menu component.
 * @group Components
 */
@Component({
    selector: 'p-menubar',
    standalone: true,
    imports: [CommonModule, RouterModule, MenubarSub, TooltipModule, BarsIcon, BadgeModule, SharedModule, BindModule],
    template: `
        <div [class]="cx('start')" *ngIf="startTemplate || _startTemplate" [pBind]="ptm('start')">
            <ng-container *ngTemplateOutlet="startTemplate || _startTemplate"></ng-container>
        </div>
        <a
            #menubutton
            tabindex="0"
            role="button"
            [attr.aria-haspopup]="model.length && model.length > 0 ? true : false"
            [attr.aria-expanded]="mobileActive()"
            [attr.aria-controls]="id"
            [attr.aria-label]="config.translation.aria.navigation"
            *ngIf="model && model.length > 0"
            [class]="cx('button')"
            [pBind]="ptm('button')"
            (click)="menuButtonClick($event)"
            (keydown)="menuButtonKeydown($event)"
        >
            <svg data-p-icon="bars" *ngIf="!menuIconTemplate && !_menuIconTemplate" [pBind]="ptm('buttonIcon')" />
            <ng-template *ngTemplateOutlet="menuIconTemplate || _menuIconTemplate"></ng-template>
        </a>
        <ul
            pMenubarSub
            #rootmenu
            [items]="processedItems"
            [itemTemplate]="itemTemplate"
            tabindex="0"
            [menuId]="id"
            [root]="true"
            [baseZIndex]="baseZIndex"
            [autoZIndex]="autoZIndex"
            [mobileActive]="mobileActive()"
            [autoDisplay]="autoDisplay"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledby]="ariaLabelledBy"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [submenuiconTemplate]="submenuIconTemplate || _submenuIconTemplate"
            [activeItemPath]="activeItemPath()"
            (itemClick)="onItemClick($event)"
            (mousedown)="onMenuMouseDown($event)"
            (focus)="onMenuFocus($event)"
            (blur)="onMenuBlur($event)"
            (keydown)="onKeyDown($event)"
            (itemMouseEnter)="onItemMouseEnter($event)"
            (mouseleave)="onMouseLeave($event)"
            [pt]="pt()"
            [pBind]="ptm('rootList')"
            [unstyled]="unstyled()"
        ></ul>
        <div [class]="cx('end')" *ngIf="endTemplate || _endTemplate; else legacy" [pBind]="ptm('end')">
            <ng-container *ngTemplateOutlet="endTemplate || _endTemplate"></ng-container>
        </div>
        <ng-template #legacy>
            <div [class]="cx('end')">
                <ng-content></ng-content>
            </div>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MenubarService, MenuBarStyle, { provide: MENUBAR_INSTANCE, useExisting: Menubar }, { provide: PARENT_INSTANCE, useExisting: Menubar }],
    host: {
        '[class]': 'cn(cx("root"), styleClass)'
    },
    hostDirectives: [Bind]
})
export class Menubar extends BaseComponent<MenubarPassThrough> {
    componentName = 'Menubar';

    $pcMenubar: Menubar | undefined = inject(MENUBAR_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

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
     * Class of the element.
     * @deprecated since v20.0.0, use `class` instead.
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
    @Input({ transform: booleanAttribute }) autoDisplay: boolean | undefined = true;
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

    mobileActive = signal<boolean | undefined>(undefined);

    private matchMediaListener: () => void;

    private query: MediaQueryList;

    public queryMatches = signal<boolean>(false);

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

    onInit(): void {
        this.bindMatchMediaListener();
        this.menubarService.autoHide = this.autoHide;
        this.menubarService.autoHideDelay = this.autoHideDelay;
        this.mouseLeaveSubscriber = this.menubarService.mouseLeft$.subscribe(() => {
            this.hide();
        });
        this.id = this.id || uuid('pn_id_');
    }

    /**
     * Defines template option for start.
     * @group Templates
     */
    @ContentChild('start', { descendants: false }) startTemplate: TemplateRef<void> | undefined;

    /**
     * Defines template option for end.
     * @group Templates
     */
    @ContentChild('end', { descendants: false }) endTemplate: TemplateRef<void> | undefined;

    /**
     * Custom item template.
     * @param {MenubarItemTemplateContext} context - item context.
     * @see {@link MenubarItemTemplateContext}
     * @group Templates
     */
    @ContentChild('item', { descendants: false }) itemTemplate: TemplateRef<MenubarItemTemplateContext> | undefined;
    /**
     * Defines template option for menu icon.
     * @group Templates
     */
    @ContentChild('menuicon', { descendants: false }) menuIconTemplate: TemplateRef<void> | undefined;
    /**
     * Defines template option for submenu icon.
     * @group Templates
     */
    @ContentChild('submenuicon', { descendants: false }) submenuIconTemplate: TemplateRef<void> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _startTemplate: TemplateRef<void> | undefined;

    _endTemplate: TemplateRef<void> | undefined;

    _itemTemplate: TemplateRef<MenubarItemTemplateContext> | undefined;

    _menuIconTemplate: TemplateRef<void> | undefined;

    _submenuIconTemplate: TemplateRef<void> | undefined;

    onAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'start':
                    this._startTemplate = item.template;
                    break;

                case 'end':
                    this._endTemplate = item.template;
                    break;

                case 'menuicon':
                    this._menuIconTemplate = item.template;
                    break;

                case 'submenuicon':
                    this._submenuIconTemplate = item.template;
                    break;

                case 'item':
                    this._itemTemplate = item.template;
                    break;

                default:
                    this._itemTemplate = item.template;
                    break;
            }
        });
    }

    createProcessedItems(items: any, level: number = 0, parent: any = {}, parentKey: any = '') {
        const processedItems: any[] = [];

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
                processedItems.push(newItem as any);
            });

        return processedItems;
    }

    bindMatchMediaListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.matchMediaListener) {
                const query = window.matchMedia(`(max-width: ${this.breakpoint})`);

                this.query = query;
                this.queryMatches.set(query.matches);

                this.matchMediaListener = () => {
                    this.queryMatches.set(query.matches);
                    this.mobileActive.set(false);
                    this.cd.markForCheck();
                };

                query.addEventListener('change', this.matchMediaListener);
            }
        }
    }

    unbindMatchMediaListener() {
        if (this.matchMediaListener) {
            this.query.removeEventListener('change', this.matchMediaListener);
            this.matchMediaListener = null!;
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
        this.dirty = true;
        const { originalEvent, processedItem } = event;
        const grouped = this.isProcessedItemGroup(processedItem);
        const root = isEmpty(processedItem.parent);
        const selected = this.isSelected(processedItem);

        if (selected) {
            const { index, key, level, parentKey, item } = processedItem;

            this.activeItemPath.set(this.activeItemPath().filter((p) => key !== p.key && key.startsWith(p.key)));
            this.focusedItemInfo.set({ index, level, parentKey, item });

            this.dirty = !root;
            focus(this.rootmenu?.el.nativeElement);
        } else {
            if (grouped) {
                this.onItemChange(event);
            } else {
                const rootProcessedItem = root ? processedItem : this.activeItemPath().find((p) => p.parentKey === '');
                this.hide(originalEvent);
                this.changeFocusedItemIndex(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);

                this.mobileActive.set(false);
                focus(this.rootmenu?.el.nativeElement);
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

    onMouseLeave(event: any) {
        const autoHideEnabled = this.menubarService.autoHide;
        const autoHideDelay = this.menubarService.autoHideDelay;

        if (autoHideEnabled) {
            setTimeout(() => {
                this.menubarService.mouseLeaves.next(true);
            }, autoHideDelay);
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
        const element = findSingle(this.rootmenu?.el.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
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
        isFocus && focus(this.rootmenu?.el.nativeElement);

        if (type === 'hover' && this.queryMatches()) {
            return;
        }

        this.activeItemPath.set(activeItemPath);
    }

    toggle(event: MouseEvent) {
        if (this.mobileActive()) {
            this.mobileActive.set(false);
            ZIndexUtils.clear(this.rootmenu?.el.nativeElement);
            this.hide();
        } else {
            this.mobileActive.set(true);
            ZIndexUtils.set('menu', this.rootmenu?.el.nativeElement, this.config.zIndex.menu);
            setTimeout(() => {
                this.show();
            }, 0);
        }

        this.bindOutsideClickListener();
        event.preventDefault();
        event.stopPropagation();
    }

    hide(event?, isFocus?: boolean) {
        if (this.mobileActive()) {
            setTimeout(() => {
                focus(this.menubutton?.nativeElement);
            }, 0);
        }

        this.activeItemPath.set([]);
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });

        isFocus && focus(this.rootmenu?.el.nativeElement);
        this.dirty = false;
    }

    show() {
        const processedItem = this.findVisibleItem(this.findFirstFocusedItemIndex());
        this.focusedItemInfo.set({ index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '', item: processedItem?.item });
        focus(this.rootmenu?.el.nativeElement);
    }

    onMenuMouseDown(event: any) {
        this.dirty = true;
    }

    onMenuFocus(event: any) {
        this.focused = true;

        const relatedTarget = event.relatedTarget;
        const isFromOutside = !relatedTarget || !this.el.nativeElement.contains(relatedTarget);

        if (isFromOutside && this.focusedItemInfo().index === -1 && !this.activeItemPath().length && !this.dirty) {
            const processedItem = this.findVisibleItem(this.findFirstFocusedItemIndex());
            this.focusedItemInfo.set({ index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '', item: processedItem?.item });
        }

        this.onFocus.emit(event);
    }

    onMenuBlur(event: any) {
        const relatedTarget = event.relatedTarget;
        if (relatedTarget && this.el.nativeElement.contains(relatedTarget)) {
            return;
        }

        setTimeout(() => {
            const activeElement = this.document.activeElement;
            if (activeElement && this.el.nativeElement.contains(activeElement)) {
                return;
            }

            this.focused = false;
            this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
            this.searchValue = '';
            this.dirty = false;
            this.onBlur.emit(event);
        });
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
            const element = <any>findSingle(this.rootmenu?.el.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && (<any>findSingle(element, '[data-pc-section="itemlink"]') || findSingle(element, 'a,button'));

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

                    this.mobileActive.set(false);
                });
            }
        }
    }

    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    const isOutsideContainer = this.rootmenu?.el.nativeElement !== event.target && !this.rootmenu?.el.nativeElement?.contains(event.target);
                    const isOutsideMenuButton = this.mobileActive() && this.menubutton?.nativeElement !== event.target && !this.menubutton?.nativeElement?.contains(event.target);

                    if (isOutsideContainer) {
                        isOutsideMenuButton ? this.mobileActive.set(false) : this.hide();
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

    onDestroy() {
        this.mouseLeaveSubscriber?.unsubscribe();
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        this.unbindMatchMediaListener();
    }
}

@NgModule({
    imports: [Menubar, SharedModule],
    exports: [Menubar, SharedModule]
})
export class MenubarModule {}
