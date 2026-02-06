import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    ElementRef,
    forwardRef,
    inject,
    InjectionToken,
    input,
    NgModule,
    numberAttribute,
    output,
    Pipe,
    PipeTransform,
    PLATFORM_ID,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { absolutePosition, addStyle, appendChild, find, findSingle, focus, getOuterWidth, isTouchDevice, uuid } from '@primeuix/utils';
import { MenuItem, OverlayService, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import type { AppendTo, CSSProperties } from 'primeng/types/shared';
import { VoidListener } from 'primeng/ts-helpers';
import { MenuItemTemplateContext, MenuPassThrough, MenuSubmenuHeaderTemplateContext } from 'primeng/types/menu';
import { ZIndexUtils } from 'primeng/utils';
import { MenuStyle } from './style/menustyle';

const MENU_INSTANCE = new InjectionToken<Menu>('MENU_INSTANCE');

@Pipe({
    name: 'safeHtml',
    standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
    private platformId = inject(PLATFORM_ID);
    private sanitizer = inject(DomSanitizer);

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
    imports: [NgTemplateOutlet, RouterModule, Ripple, TooltipModule, BadgeModule, SharedModule, SafeHtmlPipe, BindModule],
    template: `
        @let _item = item();
        <div [class]="cx('itemContent')" (click)="onItemClick($event, _item)" [attr.data-pc-section]="'content'" [pBind]="getPTOptions('itemContent')">
            @if (!itemTemplate()) {
                @if (!_item?.routerLink) {
                    <a
                        [attr.title]="_item?.title"
                        [attr.href]="_item?.url || null"
                        [attr.data-automationid]="_item?.automationId"
                        [attr.tabindex]="-1"
                        [class]="cn(cx('itemLink'), _item?.linkClass)"
                        [style]="_item?.linkStyle"
                        [target]="_item?.target"
                        [pBind]="getPTOptions('itemLink')"
                        pRipple
                    >
                        <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: _item }"></ng-container>
                    </a>
                } @else {
                    <a
                        [routerLink]="_item?.routerLink"
                        [attr.data-automationid]="_item?.automationId"
                        [attr.tabindex]="-1"
                        [attr.title]="_item?.title"
                        [queryParams]="_item?.queryParams"
                        routerLinkActive="p-menu-item-link-active"
                        [routerLinkActiveOptions]="getRouterLinkActiveOptions(_item)"
                        [class]="cn(cx('itemLink'), _item?.linkClass)"
                        [style]="_item?.linkStyle"
                        [target]="_item?.target"
                        [fragment]="_item?.fragment"
                        [queryParamsHandling]="_item?.queryParamsHandling"
                        [preserveFragment]="_item?.preserveFragment"
                        [skipLocationChange]="_item?.skipLocationChange"
                        [replaceUrl]="_item?.replaceUrl"
                        [state]="_item?.state"
                        [pBind]="getPTOptions('itemLink')"
                        pRipple
                    >
                        <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: _item }"></ng-container>
                    </a>
                }
            } @else {
                <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: _item }"></ng-container>
            }

            <ng-template #itemContent>
                @if (_item?.icon) {
                    <span [class]="cn(cx('itemIcon', { item: _item }), _item?.iconClass)" [pBind]="getPTOptions('itemIcon')" [style]="_item?.iconStyle" [attr.data-pc-section]="'itemicon'"></span>
                }
                @if (_item?.escape !== false) {
                    <span [class]="cn(cx('itemLabel'), _item?.labelClass)" [style]="_item?.labelStyle" [pBind]="getPTOptions('itemLabel')" [attr.data-pc-section]="'itemlabel'">{{ _item?.label }}</span>
                } @else {
                    <span [class]="cn(cx('itemLabel'), _item?.labelClass)" [style]="_item?.labelStyle" [attr.data-pc-section]="'itemlabel'" [innerHTML]="_item?.label | safeHtml" [pBind]="getPTOptions('itemLabel')"></span>
                }
                @if (_item?.badge) {
                    <p-badge [class]="_item?.badgeStyleClass" [value]="_item?.badge" [pt]="getPTOptions('pcBadge')" [unstyled]="unstyled()" />
                }
            </ng-template>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [MenuStyle]
})
export class MenuItemContent extends BaseComponent {
    item = input<MenuItem | undefined>(undefined, { alias: 'pMenuItemContent' });

    itemTemplate = input<TemplateRef<MenuItemTemplateContext> | undefined>();

    menuitemId = input<string>('');

    idx = input<number>(0);

    onMenuItemClick = output<{ originalEvent: Event; item: MenuItem | undefined }>();

    menu = inject<Menu>(forwardRef(() => Menu));

    _componentStyle = inject(MenuStyle);

    hostName = 'Menu';

    onItemClick(event: Event, item: MenuItem | undefined) {
        this.onMenuItemClick.emit({ originalEvent: event, item });
    }

    getRouterLinkActiveOptions(item: MenuItem | undefined) {
        return item?.routerLinkActiveOptions || { exact: false };
    }

    getPTOptions(key: string) {
        return this.menu.getPTOptions(key, this.item(), this.idx(), this.menuitemId());
    }
}
/**
 * Menu is a navigation / command component that supports dynamic and static positioning.
 * @group Components
 */
@Component({
    selector: 'p-menu',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, MenuItemContent, TooltipModule, BadgeModule, SharedModule, SafeHtmlPipe, BindModule, MotionModule],
    template: `
        @if (popup()) {
            <p-motion [visible]="visible()" [appear]="popup()" name="p-anchored-overlay" [options]="computedMotionOptions()" (onBeforeEnter)="onOverlayBeforeEnter($event)" (onAfterLeave)="onOverlayAfterLeave()">
                <ng-container *ngTemplateOutlet="sharedcontent"></ng-container>
            </p-motion>
        } @else {
            <ng-container *ngTemplateOutlet="sharedcontent"></ng-container>
        }
        <ng-template #sharedcontent>
            <div #container [class]="cn(cx('root'), styleClass())" [style]="sx('root')" (click)="onOverlayClick($event)" [attr.id]="$id()" [pBind]="ptm('root')" [attr.data-p]="dataP()">
                @if (startTemplate()) {
                    <div [class]="cx('start')" [pBind]="ptm('start')" [attr.data-pc-section]="'start'">
                        <ng-container *ngTemplateOutlet="startTemplate()"></ng-container>
                    </div>
                }
                <ul
                    #list
                    [class]="cx('list')"
                    [pBind]="ptm('list')"
                    role="menu"
                    [attr.id]="$id() + '_list'"
                    [attr.tabindex]="getTabIndexValue()"
                    [attr.data-pc-section]="'menu'"
                    [attr.aria-activedescendant]="activedescendant()"
                    [attr.aria-label]="ariaLabel()"
                    [attr.aria-labelledBy]="ariaLabelledBy()"
                    (focus)="onListFocus($event)"
                    (blur)="onListBlur($event)"
                    (keydown)="onListKeyDown($event)"
                >
                    @if (hasSubMenu()) {
                        @for (submenu of model(); track submenu; let i = $index) {
                            @if (isSeparatorVisible(submenu)) {
                                <li [class]="cx('separator')" [pBind]="ptm('separator')" role="separator" [attr.data-pc-section]="'separator'"></li>
                            }
                            @if (!submenu.separator) {
                                <li
                                    [class]="cx('submenuLabel')"
                                    [pBind]="ptm('submenuLabel')"
                                    [attr.data-automationid]="submenu.automationId"
                                    pTooltip
                                    [tooltipOptions]="submenu.tooltipOptions"
                                    [pTooltipUnstyled]="unstyled()"
                                    role="none"
                                    [attr.id]="menuitemId(submenu, $id(), i)"
                                    [attr.data-pc-section]="'submenulabel'"
                                >
                                    @if (!submenuHeaderTemplate()) {
                                        @if (submenu.escape !== false) {
                                            <span>{{ submenu.label }}</span>
                                        } @else {
                                            <span [innerHTML]="submenu.label | safeHtml"></span>
                                        }
                                    }
                                    <ng-container *ngTemplateOutlet="submenuHeaderTemplate(); context: { $implicit: submenu }"></ng-container>
                                </li>
                            }
                            @for (item of submenu.items; track item; let j = $index) {
                                @if (isSubmenuSeparatorVisible(item, submenu)) {
                                    <li [class]="cx('separator')" [pBind]="ptm('separator')" role="separator" [attr.data-pc-section]="'separator'"></li>
                                }
                                @if (isSubmenuItemVisible(item, submenu)) {
                                    <li
                                        [class]="cn(cx('item', { item, id: menuitemId(item, $id(), i, j) }), item?.styleClass)"
                                        [pBind]="ptm('item')"
                                        [pMenuItemContent]="item"
                                        [itemTemplate]="itemTemplate()"
                                        [idx]="j"
                                        [menuitemId]="menuitemId(item, $id(), i, j)"
                                        [style]="item.style"
                                        (onMenuItemClick)="itemClick($event, menuitemId(item, $id(), i, j))"
                                        pTooltip
                                        [tooltipOptions]="item.tooltipOptions"
                                        [pTooltipUnstyled]="unstyled()"
                                        [unstyled]="unstyled()"
                                        role="menuitem"
                                        [attr.aria-label]="label(item.label)"
                                        [attr.data-p-focused]="isItemFocused(menuitemId(item, $id(), i, j))"
                                        [attr.data-p-disabled]="disabled(item.disabled)"
                                        [attr.aria-disabled]="disabled(item.disabled)"
                                        [attr.id]="menuitemId(item, $id(), i, j)"
                                    ></li>
                                }
                            }
                        }
                    } @else {
                        @for (item of model(); track item; let i = $index) {
                            @if (isSeparatorVisible(item)) {
                                <li [class]="cx('separator')" [pBind]="ptm('separator')" role="separator" [attr.data-pc-section]="'separator'"></li>
                            }
                            @if (isItemVisible(item)) {
                                <li
                                    [class]="cn(cx('item', { item, id: menuitemId(item, $id(), i) }), item?.styleClass)"
                                    [pBind]="ptm('item')"
                                    [pMenuItemContent]="item"
                                    [itemTemplate]="itemTemplate()"
                                    [idx]="i"
                                    [menuitemId]="menuitemId(item, $id(), i)"
                                    [style]="item.style"
                                    (onMenuItemClick)="itemClick($event, menuitemId(item, $id(), i))"
                                    pTooltip
                                    [tooltipOptions]="item.tooltipOptions"
                                    [unstyled]="unstyled()"
                                    [pTooltipUnstyled]="unstyled()"
                                    role="menuitem"
                                    [attr.aria-label]="label(item.label)"
                                    [attr.data-p-focused]="isItemFocused(menuitemId(item, $id(), i))"
                                    [attr.data-p-disabled]="disabled(item.disabled)"
                                    [attr.aria-disabled]="disabled(item.disabled)"
                                    [attr.id]="menuitemId(item, $id(), i)"
                                ></li>
                            }
                        }
                    }
                </ul>
                @if (endTemplate()) {
                    <div [class]="cx('end')" [pBind]="ptm('end')" [attr.data-pc-section]="'end'">
                        <ng-container *ngTemplateOutlet="endTemplate()"></ng-container>
                    </div>
                }
            </div>
        </ng-template>
    `,

    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MenuStyle, { provide: MENU_INSTANCE, useExisting: Menu }, { provide: PARENT_INSTANCE, useExisting: Menu }],
    hostDirectives: [Bind]
})
export class Menu extends BaseComponent<MenuPassThrough> {
    componentName = 'Menu';

    /**
     * An array of menuitems.
     * @group Props
     */
    model = input<MenuItem[]>();
    /**
     * Defines if menu would displayed as a popup.
     * @group Props
     */
    popup = input(false, { transform: booleanAttribute });
    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<CSSProperties>();
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = input(true, { transform: booleanAttribute });
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = input(0, { transform: numberAttribute });
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Current id state as a string.
     * @group Props
     */
    id = input<string>();
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<AppendTo>(undefined);
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

    /**
     * Callback to invoke when overlay menu is shown.
     * @group Emits
     */
    onShow = output<object>();
    /**
     * Callback to invoke when overlay menu is hidden.
     * @group Emits
     */
    onHide = output<object>();
    /**
     * Callback to invoke when the list loses focus.
     * @param {Event} event - blur event.
     * @group Emits
     */
    onBlur = output<Event>();
    /**
     * Callback to invoke when the list receives focus.
     * @param {Event} event - focus event.
     * @group Emits
     */
    onFocus = output<Event>();

    /**
     * Defines template option for start.
     * @group Templates
     */
    startTemplate = contentChild<TemplateRef<void>>('start', { descendants: false });

    /**
     * Defines template option for end.
     * @group Templates
     */
    endTemplate = contentChild<TemplateRef<void>>('end', { descendants: false });

    /**
     * Custom item template.
     * @param {MenuItemTemplateContext} context - item context.
     * @see {@link MenuItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<MenuItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom submenu header template.
     * @param {MenuSubmenuHeaderTemplateContext} context - submenu header context.
     * @see {@link MenuSubmenuHeaderTemplateContext}
     * @group Templates
     */
    submenuHeaderTemplate = contentChild<TemplateRef<MenuSubmenuHeaderTemplateContext>>('submenuheader', { descendants: false });

    listViewChild = viewChild<ElementRef>('list');

    containerViewChild = viewChild<ElementRef>('container');

    private _internalId = uuid('pn_id_');

    $id = computed(() => this.id() || this._internalId);

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });

    container: HTMLElement | undefined;

    scrollHandler: ConnectedOverlayScrollHandler | null | undefined;

    documentClickListener: VoidListener;

    documentResizeListener: VoidListener;

    preventDocumentDefault: boolean | undefined;

    target: HTMLElement | null = null;

    visible = signal(false);

    focusedOptionId = computed(() => {
        return this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : null;
    });

    focusedOptionIndex = signal<string | number>(-1);

    selectedOptionIndex = signal<number>(-1);

    focused = signal(false);

    overlayVisible = signal(false);

    $pcMenu: Menu | undefined = inject(MENU_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    overlayService = inject(OverlayService);

    _componentStyle = inject(MenuStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    dataP = computed(() => {
        return this.cn({
            popup: this.popup()
        });
    });

    getPTOptions(key: string, item: MenuItem | undefined, index: number, id: string) {
        return this.ptm(key, {
            context: {
                item: item,
                index: index,
                focused: this.isItemFocused(id),
                disabled: this.disabled(item?.disabled)
            }
        });
    }
    /**
     * Toggles the visibility of the popup menu.
     * @param {Event} event - Browser event.
     * @group Method
     */
    public toggle(event: Event) {
        if (this.visible()) this.hide();
        else this.show(event);

        this.preventDocumentDefault = true;
    }
    /**
     * Displays the popup menu.
     * @param {Event} event - Browser event.
     * @group Method
     */
    public show(event: Event) {
        // Clear container if exists but overlay is not currently visible (fast toggle case)
        if (this.container && !this.overlayVisible()) {
            this.container = undefined;
        }

        this.target = event.currentTarget as HTMLElement | null;
        this.visible.set(true);
        this.preventDocumentDefault = true;
        this.overlayVisible.set(true);
    }

    onInit() {
        if (!this.popup()) {
            this.bindDocumentClickListener();
        }
    }

    getTabIndexValue(): string | null {
        const tabindexValue = this.tabindex();
        return tabindexValue !== undefined ? tabindexValue.toString() : null;
    }

    onOverlayBeforeEnter(event: MotionEvent) {
        this.container = event.element as HTMLElement;

        if (this.container) {
            const nativeElementOuterWidth = getOuterWidth(this.containerViewChild()?.nativeElement);
            addStyle(this.container, { width: nativeElementOuterWidth + 'px' });
            addStyle(this.container, { position: 'absolute', top: '0' });
            this.appendOverlay();
            this.moveOnTop();

            this.$attrSelector && this.container?.setAttribute(this.$attrSelector, '');
            this.bindDocumentClickListener();
            this.bindDocumentResizeListener();
            this.bindScrollListener();
            absolutePosition(this.container!, this.target!);
            focus(this.listViewChild()?.nativeElement);
            this.onShow.emit({});
        }
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
        if (this.autoZIndex()) {
            ZIndexUtils.set('menu', this.container, this.baseZIndex() + this.config.zIndex.menu);
        }
    }
    /**
     * Hides the popup menu.
     * @group Method
     */
    public hide() {
        this.visible.set(false);
        this.overlayVisible.set(false);
    }

    onWindowResize() {
        if (this.visible() && !isTouchDevice()) {
            this.hide();
        }
    }

    menuitemId(item: MenuItem, id: string, index?: string | number, childIndex?: string | number) {
        return item?.id ?? `${id}_${index}${childIndex !== undefined ? '_' + childIndex : ''}`;
    }

    isItemFocused(id: string | number | null) {
        return this.focusedOptionId() === id;
    }

    label(label: string | (() => string) | undefined) {
        return typeof label === 'function' ? label() : label;
    }

    disabled(disabled: boolean | (() => boolean) | undefined) {
        return typeof disabled === 'function' ? disabled() : typeof disabled === 'undefined' ? false : disabled;
    }

    isVisible(item: MenuItem) {
        return item.visible !== false;
    }

    isSeparatorVisible(item: MenuItem) {
        return item.separator && this.isVisible(item);
    }

    isItemVisible(item: MenuItem) {
        return !item.separator && this.isVisible(item);
    }

    isSubmenuSeparatorVisible(item: MenuItem, submenu: MenuItem) {
        return item.separator && (this.isVisible(item) || this.isVisible(submenu));
    }

    isSubmenuItemVisible(item: MenuItem, submenu: MenuItem) {
        return !item.separator && this.isVisible(item) && (item.visible !== undefined || this.isVisible(submenu));
    }

    activedescendant = computed(() => {
        return this.focused() ? this.focusedOptionId() : undefined;
    });

    onListFocus(event: Event) {
        if (!this.focused()) {
            this.focused.set(true);
            !this.popup() && this.changeFocusedOptionIndex(0);
            this.onFocus.emit(event);
        }
    }

    onListBlur(event: FocusEvent | MouseEvent) {
        if (this.focused()) {
            this.focused.set(false);
            this.changeFocusedOptionIndex(-1);
            this.selectedOptionIndex.set(-1);
            this.focusedOptionIndex.set(-1);
            this.onBlur.emit(event);
        }
    }

    onListKeyDown(event: KeyboardEvent) {
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
                if (this.popup()) {
                    this.target && focus(this.target);
                    this.hide();
                }
                this.overlayVisible() && this.hide();
                break;

            default:
                break;
        }
    }

    onArrowDownKey(event: KeyboardEvent) {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex());
        this.changeFocusedOptionIndex(optionIndex);
        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        if (event.altKey && this.popup()) {
            this.target && focus(this.target);
            this.hide();
            event.preventDefault();
        } else {
            const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex());

            this.changeFocusedOptionIndex(optionIndex);
            event.preventDefault();
        }
    }

    onHomeKey(event: KeyboardEvent) {
        this.changeFocusedOptionIndex(0);
        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent) {
        this.changeFocusedOptionIndex(find(this.containerViewChild()?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]').length - 1);
        event.preventDefault();
    }

    onEnterKey(event: KeyboardEvent) {
        const element = findSingle(this.containerViewChild()?.nativeElement, `li[id="${`${this.focusedOptionIndex()}`}"]`) as HTMLElement | null;
        const anchorElement = element && ((findSingle(element, '[data-pc-section="itemlink"]') || findSingle(element, 'a,button')) as HTMLElement | null);

        this.popup() && this.target && focus(this.target);
        anchorElement ? anchorElement.click() : element && element.click();

        event.preventDefault();
    }

    onSpaceKey(event: KeyboardEvent) {
        this.onEnterKey(event);
    }

    findNextOptionIndex(index: string | number) {
        const links = find(this.containerViewChild()?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]');
        const matchedOptionIndex = [...links].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }

    findPrevOptionIndex(index: string | number) {
        const links = find(this.containerViewChild()?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]');
        const matchedOptionIndex = [...links].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }

    changeFocusedOptionIndex(index: number) {
        const links = find(this.containerViewChild()?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]');
        if (links.length > 0) {
            let order = index >= links.length ? links.length - 1 : index < 0 ? 0 : index;
            order > -1 && this.focusedOptionIndex.set(links[order].getAttribute('id') ?? -1);
        }
    }

    itemClick(event: { originalEvent: Event; item: MenuItem }, id: string) {
        const { originalEvent, item } = event;

        if (!this.focused()) {
            this.focused.set(true);
            this.onFocus.emit(originalEvent);
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

        if (this.popup()) {
            this.hide();
        }

        if (!this.popup() && this.focusedOptionIndex() !== id) {
            this.focusedOptionIndex.set(id);
        }
    }

    onOverlayClick(event: Event) {
        if (this.popup()) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }

        this.preventDocumentDefault = true;
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener && isPlatformBrowser(this.platformId)) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                const isOutsideContainer = this.containerViewChild()?.nativeElement && !this.containerViewChild()?.nativeElement.contains(event.target);
                const isOutsideTarget = !(this.target && (this.target === event.target || this.target.contains(event.target)));
                if (!this.popup() && isOutsideContainer && isOutsideTarget) {
                    this.onListBlur(event);
                }
                if (this.preventDocumentDefault && this.overlayVisible() && isOutsideContainer && isOutsideTarget) {
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
                if (this.visible()) {
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
            if (this.autoZIndex()) {
                ZIndexUtils.clear(this.container);
            }
            this.container = undefined;
        }
    }

    onDestroy() {
        if (this.popup()) {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            if (this.container) {
                if (this.autoZIndex()) {
                    ZIndexUtils.clear(this.container);
                }
                this.container = undefined;
            }

            this.restoreOverlayAppend();
            this.onOverlayHide();
        }

        if (!this.popup()) {
            this.unbindDocumentClickListener();
        }
    }

    hasSubMenu(): boolean {
        return this.model()?.some((item) => item.items) ?? false;
    }

    isItemHidden(item: MenuItem): boolean {
        if (item.separator) {
            return item.visible === false || !!(item.items && item.items.some((subitem: MenuItem) => subitem.visible !== false));
        }
        return item.visible === false;
    }
}

@NgModule({
    imports: [Menu, SharedModule, SafeHtmlPipe],
    exports: [Menu, SharedModule, SafeHtmlPipe]
})
export class MenuModule {}
