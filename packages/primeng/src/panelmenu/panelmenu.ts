import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, inject, input, NgModule, numberAttribute, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MotionOptions } from '@primeuix/motion';
import { equals, findSingle, focus, getAttribute, isNotEmpty, resolve, uuid } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronDownIcon, ChevronRightIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuItemTemplateContext, PanelMenuPassThrough } from 'primeng/types/panelmenu';
import { PanelMenuList } from './panelmenu-list';
import { PANELMENU_INSTANCE } from './panelmenu-token';
import { PanelMenuStyle } from './style/panelmenustyle';

/**
 * PanelMenu is a hybrid of Accordion and Tree components.
 * @group Components
 */
@Component({
    selector: 'p-panelmenu, p-panel-menu',
    imports: [NgTemplateOutlet, PanelMenuList, RouterModule, TooltipModule, ChevronDownIcon, ChevronRightIcon, SharedModule, BindModule, MotionModule],
    standalone: true,
    template: `
        @for (item of model(); track item; let i = $index) {
            @if (isItemVisible(item)) {
                <div [class]="cn(cx('panel'), getItemProp(item, 'headerClass'))" [style]="getItemProp(item, 'style')" [pBind]="ptm('panel')">
                    <div
                        [class]="cn(cx('header', { item }), getItemProp(item, 'styleClass'))"
                        [style]="getItemProp(item, 'style')"
                        [pTooltip]="getItemProp(item, 'tooltip')"
                        [pTooltipUnstyled]="unstyled()"
                        [attr.id]="getHeaderId(item, i)"
                        [tabindex]="0"
                        role="button"
                        [tooltipOptions]="getItemProp(item, 'tooltipOptions')"
                        [attr.aria-expanded]="isItemActive(item)"
                        [attr.aria-label]="getItemProp(item, 'label')"
                        [attr.aria-controls]="getContentId(item, i)"
                        [attr.aria-disabled]="isItemDisabled(item)"
                        [attr.data-p-highlight]="isItemActive(item)"
                        [attr.data-p-disabled]="isItemDisabled(item)"
                        [pBind]="getPTOptions('header', item, i)"
                        (click)="onHeaderClick($event, item, i)"
                        (keydown)="onHeaderKeyDown($event, item, i)"
                    >
                        <div [class]="cx('headerContent')" [pBind]="getPTOptions('headerContent', item, i)">
                            @if (!itemTemplate()) {
                                @if (!getItemProp(item, 'routerLink')) {
                                    <a
                                        [attr.href]="getItemProp(item, 'url')"
                                        [attr.tabindex]="-1"
                                        [target]="getItemProp(item, 'target')"
                                        [attr.title]="getItemProp(item, 'title')"
                                        [attr.data-automationid]="getItemProp(item, 'automationId')"
                                        [class]="cn(cx('headerLink'), getItemProp(item, 'linkClass'))"
                                        [style]="getItemProp(item, 'linkStyle')"
                                        [pBind]="getPTOptions('headerLink', item, i)"
                                    >
                                        @if (isItemGroup(item)) {
                                            @if (!headerIconTemplate()) {
                                                @if (isItemActive(item)) {
                                                    <svg data-p-icon="chevron-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                                } @else {
                                                    <svg data-p-icon="chevron-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                                }
                                            }
                                            <ng-container *ngTemplateOutlet="headerIconTemplate()"></ng-container>
                                        }
                                        @if (hasIcon(item)) {
                                            <span [class]="cn(cx('headerIcon'), item.icon, getItemProp(item, 'iconClass'))" [style]="getItemProp(item, 'iconStyle')" [pBind]="getPTOptions('headerIcon', item, i)"></span>
                                        }
                                        @if (shouldEscapeLabel(item)) {
                                            <span [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))" [style]="getItemProp(item, 'labelStyle')" [pBind]="getPTOptions('headerLabel', item, i)">{{ getItemProp(item, 'label') }}</span>
                                        } @else {
                                            <span
                                                [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))"
                                                [style]="getItemProp(item, 'labelStyle')"
                                                [innerHTML]="getItemProp(item, 'label')"
                                                [pBind]="getPTOptions('headerLabel', item, i)"
                                            ></span>
                                        }
                                        @if (hasBadge(item)) {
                                            <span [class]="cn(cx('badge'), getItemProp(item, 'badgeStyleClass'))">{{ getItemProp(item, 'badge') }}</span>
                                        }
                                    </a>
                                }
                            }
                            <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(item)"></ng-container>
                            @if (getItemProp(item, 'routerLink')) {
                                <a
                                    [routerLink]="getItemProp(item, 'routerLink')"
                                    [queryParams]="getItemProp(item, 'queryParams')"
                                    [routerLinkActive]="'p-panelmenu-item-link-active'"
                                    [routerLinkActiveOptions]="getRouterLinkActiveOptions(item)"
                                    [target]="getItemProp(item, 'target')"
                                    [attr.title]="getItemProp(item, 'title')"
                                    [attr.data-automationid]="getItemProp(item, 'automationId')"
                                    [class]="cn(cx('headerLink'), getItemProp(item, 'linkClass'))"
                                    [style]="getItemProp(item, 'linkStyle')"
                                    [attr.tabindex]="-1"
                                    [fragment]="getItemProp(item, 'fragment')"
                                    [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                                    [preserveFragment]="getItemProp(item, 'preserveFragment')"
                                    [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                                    [replaceUrl]="getItemProp(item, 'replaceUrl')"
                                    [state]="getItemProp(item, 'state')"
                                    [pBind]="getPTOptions('headerLink', item, i)"
                                >
                                    @if (isItemGroup(item)) {
                                        @if (!headerIconTemplate()) {
                                            @if (isItemActive(item)) {
                                                <svg data-p-icon="chevron-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                            } @else {
                                                <svg data-p-icon="chevron-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="headerIconTemplate()"></ng-container>
                                    }
                                    @if (hasIcon(item)) {
                                        <span [class]="cn(cx('headerIcon'), item.icon, getItemProp(item, 'iconClass'))" [style]="getItemProp(item, 'iconStyle')" [pBind]="getPTOptions('headerIcon', item, i)"></span>
                                    }
                                    @if (shouldEscapeLabel(item)) {
                                        <span [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))" [style]="getItemProp(item, 'labelStyle')" [pBind]="getPTOptions('headerLabel', item, i)">{{ getItemProp(item, 'label') }}</span>
                                    } @else {
                                        <span [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))" [style]="getItemProp(item, 'labelStyle')" [innerHTML]="getItemProp(item, 'label')" [pBind]="getPTOptions('headerLabel', item, i)"></span>
                                    }
                                    @if (hasBadge(item)) {
                                        <span [class]="cn(cx('badge'), getItemProp(item, 'badgeStyleClass'))">{{ getItemProp(item, 'badge') }}</span>
                                    }
                                </a>
                            }
                        </div>
                    </div>
                    <div
                        [class]="cx('contentContainer', { processedItem: item })"
                        role="region"
                        [attr.id]="getContentId(item, i)"
                        [attr.aria-labelledby]="getHeaderId(item, i)"
                        [pBind]="ptm('contentContainer')"
                        pMotionName="p-collapsible"
                        [pMotion]="isItemActive(item)"
                        [pMotionOptions]="computedMotionOptions()"
                    >
                        <div [class]="cx('contentWrapper')" [pBind]="ptm('contentWrapper')">
                            <div [class]="cx('content')" [pBind]="ptm('content')">
                                <ul
                                    pPanelMenuList
                                    [panelId]="getPanelId(i, item)"
                                    [items]="getItemProp(item, 'items')"
                                    [itemTemplate]="itemTemplate()"
                                    [root]="true"
                                    [activeItem]="activeItem()"
                                    [tabindex]="tabindex()"
                                    [parentExpanded]="isItemActive(item)"
                                    (headerFocus)="updateFocusedHeader($event)"
                                    [pt]="pt()"
                                    [unstyled]="unstyled()"
                                    [motionOptions]="computedMotionOptions()"
                                ></ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PanelMenuStyle, { provide: PANELMENU_INSTANCE, useExisting: PanelMenu }, { provide: PARENT_INSTANCE, useExisting: PanelMenu }],
    host: {
        '[class]': 'cx("root")'
    },
    hostDirectives: [Bind]
})
export class PanelMenu extends BaseComponent<PanelMenuPassThrough> {
    componentName = 'PanelMenu';

    /**
     * An array of menuitems.
     * @group Props
     */
    model = input<MenuItem[]>();
    /**
     * Whether multiple tabs can be activated at the same time or not.
     * @group Props
     */
    multiple = input(false, { transform: booleanAttribute });
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
     * Template option of submenu icon.
     * @group Templates
     */
    submenuIconTemplate = contentChild<TemplateRef<void>>('submenuicon', { descendants: false });
    /**
     * Template option of header icon.
     * @group Templates
     */
    headerIconTemplate = contentChild<TemplateRef<void>>('headericon', { descendants: false });
    /**
     * Template option of item.
     * @param {PanelMenuItemTemplateContext} context - item context.
     * @see {@link PanelMenuItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<PanelMenuItemTemplateContext>>('item', { descendants: false });

    activeItem = signal<MenuItem | null>(null);

    _componentStyle = inject(PanelMenuStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcPanelMenu: PanelMenu | undefined = inject(PANELMENU_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    private _internalId = uuid('pn_id_');

    $id = computed(() => this.id() || this._internalId);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    getPTOptions(key: string, item: MenuItem, index: number) {
        return this.ptm(key, {
            context: {
                item: item,
                index,
                active: this.isItemActive(item)
            }
        });
    }

    /**
     * Collapses open panels.
     * @group Method
     */
    collapseAll() {
        const items = this.model();
        if (items) {
            for (let item of items) {
                if (item.expanded) {
                    item.expanded = false;
                }
            }
        }

        this.cd.detectChanges();
    }

    changeActiveItem(_event: Event, item: MenuItem, _index?: number, selfActive = false) {
        if (!this.isItemDisabled(item)) {
            const activeItemValue = this.activeItem();
            const activeItem = selfActive ? item : activeItemValue && equals(item, activeItemValue) ? null : item;
            this.activeItem.set(activeItem);
        }
    }

    getItemProp(item: MenuItem, name: string): any {
        return item ? resolve((item as any)[name]) : undefined;
    }

    getItemLabel(item: MenuItem) {
        return this.getItemProp(item, 'label');
    }

    isItemActive(item: MenuItem) {
        return item.expanded;
    }

    isItemVisible(item: MenuItem) {
        return this.getItemProp(item, 'visible') !== false;
    }

    isItemDisabled(item: MenuItem) {
        return this.getItemProp(item, 'disabled');
    }

    isItemGroup(item: MenuItem) {
        return isNotEmpty(item.items);
    }

    getRouterLinkActiveOptions(item: MenuItem) {
        return this.getItemProp(item, 'routerLinkActiveOptions') || { exact: false };
    }

    hasIcon(item: MenuItem) {
        return !!item.icon;
    }

    shouldEscapeLabel(item: MenuItem) {
        return this.getItemProp(item, 'escape') !== false;
    }

    hasBadge(item: MenuItem) {
        return !!this.getItemProp(item, 'badge');
    }

    getItemTemplateContext(item: MenuItem) {
        return { $implicit: item };
    }

    getPanelId(index: number, item?: MenuItem) {
        return item && item.id ? item.id : `${this.$id()}_${index}`;
    }

    getHeaderId(item: MenuItem, index: number) {
        return item.id ? item.id + '_header' : `${this.getPanelId(index)}_header`;
    }

    getContentId(item: MenuItem, index: number) {
        return item.id ? item.id + '_content' : `${this.getPanelId(index)}_content`;
    }

    updateFocusedHeader(event: { originalEvent: Event; focusOnNext?: boolean; selfCheck?: boolean }) {
        const { originalEvent, focusOnNext, selfCheck } = event;
        const panelElement = (originalEvent.currentTarget as HTMLElement)?.closest('[data-pc-section="panel"]');
        if (!panelElement) return;
        const header = selfCheck ? findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);

        header ? this.changeFocusedHeader(header as HTMLElement) : focusOnNext ? this.onHeaderHomeKey(originalEvent as KeyboardEvent) : this.onHeaderEndKey(originalEvent as KeyboardEvent);
    }

    changeFocusedHeader(element: HTMLElement | null) {
        element && focus(element);
    }

    findNextHeader(panelElement: Element | null, selfCheck = false): Element | null {
        const nextPanelElement = selfCheck ? panelElement : panelElement?.nextElementSibling;
        if (!nextPanelElement) return null;
        const headerElement = findSingle(nextPanelElement, '[data-pc-section="header"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeader(headerElement.parentElement) : headerElement) : null;
    }

    findPrevHeader(panelElement: Element | null, selfCheck = false): Element | null {
        const prevPanelElement = selfCheck ? panelElement : panelElement?.previousElementSibling;
        if (!prevPanelElement) return null;
        const headerElement = findSingle(prevPanelElement, '[data-pc-section="header"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeader(headerElement.parentElement) : headerElement) : null;
    }

    findFirstHeader(): HTMLElement | null {
        return this.el.nativeElement ? (this.findNextHeader(this.el.nativeElement.firstElementChild, true) as HTMLElement | null) : null;
    }

    findLastHeader(): HTMLElement | null {
        return this.el.nativeElement ? (this.findPrevHeader(this.el.nativeElement.lastElementChild, true) as HTMLElement | null) : null;
    }

    onHeaderClick(event: MouseEvent, item: MenuItem, index: number) {
        if (this.isItemDisabled(item)) {
            event.preventDefault();

            return;
        }

        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        if (!this.multiple()) {
            const items = this.model();
            if (items) {
                for (let modelItem of items) {
                    if (item !== modelItem && modelItem.expanded) {
                        modelItem.expanded = false;
                    }
                }
            }
        }

        item.expanded = !item.expanded;
        this.changeActiveItem(event, item, index);
        focus(event.currentTarget as HTMLElement);
    }

    onHeaderKeyDown(event: KeyboardEvent, item: MenuItem, index: number) {
        switch (event.code) {
            case 'ArrowDown':
                this.onHeaderArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onHeaderArrowUpKey(event);
                break;

            case 'Home':
                this.onHeaderHomeKey(event);
                break;

            case 'End':
                this.onHeaderEndKey(event);
                break;

            case 'Enter':
            case 'Space':
                this.onHeaderEnterKey(event, item, index);
                break;

            default:
                break;
        }
    }

    onHeaderArrowDownKey(event: KeyboardEvent) {
        const currentTarget = event.currentTarget as Element;
        const nextSibling = currentTarget.nextElementSibling;
        const rootList = getAttribute(currentTarget, 'data-p-highlight') === true && nextSibling ? (findSingle(nextSibling, '[data-pc-section="rootlist"]') as HTMLElement | null) : null;

        rootList ? focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: true });
        event.preventDefault();
    }

    onHeaderArrowUpKey(event: KeyboardEvent) {
        const prevHeader = this.findPrevHeader((event.currentTarget as Element).parentElement) || this.findLastHeader();
        const nextSibling = prevHeader?.nextElementSibling;
        const rootList = prevHeader && getAttribute(prevHeader, 'data-p-highlight') === true && nextSibling ? (findSingle(nextSibling, '[data-pc-section="rootlist"]') as HTMLElement | null) : null;

        rootList ? focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: false });
        event.preventDefault();
    }

    onHeaderHomeKey(event: KeyboardEvent) {
        this.changeFocusedHeader(this.findFirstHeader());
        event.preventDefault();
    }

    onHeaderEndKey(event: KeyboardEvent) {
        this.changeFocusedHeader(this.findLastHeader());
        event.preventDefault();
    }

    onHeaderEnterKey(event: KeyboardEvent, item: MenuItem, index: number) {
        const headerAction = findSingle(event.currentTarget as Element, '[data-pc-section="headerlink"]') as HTMLElement | null;

        headerAction ? headerAction.click() : this.onHeaderClick(event as unknown as MouseEvent, item, index);
        event.preventDefault();
    }
}
@NgModule({
    imports: [PanelMenu, SharedModule],
    exports: [PanelMenu, SharedModule]
})
export class PanelMenuModule {}
