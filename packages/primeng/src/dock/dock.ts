import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    NgModule,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { find, findSingle, resolve, uuid } from '@primeuix/utils';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { Nullable } from 'primeng/ts-helpers';
import { DockStyle } from './style/dockstyle';

/**
 * Dock is a navigation component consisting of menuitems.
 * @group Components
 */
@Component({
    selector: 'p-dock',
    standalone: true,
    imports: [CommonModule, RouterModule, Ripple, TooltipModule, SharedModule],
    template: `
        <div [class]="cx('listContainer')">
            <ul
                #list
                [attr.id]="id"
                [class]="cx('list')"
                role="menu"
                [attr.aria-orientation]="position === 'bottom' || position === 'top' ? 'horizontal' : 'vertical'"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                [tabindex]="tabindex"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.data-pc-section]="'menu'"
                (focus)="onListFocus($event)"
                (blur)="onListBlur($event)"
                (keydown)="onListKeyDown($event)"
                (mouseleave)="onListMouseLeave()"
            >
                @for (item of model; track item.label; let i = $index) {
                    <li
                        *ngIf="item.visible !== false"
                        [attr.id]="getItemId(item, i)"
                        [class]="cn(cx('item', { item, id: getItemId(item, i) }), item?.styleClass)"
                        role="menuitem"
                        [attr.aria-label]="item.label"
                        [attr.aria-disabled]="disabled(item)"
                        (click)="onItemClick($event, item)"
                        (mouseenter)="onItemMouseEnter(i)"
                        [attr.data-pc-section]="'menuitem'"
                        [attr.data-p-focused]="isItemActive(getItemId(item, i))"
                        [attr.data-p-disabled]="disabled(item) || false"
                    >
                        <div [class]="cx('itemContent')" [attr.data-pc-section]="'content'">
                            <a
                                *ngIf="isClickableRouterLink(item); else elseBlock"
                                pRipple
                                [routerLink]="item.routerLink"
                                [queryParams]="item.queryParams"
                                [class]="cx('itemLink')"
                                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                                [target]="item.target"
                                [attr.tabindex]="item.disabled ? null : item.tabindex ? item.tabindex : '-1'"
                                pTooltip
                                [tooltipOptions]="item.tooltipOptions"
                                [fragment]="item.fragment"
                                [queryParamsHandling]="item.queryParamsHandling"
                                [preserveFragment]="item.preserveFragment"
                                [skipLocationChange]="item.skipLocationChange"
                                [replaceUrl]="item.replaceUrl"
                                [state]="item.state"
                                [attr.aria-hidden]="true"
                            >
                                <span [class]="cn(cx('itemIcon'), item.icon)" *ngIf="item.icon && !itemTemplate && !_itemTemplate" [ngStyle]="item.iconStyle"></span>
                                <ng-container *ngTemplateOutlet="itemTemplate || itemTemplate; context: { $implicit: item }"></ng-container>
                            </a>
                            <ng-template #elseBlock>
                                <a
                                    [tooltipPosition]="item.tooltipPosition"
                                    [attr.href]="item.url || null"
                                    [class]="cx('itemLink')"
                                    pRipple
                                    pTooltip
                                    [tooltipOptions]="item.tooltipOptions"
                                    [target]="item.target"
                                    [attr.tabindex]="item.disabled ? null : item.tabindex ? item.tabindex : '-1'"
                                    [attr.aria-hidden]="true"
                                >
                                    <span [class]="cn(cx('itemIcon'), item.icon)" *ngIf="item.icon && !itemTemplate && !_itemTemplate" [ngStyle]="item.iconStyle"></span>
                                    <ng-container *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: item }"></ng-container>
                                </a>
                            </ng-template>
                        </div>
                    </li>
                }
            </ul>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DockStyle],
    host: {
        '[class]': 'cn(cx("root"), styleClass)',
        'data-pc-name': 'dock'
    }
})
export class Dock extends BaseComponent implements AfterContentInit {
    /**
     * Current id state as a string.
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * Class of the element.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * MenuModel instance to define the action items.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined | null = null;
    /**
     * Position of element.
     * @group Props
     */
    @Input() position: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * The breakpoint to define the maximum width boundary.
     * @defaultValue 960px
     * @group Props
     */
    @Input() breakpoint: string | undefined = '960px';
    /**
     * Defines a string that labels the dropdown button for accessibility.
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
     * Callback to invoke when the component loses focus.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ViewChild('list', { static: false }) listViewChild: Nullable<ElementRef>;

    currentIndex: number;

    tabindex: number = 0;

    focused: boolean = false;

    focusedOptionIndex: number = -1;

    _componentStyle = inject(DockStyle);

    matchMediaListener: any;

    query: any;

    queryMatches = signal<boolean>(false);

    mobileActive = signal<boolean>(false);

    get focusedOptionId() {
        return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }

    constructor(public cd: ChangeDetectorRef) {
        super();
        this.currentIndex = -3;
    }

    ngOnInit() {
        super.ngOnInit();
        this.id = this.id || uuid('pn_id_');
        this.bindMatchMediaListener();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.unbindMatchMediaListener();
    }

    @ContentChild('item') itemTemplate: TemplateRef<any> | undefined;

    _itemTemplate: TemplateRef<any> | undefined;

    getItemId(item, index) {
        return item && item?.id ? item.id : `${index}`;
    }

    getItemProp(processedItem, name) {
        return processedItem && processedItem.item ? resolve(processedItem.item[name]) : undefined;
    }

    disabled(item) {
        return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    }

    isItemActive(id) {
        return id === this.focusedOptionIndex;
    }

    onListMouseLeave() {
        this.currentIndex = -3;
        this.cd.markForCheck();
    }

    onItemMouseEnter(index: number) {
        this.currentIndex = index;

        if (index === 1) {
        }

        this.cd.markForCheck();
    }

    onItemClick(e: Event, item: MenuItem) {
        if (item.command) {
            item.command({ originalEvent: e, item });
        }
    }

    onListFocus(event) {
        this.focused = true;
        this.changeFocusedOptionIndex(0);
        this.onFocus.emit(event);
    }

    onListBlur(event) {
        this.focused = false;
        this.focusedOptionIndex = -1;
        this.onBlur.emit(event);
    }

    onListKeyDown(event) {
        switch (event.code) {
            case 'ArrowDown': {
                if (this.position === 'left' || this.position === 'right') this.onArrowDownKey();
                event.preventDefault();
                break;
            }

            case 'ArrowUp': {
                if (this.position === 'left' || this.position === 'right') this.onArrowUpKey();
                event.preventDefault();
                break;
            }

            case 'ArrowRight': {
                if (this.position === 'top' || this.position === 'bottom') this.onArrowDownKey();
                event.preventDefault();
                break;
            }

            case 'ArrowLeft': {
                if (this.position === 'top' || this.position === 'bottom') this.onArrowUpKey();
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
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);

        this.changeFocusedOptionIndex(optionIndex);
    }

    onArrowUpKey() {
        const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);

        this.changeFocusedOptionIndex(optionIndex);
    }

    onHomeKey() {
        this.changeFocusedOptionIndex(0);
    }

    onEndKey() {
        this.changeFocusedOptionIndex(find(this.listViewChild.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]').length - 1);
    }

    onSpaceKey() {
        const element = <any>findSingle(this.listViewChild.nativeElement, `li[id="${`${this.focusedOptionIndex}`}"]`);
        const anchorElement = element && <any>findSingle(element, '[data-pc-section="action"]');

        anchorElement ? anchorElement.click() : element && element.click();
    }

    findNextOptionIndex(index) {
        const menuitems = find(this.listViewChild.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
        const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }

    changeFocusedOptionIndex(index) {
        const menuitems = <any>find(this.listViewChild.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');

        let order = index >= menuitems.length ? menuitems.length - 1 : index < 0 ? 0 : index;

        this.focusedOptionIndex = menuitems[order].getAttribute('id');
    }

    findPrevOptionIndex(index) {
        const menuitems = find(this.listViewChild.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
        const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }

    isClickableRouterLink(item: any) {
        return item.routerLink && !item.disabled;
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this._itemTemplate = item.template;
                    break;

                default:
                    this._itemTemplate = item.template;
                    break;
            }
        });
    }

    bindMatchMediaListener() {
        if (!this.matchMediaListener) {
            const query = window.matchMedia(`(max-width: ${this.breakpoint})`);
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
