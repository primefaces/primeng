import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    NgModule,
    OnDestroy,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { findSingle, focus, getAttribute, getOffset, getWidth, resolve } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent } from 'primeng/basecomponent';
import { ChevronLeftIcon, ChevronRightIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { Nullable } from 'primeng/ts-helpers';
import { TabMenuStyle } from './style/tabmenustyle';

/**
 * TabMenu is a navigation component that displays items as tab headers.
 * @group Components
 */
@Component({
    selector: 'p-tabMenu, p-tabmenu',
    standalone: true,
    imports: [CommonModule, RouterModule, Ripple, TooltipModule, ChevronLeftIcon, ChevronRightIcon, BadgeModule, SharedModule],
    template: `
        <div [ngClass]="{ 'p-tabmenu p-component': true, 'p-tabmenu-scrollable': scrollable }" [ngStyle]="style" [class]="styleClass">
            <div class="p-tabmenu-nav-container">
                <button *ngIf="scrollable && !backwardIsDisabled" #prevBtn class="p-tabmenu-nav-prev-button p-tabmenu-nav-button" (click)="navBackward()" type="button" role="navigation" pRipple>
                    <ChevronLeftIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                </button>
                <div #content class="p-tabmenu-nav-content" (scroll)="onScroll($event)">
                    <ul #navbar class="p-tabmenu-nav p-reset" role="menubar" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel">
                        <li
                            #tab
                            *ngFor="let item of focusableItems; let i = index"
                            role="menuitem"
                            [ngStyle]="item.style"
                            [class]="item.styleClass"
                            [attr.data-p-disabled]="disabled(item)"
                            [attr.data-p-highlight]="focusedItemInfo() === item"
                            (click)="itemClick($event, item)"
                            (keydown)="onKeydownItem($event, i, item)"
                            (focus)="onMenuItemFocus(item)"
                            [ngClass]="{
                                'p-tabmenuitem': true,
                                'p-disabled': getItemProp(item, 'disabled'),
                                'p-tabmenuitem-active': isActive(item),
                                'p-hidden': item.visible === false
                            }"
                            pTooltip
                            [tooltipOptions]="item.tooltipOptions"
                            pRipple
                            [attr.aria-label]="getItemProp(item, 'label')"
                            [attr.tabindex]="disabled(item) ? -1 : 0"
                        >
                            <a
                                #tabLink
                                *ngIf="!item.routerLink && !itemTemplate"
                                class="p-menuitem-link"
                                role="presentation"
                                [attr.href]="getItemProp(item, 'url')"
                                [attr.id]="getItemProp(item, 'id')"
                                [attr.aria-disabled]="disabled(item)"
                                [target]="getItemProp(item, 'target')"
                                [tabindex]="-1"
                            >
                                <ng-container>
                                    <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                                    <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{ getItemProp(item, 'label') }}</span>
                                    <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                    <p-badge *ngIf="item.badge" [styleClass]="item.badgeStyleClass" [value]="getItemProp(item, 'badge')" size="small" />
                                </ng-container>
                            </a>
                            <a
                                #tabLink
                                *ngIf="item.routerLink && !itemTemplate"
                                [routerLink]="item.routerLink"
                                [queryParams]="item.queryParams"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                                role="presentation"
                                class="p-menuitem-link"
                                [target]="item.target"
                                [attr.id]="getItemProp(item, 'id')"
                                [attr.aria-disabled]="disabled(item)"
                                [tabindex]="-1"
                                [fragment]="item.fragment"
                                [queryParamsHandling]="item.queryParamsHandling"
                                [preserveFragment]="item.preserveFragment"
                                [skipLocationChange]="item.skipLocationChange"
                                [replaceUrl]="item.replaceUrl"
                                [state]="item.state"
                            >
                                <ng-container>
                                    <span class="p-menuitem-icon" [attr.aria-hidden]="true" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                                    <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                    <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                    <p-badge *ngIf="item.badge" [styleClass]="item.badgeStyleClass" [value]="getItemProp(item, 'badge')" size="small" />
                                </ng-container>
                            </a>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                        <li #inkbar class="p-tabmenuitem-active-bar" role="presentation" [attr.data-pc-section]="'inkbar'"></li>
                    </ul>
                </div>
                <button *ngIf="scrollable && !forwardIsDisabled" #nextBtn class="p-tabmenu-nav-next-button p-tabmenu-nav-button" (click)="navForward()" type="button" role="navigation" pRipple>
                    <ChevronRightIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TabMenuStyle]
})
export class TabMenu extends BaseComponent implements AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {
    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() set model(value: MenuItem[] | undefined) {
        this._model = value;
        this._focusableItems = (this._model || []).reduce((result, item) => {
            result.push(item);

            return result;
        }, []);
    }
    get model(): MenuItem[] | undefined {
        return this._model;
    }
    /**
     * Defines the default active menuitem
     * @group Props
     */
    @Input() set activeItem(value: MenuItem | undefined) {
        this._activeItem = value;
        this.activeItemChange.emit(value);
        this.tabChanged = true;
    }

    get activeItem(): MenuItem | undefined {
        return this._activeItem;
    }
    /**
     * When enabled displays buttons at each side of the tab headers to scroll the tab list.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) scrollable: boolean | undefined;
    /**
     * Defines if popup mode enabled.
     */
    @Input({ transform: booleanAttribute }) popup: boolean | undefined;
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
     * Event fired when a tab is selected.
     * @param {MenuItem} item - Menu item.
     * @group Emits
     */
    @Output() activeItemChange: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

    @ViewChild('content') content: Nullable<ElementRef>;

    @ViewChild('navbar') navbar: Nullable<ElementRef>;

    @ViewChild('inkbar') inkbar: Nullable<ElementRef>;

    @ViewChild('prevBtn') prevBtn: Nullable<ElementRef>;

    @ViewChild('nextBtn') nextBtn: Nullable<ElementRef>;

    @ViewChildren('tabLink') tabLink: Nullable<QueryList<ElementRef>>;

    @ViewChildren('tab') tab: Nullable<QueryList<ElementRef>>;

    /**
     * Template of the menu item.
     * @group Templates
     */
    @ContentChild('item') itemTemplate: Nullable<TemplateRef<any>>;
    /**
     * Template of the previous icon.
     * @group Templates
     */
    @ContentChild('previousicon') previousIconTemplate: Nullable<TemplateRef<any>>;
    /**
     * Template of the next icon.
     * @group Templates
     */
    @ContentChild('nexticon') nextIconTemplate: Nullable<TemplateRef<any>>;

    tabChanged: boolean | undefined;

    backwardIsDisabled: boolean = true;

    forwardIsDisabled: boolean = false;

    private timerIdForInitialAutoScroll: any = null;

    _focusableItems: MenuItem[] | undefined | any;

    _model: MenuItem[] | undefined;

    _activeItem: MenuItem | undefined;

    focusedItemInfo = signal<any>(null);

    router = inject(Router);

    route = inject(ActivatedRoute);

    _componentStyle = inject(TabMenuStyle);

    get focusableItems() {
        if (!this._focusableItems || !this._focusableItems.length) {
            this._focusableItems = (this.model || []).reduce((result, item) => {
                result.push(item);

                return result;
            }, []);
        }
        return this._focusableItems;
    }

    constructor() {
        super();
        console.log('TabMenu is deprecated as of v18. Use tabs component instead https://primeng.org/tabs#tabmenu');
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;

                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.updateInkBar();
            this.initAutoScrollForActiveItem();
            this.initButtonState();
        }
    }

    ngAfterViewChecked() {
        if (isPlatformBrowser(this.platformId)) {
            this.updateInkBar();
            this.tabChanged = false;
        }
    }

    ngOnDestroy(): void {
        this.clearAutoScrollHandler();
        super.ngOnDestroy();
    }

    isActive(item: MenuItem) {
        if (item.routerLink) {
            const routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];

            return this.router.isActive(this.router.createUrlTree(routerLink, { relativeTo: this.route }).toString(), item.routerLinkActiveOptions?.exact ?? item.routerLinkActiveOptions ?? false);
        }

        return item === this.activeItem;
    }

    getItemProp(item: any, name: string) {
        return item ? resolve(item[name]) : undefined;
    }

    visible(item) {
        return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
    }

    disabled(item) {
        return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    }

    onMenuItemFocus(item) {
        this.focusedItemInfo.set(item);
    }

    itemClick(event: Event, item: MenuItem) {
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

        this.activeItem = item;
        this.activeItemChange.emit(item);
        this.tabChanged = true;
        this.cd.markForCheck();
    }

    onKeydownItem(event, index, item) {
        let i = index;

        let foundElement = {};
        const tabs = this.tab.toArray();

        switch (event.code) {
            case 'ArrowRight':
                foundElement = this.findNextItem(tabs, i);
                i = foundElement['i'];
                this.changeFocusedTab(event, foundElement['nextItem'], i);
                break;

            case 'ArrowLeft':
                foundElement = this.findPrevItem(tabs, i);
                i = foundElement['i'];
                this.changeFocusedTab(event, foundElement['prevItem'], i);
                break;

            case 'End':
                foundElement = this.findPrevItem(tabs, this.model.length);
                i = foundElement['i'];
                this.changeFocusedTab(event, foundElement['prevItem'], i);
                event.preventDefault();
                break;

            case 'Home':
                foundElement = this.findNextItem(tabs, -1);
                i = foundElement['i'];
                this.changeFocusedTab(event, foundElement['nextItem'], i);
                event.preventDefault();
                break;

            case 'Space':
            case 'Enter':
                this.itemClick(event, item);
                break;

            case 'Tab':
                this.onTabKeyDown(tabs);
                break;

            default:
                break;
        }

        if (tabs[i] && tabs[index]) {
            tabs[index].nativeElement.tabIndex = '-1';
            tabs[i].nativeElement.tabIndex = '0';
            tabs[i].nativeElement.focus();
        }
        this.cd.markForCheck();
    }

    onTabKeyDown(tabLinks) {
        tabLinks.forEach((item) => {
            item.nativeElement.tabIndex = getAttribute(item.nativeElement.parentElement, 'data-p-highlight') ? '0' : '-1';
        });
    }

    changeFocusedTab(event: KeyboardEvent, element: HTMLLIElement, index: number) {
        if (element) {
            focus(element);
            element.scrollIntoView({ block: 'nearest' });

            this.itemClick(event, element);
        }
    }

    findNextItem(items, index) {
        let i = index + 1;

        if (i >= items.length) {
            return { nextItem: items[items.length], i: items.length };
        }

        let nextItem = items[i];

        if (nextItem) return getAttribute(nextItem.nativeElement, 'data-p-disabled') ? this.findNextItem(items, i) : { nextItem: nextItem.nativeElement, i };
        else return null;
    }

    findPrevItem(items, index) {
        let i = index - 1;

        if (i < 0) {
            return { prevItem: items[0], i: 0 };
        }

        let prevItem = items[i];

        if (prevItem) return getAttribute(prevItem.nativeElement, 'data-p-disabled') ? this.findPrevItem(items, i) : { prevItem: prevItem.nativeElement, i };
        else return null;
    }

    updateInkBar() {
        const tabHeader = findSingle(this.navbar?.nativeElement, 'li.p-tabmenu-active');
        if (tabHeader) {
            (this.inkbar as ElementRef).nativeElement.style.width = getWidth(tabHeader as any) + 'px';
            (this.inkbar as ElementRef).nativeElement.style.left = <any>getOffset(tabHeader).left - <any>getOffset(this.navbar?.nativeElement).left + 'px';
        }
    }

    getVisibleButtonWidths() {
        return [this.prevBtn?.nativeElement, this.nextBtn?.nativeElement].reduce((acc, el) => (el ? acc + getWidth(el) : acc), 0);
    }

    updateButtonState() {
        const content = this.content?.nativeElement;
        const { scrollLeft, scrollWidth } = content;
        const width = getWidth(content);

        this.backwardIsDisabled = scrollLeft === 0;
        this.forwardIsDisabled = parseInt(scrollLeft) === scrollWidth - width;
    }

    updateScrollBar(index: number): void {
        const tabHeader = this.navbar?.nativeElement.children[index];

        if (!tabHeader) {
            return;
        }

        tabHeader.scrollIntoView({ block: 'nearest' });
    }

    onScroll(event: Event) {
        this.scrollable && this.updateButtonState();

        event.preventDefault();
    }

    navBackward() {
        const content = this.content?.nativeElement;
        const width = getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft - width;
        content.scrollLeft = pos <= 0 ? 0 : pos;
    }

    navForward() {
        const content = this.content?.nativeElement;
        const width = getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft + width;
        const lastPos = content.scrollWidth - width;
        content.scrollLeft = pos >= lastPos ? lastPos : pos;
    }

    private initAutoScrollForActiveItem(): void {
        if (!this.scrollable) {
            return;
        }

        this.clearAutoScrollHandler();
        // We have to wait for the rendering and then can scroll to element.
        this.timerIdForInitialAutoScroll = setTimeout(() => {
            const activeItem = (this.model as MenuItem[]).findIndex((menuItem) => this.isActive(menuItem));

            if (activeItem !== -1) {
                this.updateScrollBar(activeItem);
            }
        });
    }

    private clearAutoScrollHandler(): void {
        if (this.timerIdForInitialAutoScroll) {
            clearTimeout(this.timerIdForInitialAutoScroll);
            this.timerIdForInitialAutoScroll = null;
        }
    }

    private initButtonState(): void {
        if (this.scrollable) {
            // We have to wait for the rendering and then retrieve the actual size element from the DOM.
            // in future `Promise.resolve` can be changed to `queueMicrotask` (if ie11 support will be dropped)
            Promise.resolve().then(() => {
                this.updateButtonState();
                this.cd.markForCheck();
            });
        }
    }
}

@NgModule({
    imports: [TabMenu, SharedModule],
    exports: [TabMenu, SharedModule]
})
export class TabMenuModule {}
