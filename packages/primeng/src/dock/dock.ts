import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, InjectionToken, input, NgModule, output, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { find, findSingle, uuid } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { Badge } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { DockItemTemplateContext, DockPassThrough, DockPosition } from 'primeng/types/dock';
import { DockStyle } from './style/dockstyle';

const DOCK_INSTANCE = new InjectionToken<Dock>('DOCK_INSTANCE');

/**
 * Dock is a navigation component consisting of menuitems.
 * @group Components
 */
@Component({
    selector: 'p-dock',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, RouterLink, RouterLinkActive, Ripple, TooltipModule, SharedModule, Bind, Badge],
    template: `
        <div [class]="cx('listContainer')" [pBind]="ptm('listContainer')">
            <ul
                #list
                [attr.id]="$id()"
                [class]="cx('list')"
                role="menu"
                [attr.aria-orientation]="ariaOrientation()"
                [attr.aria-activedescendant]="activeDescendant()"
                [tabindex]="tabindex"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                (focus)="onListFocus($event)"
                (blur)="onListBlur($event)"
                (keydown)="onListKeyDown($event)"
                (mouseleave)="onListMouseLeave()"
                [pBind]="ptm('list')"
            >
                @for (item of model(); track item.label; let i = $index) {
                    @if (item.visible !== false) {
                        <li
                            [attr.id]="getItemId(item, i)"
                            [class]="cn(cx('item', { item, id: getItemId(item, i) }), item?.styleClass)"
                            [style]="item.style"
                            role="menuitem"
                            [attr.aria-label]="item.label"
                            [attr.aria-disabled]="disabled(item) || false"
                            (click)="onItemClick($event, item)"
                            (mouseenter)="onItemMouseEnter(i)"
                            [pBind]="getPTOptions(item, i, 'item')"
                            [attr.data-p-focused]="isItemActive(getItemId(item, i))"
                            [attr.data-p-disabled]="disabled(item) || false"
                        >
                            <div [class]="cx('itemContent')" [pBind]="getPTOptions(item, i, 'itemContent')">
                                @if (isClickableRouterLink(item)) {
                                    <a
                                        pRipple
                                        [routerLink]="item.routerLink"
                                        [queryParams]="item.queryParams"
                                        [class]="cn(cx('itemLink'), item?.linkClass)"
                                        [style]="item?.linkStyle"
                                        routerLinkActive="router-link-active"
                                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                                        [target]="item.target"
                                        [attr.title]="item.title"
                                        [attr.data-automationid]="item.automationId"
                                        [attr.tabindex]="getItemTabIndex(item)"
                                        pTooltip
                                        [tooltipOptions]="item.tooltipOptions"
                                        [pTooltipUnstyled]="unstyled()"
                                        [fragment]="item.fragment"
                                        [queryParamsHandling]="item.queryParamsHandling"
                                        [preserveFragment]="item.preserveFragment"
                                        [skipLocationChange]="item.skipLocationChange"
                                        [replaceUrl]="item.replaceUrl"
                                        [state]="item.state"
                                        [attr.aria-hidden]="true"
                                        [pBind]="getPTOptions(item, i, 'itemLink')"
                                    >
                                        @if (item.icon && !itemTemplate()) {
                                            <span [class]="cn(cx('itemIcon'), item.icon, item.iconClass)" [style]="item.iconStyle" [pBind]="getPTOptions(item, i, 'itemIcon')"></span>
                                        }
                                        <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }"></ng-container>
                                        @if (item.badge) {
                                            <p-badge [class]="item.badgeStyleClass" [value]="item.badge" [pt]="getPTOptions(item, i, 'pcBadge')" [unstyled]="unstyled()" />
                                        }
                                    </a>
                                } @else {
                                    <a
                                        [tooltipPosition]="item.tooltipPosition"
                                        [attr.href]="item.url || null"
                                        [class]="cn(cx('itemLink'), item?.linkClass)"
                                        [style]="item?.linkStyle"
                                        pRipple
                                        pTooltip
                                        [tooltipOptions]="item.tooltipOptions"
                                        [pTooltipUnstyled]="unstyled()"
                                        [target]="item.target"
                                        [attr.title]="item.title"
                                        [attr.data-automationid]="item.automationId"
                                        [attr.tabindex]="getItemTabIndex(item)"
                                        [attr.aria-hidden]="true"
                                        [pBind]="getPTOptions(item, i, 'itemLink')"
                                    >
                                        @if (item.icon && !itemTemplate()) {
                                            <span [class]="cn(cx('itemIcon'), item.icon, item.iconClass)" [style]="item.iconStyle" [pBind]="getPTOptions(item, i, 'itemIcon')"></span>
                                        }
                                        <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }"></ng-container>
                                        @if (item.badge) {
                                            <p-badge [class]="item.badgeStyleClass" [value]="item.badge" [pt]="getPTOptions(item, i, 'pcBadge')" [unstyled]="unstyled()" />
                                        }
                                    </a>
                                }
                            </div>
                        </li>
                    }
                }
            </ul>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DockStyle, { provide: DOCK_INSTANCE, useExisting: Dock }, { provide: PARENT_INSTANCE, useExisting: Dock }],
    host: {
        '[class]': 'cx("root")'
    },
    hostDirectives: [Bind]
})
export class Dock extends BaseComponent<DockPassThrough> {
    componentName = 'Dock';

    /**
     * Current id state as a string.
     * @group Props
     */
    id = input<string>();
    /**
     * MenuModel instance to define the action items.
     * @group Props
     */
    model = input<MenuItem[] | null>(null);
    /**
     * Position of element.
     * @group Props
     */
    position = input<DockPosition>('bottom');
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * The breakpoint to define the maximum width boundary.
     * @defaultValue 960px
     * @group Props
     */
    breakpoint = input<string>('960px');
    /**
     * Defines a string that labels the dropdown button for accessibility.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Callback to execute when button is focused.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onFocus = output<FocusEvent>();
    /**
     * Callback to invoke when the component loses focus.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onBlur = output<FocusEvent>();

    /**
     * Custom item template.
     * @param {DockItemTemplateContext} context - item template context.
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<DockItemTemplateContext>>('item');

    listViewChild = viewChild<ElementRef>('list');

    private _internalId = uuid('pn_id_');

    $id = computed(() => this.id() || this._internalId);

    ariaOrientation = computed(() => {
        const pos = this.position();
        return pos === 'bottom' || pos === 'top' ? 'horizontal' : 'vertical';
    });

    currentIndex = signal(-3);

    tabindex: number = 0;

    focused = signal(false);

    focusedOptionIndex = signal<string | number>(-1);

    _componentStyle = inject(DockStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcDock: Dock | undefined = inject(DOCK_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    matchMediaListener: any;

    query: any;

    queryMatches = signal<boolean>(false);

    mobileActive = signal<boolean>(false);

    focusedOptionId = computed(() => {
        const index = this.focusedOptionIndex();
        return index !== -1 && index !== '-1' ? String(index) : null;
    });

    activeDescendant = computed(() => {
        return this.focused() ? this.focusedOptionId() : undefined;
    });

    getItemTabIndex(item: MenuItem) {
        return item.disabled ? null : item.tabindex ? item.tabindex : '-1';
    }

    onInit() {
        this.bindMatchMediaListener();
    }

    onDestroy() {
        this.unbindMatchMediaListener();
    }

    getItemId(item: MenuItem, index: number) {
        return item && item?.id ? item.id : `${index}`;
    }

    disabled(item: MenuItem) {
        return typeof item.disabled === 'function' ? (item.disabled as () => boolean)() : item.disabled || false;
    }

    isItemActive(id: string) {
        return String(id) === String(this.focusedOptionIndex());
    }

    onListMouseLeave() {
        this.currentIndex.set(-3);
    }

    onItemMouseEnter(index: number) {
        this.currentIndex.set(index);
    }

    onItemClick(e: Event, item: MenuItem) {
        if (item.command) {
            item.command({ originalEvent: e, item });
        }
    }

    onListFocus(event: FocusEvent) {
        this.focused.set(true);
        this.changeFocusedOptionIndex(0);
        this.onFocus.emit(event);
    }

    onListBlur(event: FocusEvent) {
        this.focused.set(false);
        this.focusedOptionIndex.set(-1);
        this.onBlur.emit(event);
    }

    onListKeyDown(event: KeyboardEvent) {
        const pos = this.position();
        switch (event.code) {
            case 'ArrowDown': {
                if (pos === 'left' || pos === 'right') this.onArrowDownKey();
                event.preventDefault();
                break;
            }

            case 'ArrowUp': {
                if (pos === 'left' || pos === 'right') this.onArrowUpKey();
                event.preventDefault();
                break;
            }

            case 'ArrowRight': {
                if (pos === 'top' || pos === 'bottom') this.onArrowDownKey();
                event.preventDefault();
                break;
            }

            case 'ArrowLeft': {
                if (pos === 'top' || pos === 'bottom') this.onArrowUpKey();
                event.preventDefault();
                break;
            }

            case 'Home': {
                this.onHomeKey();
                event.preventDefault();
                break;
            }

            case 'End': {
                this.onEndKey();
                event.preventDefault();
                break;
            }

            case 'Enter':

            case 'Space': {
                this.onSpaceKey();
                event.preventDefault();
                break;
            }

            default:
                break;
        }
    }

    onArrowDownKey() {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex());

        this.changeFocusedOptionIndex(optionIndex);
    }

    onArrowUpKey() {
        const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex());

        this.changeFocusedOptionIndex(optionIndex);
    }

    onHomeKey() {
        this.changeFocusedOptionIndex(0);
    }

    onEndKey() {
        this.changeFocusedOptionIndex(find(this.listViewChild()?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]').length - 1);
    }

    onSpaceKey() {
        const element = findSingle(this.listViewChild()?.nativeElement, `li[id="${`${this.focusedOptionIndex()}`}"]`) as HTMLElement;
        const anchorElement = element && (findSingle(element, 'a,button') as HTMLElement);

        anchorElement ? anchorElement.click() : element && element.click();
    }

    findNextOptionIndex(index: string | number) {
        const menuitems = find(this.listViewChild()?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]');
        const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }

    changeFocusedOptionIndex(index: number) {
        const menuitems = find(this.listViewChild()?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]') as HTMLElement[];

        let order = index >= menuitems.length ? menuitems.length - 1 : index < 0 ? 0 : index;

        this.focusedOptionIndex.set(menuitems[order]?.getAttribute('id') ?? -1);
    }

    findPrevOptionIndex(index: string | number) {
        const menuitems = find(this.listViewChild()?.nativeElement, 'li[data-pc-section="item"][data-p-disabled="false"]');
        const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }

    isClickableRouterLink(item: any) {
        return !!item.routerLink && !this.disabled(item);
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    getPTOptions(item: MenuItem, index: number, key: string) {
        return this.ptm(key, {
            context: {
                item,
                index
            }
        });
    }

    bindMatchMediaListener() {
        if (!this.matchMediaListener) {
            const query = window.matchMedia(`(max-width: ${this.breakpoint()})`);
            this.query = query;
            this.queryMatches.set(query.matches);

            this.matchMediaListener = () => {
                this.queryMatches.set(query.matches);
                this.mobileActive.set(false);
            };

            this.renderer.listen(this.query, 'change', this.matchMediaListener.bind(this));
        }
    }

    unbindMatchMediaListener() {
        if (this.matchMediaListener) {
            this.matchMediaListener();
            this.matchMediaListener = null;
            this.query = null;
        }
    }
}

@NgModule({
    imports: [Dock, SharedModule],
    exports: [Dock, SharedModule]
})
export class DockModule {}
