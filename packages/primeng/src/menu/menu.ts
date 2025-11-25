import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    inject,
    InjectionToken,
    input,
    Input,
    NgModule,
    numberAttribute,
    Output,
    Pipe,
    PipeTransform,
    PLATFORM_ID,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { absolutePosition, addStyle, appendChild, find, findSingle, focus, isTouchDevice, uuid } from '@primeuix/utils';
import { MenuItem, OverlayService, PrimeTemplate, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { MenuPassThrough } from 'primeng/types/menu';
import { ZIndexUtils } from 'primeng/utils';
import { MenuStyle } from './style/menustyle';

const MENU_INSTANCE = new InjectionToken<Menu>('MENU_INSTANCE');

@Pipe({
    name: 'safeHtml',
    standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: any,
        private readonly sanitizer: DomSanitizer
    ) {}

    public transform(value: string): SafeHtml {
        if (!value || !isPlatformBrowser(this.platformId)) {
            return value;
        }

        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}

@Component({
    selector: '[pMenuItemContent]',
    standalone: true,
    imports: [CommonModule, RouterModule, Ripple, TooltipModule, BadgeModule, SharedModule, SafeHtmlPipe, BindModule],
    template: ` <div [class]="cx('itemContent')" (click)="onItemClick($event, item)" [attr.data-pc-section]="'content'" [pBind]="getPTOptions('itemContent')">
        <ng-container *ngIf="!itemTemplate">
            <a
                *ngIf="!item?.routerLink"
                [attr.title]="item.title"
                [attr.href]="item.url || null"
                [attr.data-automationid]="item.automationId"
                [attr.tabindex]="-1"
                [class]="cx('itemLink')"
                [target]="item.target"
                [pBind]="getPTOptions('itemLink')"
                pRipple
            >
                <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: item }"></ng-container>
            </a>
            <a
                *ngIf="item?.routerLink"
                [routerLink]="item.routerLink"
                [attr.data-automationid]="item.automationId"
                [attr.tabindex]="-1"
                [attr.title]="item.title"
                [queryParams]="item.queryParams"
                routerLinkActive="p-menu-item-link-active"
                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                [class]="cx('itemLink')"
                [target]="item.target"
                [fragment]="item.fragment"
                [queryParamsHandling]="item.queryParamsHandling"
                [preserveFragment]="item.preserveFragment"
                [skipLocationChange]="item.skipLocationChange"
                [replaceUrl]="item.replaceUrl"
                [state]="item.state"
                [pBind]="getPTOptions('itemLink')"
                pRipple
            >
                <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: item }"></ng-container>
            </a>
        </ng-container>

        <ng-container *ngIf="itemTemplate">
            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-template>
        </ng-container>

        <ng-template #itemContent>
            <span [class]="cx('itemIcon', { item })" [pBind]="getPTOptions('itemIcon')" *ngIf="item.icon" [style]="item.iconStyle" [attr.data-pc-section]="'itemicon'"></span>
            <span [class]="cx('itemLabel')" [pBind]="getPTOptions('itemLabel')" [attr.data-pc-section]="'itemlabel'" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
            <ng-template #htmlLabel><span [class]="cx('itemLabel')" [attr.data-pc-section]="'itemlabel'" [innerHTML]="item.label | safeHtml" [pBind]="getPTOptions('itemLabel')"></span></ng-template>
            <p-badge *ngIf="item.badge" [styleClass]="item.badgeStyleClass" [value]="item.badge" [pt]="getPTOptions('pcBadge')" [unstyled]="unstyled()" />
        </ng-template>
    </div>`,
    encapsulation: ViewEncapsulation.None,
    providers: [MenuStyle]
})
export class MenuItemContent extends BaseComponent {
    @Input('pMenuItemContent') item: MenuItem | undefined;

    @Input() itemTemplate: any | undefined;

    menuitemId = input<string>('');

    idx = input<number>(0);

    @Output() onMenuItemClick: EventEmitter<any> = new EventEmitter<any>();

    menu: Menu;

    _componentStyle = inject(MenuStyle);

    hostName = 'Menu';

    constructor(@Inject(forwardRef(() => Menu)) menu: Menu) {
        super();
        this.menu = menu as Menu;
    }

    onItemClick(event, item) {
        this.onMenuItemClick.emit({ originalEvent: event, item });
    }

    getPTOptions(key: string) {
        return this.menu.getPTOptions(key, this.item, this.idx(), this.menuitemId());
    }
}
/**
 * Menu is a navigation / command component that supports dynamic and static positioning.
 * @group Components
 */
@Component({
    selector: 'p-menu',
    standalone: true,
    imports: [CommonModule, RouterModule, MenuItemContent, TooltipModule, BadgeModule, SharedModule, SafeHtmlPipe, BindModule, MotionModule],
    template: `
        @if (popup) {
            <p-motion [visible]="visible" [appear]="popup" name="p-anchored-overlay" [options]="computedMotionOptions()" (onBeforeEnter)="onOverlayBeforeEnter($event)" (onAfterLeave)="onOverlayAfterLeave()">
                <ng-container *ngTemplateOutlet="sharedcontent"></ng-container>
            </p-motion>
        } @else {
            <ng-container *ngTemplateOutlet="sharedcontent"></ng-container>
        }
        <ng-template #sharedcontent>
            <div #container [class]="cn(cx('root'), styleClass)" [style]="sx('root')" [ngStyle]="style" (click)="onOverlayClick($event)" [attr.id]="id" [pBind]="ptm('root')" [attr.data-p]="dataP">
                <div *ngIf="startTemplate ?? _startTemplate" [class]="cx('start')" [pBind]="ptm('start')" [attr.data-pc-section]="'start'">
                    <ng-container *ngTemplateOutlet="startTemplate ?? _startTemplate"></ng-container>
                </div>
                <ul
                    #list
                    [class]="cx('list')"
                    [pBind]="ptm('list')"
                    role="menu"
                    [attr.id]="id + '_list'"
                    [attr.tabindex]="getTabIndexValue()"
                    [attr.data-pc-section]="'menu'"
                    [attr.aria-activedescendant]="activedescendant()"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledBy]="ariaLabelledBy"
                    (focus)="onListFocus($event)"
                    (blur)="onListBlur($event)"
                    (keydown)="onListKeyDown($event)"
                >
                    <ng-template ngFor let-submenu let-i="index" [ngForOf]="model" *ngIf="hasSubMenu()">
                        <li [class]="cx('separator')" [pBind]="ptm('separator')" *ngIf="submenu.separator && submenu.visible !== false" role="separator" [attr.data-pc-section]="'separator'"></li>
                        <li
                            [class]="cx('submenuLabel')"
                            [pBind]="ptm('submenuLabel')"
                            [attr.data-automationid]="submenu.automationId"
                            *ngIf="!submenu.separator"
                            pTooltip
                            [tooltipOptions]="submenu.tooltipOptions"
                            [pTooltipUnstyled]="unstyled()"
                            role="none"
                            [attr.id]="menuitemId(submenu, id, i)"
                            [attr.data-pc-section]="'submenulabel'"
                        >
                            <ng-container *ngIf="!submenuHeaderTemplate && !_submenuHeaderTemplate">
                                <span *ngIf="submenu.escape !== false; else htmlSubmenuLabel">{{ submenu.label }}</span>
                                <ng-template #htmlSubmenuLabel><span [innerHTML]="submenu.label | safeHtml"></span></ng-template>
                            </ng-container>
                            <ng-container *ngTemplateOutlet="submenuHeaderTemplate ?? _submenuHeaderTemplate; context: { $implicit: submenu }"></ng-container>
                        </li>
                        <ng-template ngFor let-item let-j="index" [ngForOf]="submenu.items">
                            <li [class]="cx('separator')" [pBind]="ptm('separator')" *ngIf="item.separator && (item.visible !== false || submenu.visible !== false)" role="separator" [attr.data-pc-section]="'separator'"></li>
                            <li
                                [class]="cn(cx('item', { item, id: menuitemId(item, id, i, j) }), item?.styleClass)"
                                *ngIf="!item.separator && item.visible !== false && (item.visible !== undefined || submenu.visible !== false)"
                                [pMenuItemContent]="item"
                                [itemTemplate]="itemTemplate ?? _itemTemplate"
                                [idx]="j"
                                [menuitemId]="menuitemId(item, id, i, j)"
                                [style]="item.style"
                                (onMenuItemClick)="itemClick($event, menuitemId(item, id, i, j))"
                                pTooltip
                                [tooltipOptions]="item.tooltipOptions"
                                [pTooltipUnstyled]="unstyled()"
                                [unstyled]="unstyled()"
                                role="menuitem"
                                [attr.data-pc-section]="'menuitem'"
                                [attr.aria-label]="label(item.label)"
                                [attr.data-p-focused]="isItemFocused(menuitemId(item, id, i, j))"
                                [attr.data-p-disabled]="disabled(item.disabled)"
                                [attr.aria-disabled]="disabled(item.disabled)"
                                [attr.id]="menuitemId(item, id, i, j)"
                            ></li>
                        </ng-template>
                    </ng-template>
                    <ng-template ngFor let-item let-i="index" [ngForOf]="model" *ngIf="!hasSubMenu()">
                        <li [class]="cx('separator')" [pBind]="ptm('separator')" *ngIf="item.separator && item.visible !== false" role="separator" [attr.data-pc-section]="'separator'"></li>
                        <li
                            [class]="cn(cx('item', { item, id: menuitemId(item, id, i) }), item?.styleClass)"
                            *ngIf="!item.separator && item.visible !== false"
                            [pMenuItemContent]="item"
                            [itemTemplate]="itemTemplate ?? _itemTemplate"
                            [idx]="i"
                            [menuitemId]="menuitemId(item, id, i)"
                            [ngStyle]="item.style"
                            (onMenuItemClick)="itemClick($event, menuitemId(item, id, i))"
                            pTooltip
                            [tooltipOptions]="item.tooltipOptions"
                            [unstyled]="unstyled()"
                            [pTooltipUnstyled]="unstyled()"
                            role="menuitem"
                            [attr.data-pc-section]="'menuitem'"
                            [attr.aria-label]="label(item.label)"
                            [attr.data-p-focused]="isItemFocused(menuitemId(item, id, i))"
                            [attr.data-p-disabled]="disabled(item.disabled)"
                            [attr.aria-disabled]="disabled(item.disabled)"
                            [attr.id]="menuitemId(item, id, i)"
                        ></li>
                    </ng-template>
                </ul>
                <div *ngIf="endTemplate ?? _endTemplate" [class]="cx('end')" [pBind]="ptm('end')" [attr.data-pc-section]="'end'">
                    <ng-container *ngTemplateOutlet="endTemplate ?? _endTemplate"></ng-container>
                </div>
            </div>
        </ng-template>
    `,

    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MenuStyle, { provide: MENU_INSTANCE, useExisting: Menu }, { provide: PARENT_INSTANCE, useExisting: Menu }],
    hostDirectives: [Bind]
})
export class Menu extends BaseComponent<MenuPassThrough> {
    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
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
     * Transition options of the show animation.
     * @deprecated since v21.0.0, use `motionOptions` instead.
     * @group Props
     */
    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @deprecated since v21.0.0, use `motionOptions` instead.
     * @group Props
     */
    @Input() hideTransitionOptions: string = '.1s linear';

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
     * Current id state as a string.
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number = 0;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<HTMLElement | ElementRef | TemplateRef<any> | 'self' | 'body' | null | undefined | any>(undefined);
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });
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
    /**
     * Callback to invoke when the list loses focus.
     * @param {Event} event - blur event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when the list receives focus.
     * @param {Event} event - focus event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();

    @ViewChild('list') listViewChild: Nullable<ElementRef>;

    @ViewChild('container') containerViewChild: Nullable<ElementRef>;

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    container: any;

    scrollHandler: ConnectedOverlayScrollHandler | null | undefined;

    documentClickListener: VoidListener;

    documentResizeListener: VoidListener;

    preventDocumentDefault: boolean | undefined;

    target: any;

    visible: boolean | undefined;

    focusedOptionId = computed(() => {
        return this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : null;
    });

    public focusedOptionIndex: any = signal<any>(-1);

    public selectedOptionIndex: any = signal<any>(-1);

    public focused: boolean | undefined = false;

    public overlayVisible: boolean | undefined = false;

    $pcMenu: Menu | undefined = inject(MENU_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    _componentStyle = inject(MenuStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    constructor(public overlayService: OverlayService) {
        super();
        this.id = this.id || uuid('pn_id_');
    }

    getPTOptions(key: string, item: any, index: number, id: string) {
        return this.ptm(key, {
            context: {
                item: item,
                index: index,
                focused: this.isItemFocused(id),
                disabled: this.disabled(item.disabled)
            }
        });
    }
    /**
     * Toggles the visibility of the popup menu.
     * @param {Event} event - Browser event.
     * @group Method
     */
    public toggle(event: Event) {
        if (this.visible) this.hide();
        else this.show(event);

        this.preventDocumentDefault = true;
    }
    /**
     * Displays the popup menu.
     * @param {Event} event - Browser event.
     * @group Method
     */
    public show(event: any) {
        // Clear container if exists but overlay is not currently visible (fast toggle case)
        if (this.container && !this.overlayVisible) {
            this.container = undefined;
        }

        this.target = event.currentTarget;
        this.visible = true;
        this.preventDocumentDefault = true;
        this.overlayVisible = true;
        this.cd.markForCheck();
    }

    onInit() {
        if (!this.popup) {
            this.bindDocumentClickListener();
        }
    }

    /**
     * Defines template option for start.
     * @group Templates
     */
    @ContentChild('start', { descendants: false }) startTemplate: TemplateRef<any> | undefined;
    _startTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for end.
     * @group Templates
     */
    @ContentChild('end', { descendants: false }) endTemplate: TemplateRef<any> | undefined;
    _endTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for header.
     * @group Templates
     */
    @ContentChild('header', { descendants: false }) headerTemplate: TemplateRef<any> | undefined;
    _headerTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for item.
     * @group Templates
     */
    @ContentChild('item', { descendants: false }) itemTemplate: TemplateRef<any> | undefined;
    _itemTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for item.
     * @group Templates
     */
    @ContentChild('submenuheader', { descendants: false }) submenuHeaderTemplate: TemplateRef<any> | undefined;
    _submenuHeaderTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    onAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'start':
                    this._startTemplate = item.template;
                    break;

                case 'end':
                    this._endTemplate = item.template;
                    break;

                case 'item':
                    this._itemTemplate = item.template;
                    break;

                case 'submenuheader':
                    this._submenuHeaderTemplate = item.template;
                    break;

                default:
                    this._itemTemplate = item.template;
                    break;
            }
        });
    }

    getTabIndexValue(): string | null {
        return this.tabindex !== undefined ? this.tabindex.toString() : null;
    }

    onOverlayBeforeEnter(event: MotionEvent) {
        this.container = event.element as HTMLElement;
        addStyle(this.container, { position: 'absolute', top: '0' });
        this.appendOverlay();
        this.moveOnTop();

        this.$attrSelector && this.container?.setAttribute(this.$attrSelector, '');
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindScrollListener();
        absolutePosition(this.container!, this.target);
        focus(this.listViewChild?.nativeElement);
        this.onShow.emit({});
    }

    onOverlayAfterLeave() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
        this.onHide.emit({});
    }

    appendOverlay() {
        if (this.$appendTo() && this.$appendTo() !== 'self') {
            if (this.$appendTo() === 'body') {
                appendChild(this.document.body, this.container!);
            } else {
                appendChild(this.$appendTo(), this.container!);
            }
        }
    }

    restoreOverlayAppend() {
        if (this.container && this.$appendTo() !== 'self') {
            appendChild(this.el.nativeElement, this.container);
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
    public hide() {
        this.visible = false;
        this.overlayVisible = false;

        this.cd.markForCheck();
    }

    onWindowResize() {
        if (this.visible && !isTouchDevice()) {
            this.hide();
        }
    }

    menuitemId(item: MenuItem, id: string | any, index?: string | number, childIndex?: string | number) {
        return item?.id ?? `${id}_${index}${childIndex !== undefined ? '_' + childIndex : ''}`;
    }

    isItemFocused(id) {
        return this.focusedOptionId() === id;
    }

    label(label: any) {
        return typeof label === 'function' ? label() : label;
    }

    disabled(disabled: any) {
        return typeof disabled === 'function' ? disabled() : typeof disabled === 'undefined' ? false : disabled;
    }

    activedescendant() {
        return this.focused ? this.focusedOptionId() : undefined;
    }

    onListFocus(event: Event) {
        if (!this.focused) {
            this.focused = true;
            !this.popup && this.changeFocusedOptionIndex(0);
            this.onFocus.emit(event);
        }
    }

    onListBlur(event: FocusEvent | MouseEvent) {
        if (this.focused) {
            this.focused = false;
            this.changeFocusedOptionIndex(-1);
            this.selectedOptionIndex.set(-1);
            this.focusedOptionIndex.set(-1);
            this.onBlur.emit(event);
        }
    }

    onListKeyDown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            case 'Enter':
                this.onEnterKey(event);
                break;

            case 'NumpadEnter':
                this.onEnterKey(event);
                break;

            case 'Space':
                this.onSpaceKey(event);
                break;

            case 'Escape':
            case 'Tab':
                if (this.popup) {
                    focus(this.target);
                    this.hide();
                }
                this.overlayVisible && this.hide();
                break;

            default:
                break;
        }
    }

    onArrowDownKey(event) {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex());
        this.changeFocusedOptionIndex(optionIndex);
        event.preventDefault();
    }

    onArrowUpKey(event) {
        if (event.altKey && this.popup) {
            focus(this.target);
            this.hide();
            event.preventDefault();
        } else {
            const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex());

            this.changeFocusedOptionIndex(optionIndex);
            event.preventDefault();
        }
    }

    onHomeKey(event) {
        this.changeFocusedOptionIndex(0);
        event.preventDefault();
    }

    onEndKey(event) {
        this.changeFocusedOptionIndex(find(this.containerViewChild?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]').length - 1);
        event.preventDefault();
    }

    onEnterKey(event) {
        const element = <any>findSingle(this.containerViewChild?.nativeElement, `li[id="${`${this.focusedOptionIndex()}`}"]`);
        const anchorElement = element && (<any>findSingle(element, '[data-pc-section="itemlink"]') || findSingle(element, 'a,button'));

        this.popup && focus(this.target);
        anchorElement ? anchorElement.click() : element && element.click();

        event.preventDefault();
    }

    onSpaceKey(event) {
        this.onEnterKey(event);
    }

    findNextOptionIndex(index) {
        const links = find(this.containerViewChild?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
        const matchedOptionIndex = [...links].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }

    findPrevOptionIndex(index) {
        const links = find(this.containerViewChild?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
        const matchedOptionIndex = [...links].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }

    changeFocusedOptionIndex(index) {
        const links = find(this.containerViewChild?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
        if (links.length > 0) {
            let order = index >= links.length ? links.length - 1 : index < 0 ? 0 : index;
            order > -1 && this.focusedOptionIndex.set(links[order].getAttribute('id'));
        }
    }

    itemClick(event: any, id: string) {
        const { originalEvent, item } = event;

        if (!this.focused) {
            this.focused = true;
            this.onFocus.emit();
        }

        if (item.disabled) {
            originalEvent.preventDefault();
            return;
        }

        if (!item.url && !item.routerLink) {
            originalEvent.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: originalEvent,
                item: item
            });
        }

        if (this.popup) {
            this.hide();
        }

        if (!this.popup && this.focusedOptionIndex() !== id) {
            this.focusedOptionIndex.set(id);
        }
    }

    onOverlayClick(event: Event) {
        if (this.popup) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }

        this.preventDocumentDefault = true;
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener && isPlatformBrowser(this.platformId)) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                const isOutsideContainer = this.containerViewChild?.nativeElement && !this.containerViewChild?.nativeElement.contains(event.target);
                const isOutsideTarget = !(this.target && (this.target === event.target || this.target.contains(event.target)));
                if (!this.popup && isOutsideContainer && isOutsideTarget) {
                    this.onListBlur(event);
                }
                if (this.preventDocumentDefault && this.overlayVisible && isOutsideContainer && isOutsideTarget) {
                    this.hide();
                    this.preventDocumentDefault = false;
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

    bindDocumentResizeListener() {
        if (!this.documentResizeListener && isPlatformBrowser(this.platformId)) {
            const window = this.document.defaultView;
            this.documentResizeListener = this.renderer.listen(window, 'resize', this.onWindowResize.bind(this));
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler && isPlatformBrowser(this.platformId)) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                if (this.visible) {
                    this.hide();
                }
            });
        }

        this.scrollHandler?.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
            this.scrollHandler = null;
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
        if (this.container) {
            if (this.autoZIndex) {
                ZIndexUtils.clear(this.container);
            }
            this.container = undefined;
        }
    }

    onDestroy() {
        if (this.popup) {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            if (this.container) {
                if (this.autoZIndex) {
                    ZIndexUtils.clear(this.container);
                }
                this.container = undefined;
            }

            this.restoreOverlayAppend();
            this.onOverlayHide();
        }

        if (!this.popup) {
            this.unbindDocumentClickListener();
        }
    }

    hasSubMenu(): boolean {
        return this.model?.some((item) => item.items) ?? false;
    }

    isItemHidden(item: any): boolean {
        if (item.separator) {
            return item.visible === false || (item.items && item.items.some((subitem) => subitem.visible !== false));
        }
        return item.visible === false;
    }

    get dataP() {
        return this.cn({
            popup: this.popup
        });
    }
}

@NgModule({
    imports: [Menu, SharedModule, SafeHtmlPipe],
    exports: [Menu, SharedModule, SafeHtmlPipe]
})
export class MenuModule {}
