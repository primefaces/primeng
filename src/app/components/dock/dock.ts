import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Nullable } from 'dist/ts-helpers';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { UniqueComponentId } from '../utils/uniquecomponentid';
/**
 * Dock is a navigation component consisting of menuitems.
 * @group Components
 */
@Component({
    selector: 'p-dock',
    template: `
        <div [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'dock'">
            <div class="p-dock-list-container">
                <ul
                    #list
                    [id]="listId"
                    class="p-dock-list"
                    role="menu"
                    [attr.aria-orientation]="position === 'bottom' || position === 'top' ? 'horizontal' : 'vertical'"
                    [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                    [tabindex]="tabindex"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    (focus)="onListFocus($event)"
                    (blur)="onListBlur($event)"
                    (keydown)="onListKeyDown($event)"
                    (mouseleave)="onListMouseLeave()"
                >
                    <li
                        *ngFor="let item of model; let i = index"
                        [attr.id]="getItemId(i)"
                        [ngClass]="itemClass(i)"
                        role="menuitem"
                        [attr.aria-label]="item.label"
                        [attr.aria-disabled]="disabled(item)"
                        (click)="onItemClick($event, item)"
                        (mouseenter)="onItemMouseEnter(i)"
                        [attr.data-p-focused]="isItemActive(getItemId(i))"
                        [attr.data-p-disabled]="disabled(item) || false"
                    >
                        <a
                            *ngIf="isClickableRouterLink(item); else elseBlock"
                            pRipple
                            [routerLink]="item.routerLink"
                            [queryParams]="item.queryParams"
                            [ngClass]="{ 'p-disabled': item.disabled }"
                            class="p-dock-action"
                            [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                            (click)="onItemClick($event, item)"
                            (keydown.enter)="onItemClick($event, item, i)"
                            [target]="item.target"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled || readonly ? null : item.tabindex ? item.tabindex : '-1'"
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
                            <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                        </a>
                        <ng-template #elseBlock>
                            <a
                                [tooltipPosition]="item.tooltipPosition"
                                [attr.href]="item.url || null"
                                class="p-dock-action"
                                pRipple
                                (click)="onItemClick($event, item)"
                                pTooltip
                                [tooltipOptions]="item.tooltipOptions"
                                [ngClass]="{ 'p-disabled': item.disabled }"
                                (keydown.enter)="onItemClick($event, item, i)"
                                [target]="item.target"
                                [attr.id]="item.id"
                                [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) ? null : item.tabindex ? item.tabindex : '-1'"
                                [attr.aria-hidden]="true"
                            >
                                <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </a>
                        </ng-template>
                    </li>
                </ul>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dock.css'],
    host: {
        class: 'p-element'
    }
})
export class Dock implements AfterContentInit {
    /**
     * Current id state as a string.
     * @group Props
     */
    @Input() id: string | undefined = null;
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
     * MenuModel instance to define the action items.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined | null = null;
    /**
     * Position of element.
     * @group Props
     */
    @Input() position: 'bottom' | 'top' | 'left' | 'right' = 'bottom';

    @Input() ariaLabel: string | undefined;

    @Input() ariaLabelledBy: string | undefined;

    @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    @ViewChild('list', { static: false }) listViewChild: Nullable<ElementRef>;

    itemTemplate: TemplateRef<any> | undefined;

    listId = UniqueComponentId();

    currentIndex: number;

    tabindex: number = 0;

    focused: boolean = false;

    focusedOptionIndex: number = -1;

    get focusedOptionId() {
        return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }

    constructor(private el: ElementRef, public cd: ChangeDetectorRef) {
        this.currentIndex = -3;
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    getItemId(index) {
        return `${index}`;
    }

    getItemProp(processedItem, name) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
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
        this.changeFocusedOptionIndex(DomHandler.find(this.listViewChild.nativeElement, 'li[data-p-disabled="false"]').length - 1);
    }

    onSpaceKey() {
        const element = DomHandler.findSingle(this.listViewChild.nativeElement, `li[id="${`${this.focusedOptionIndex}`}"]`);
        const anchorElement = element && DomHandler.findSingle(element, '[data-pc-section="action"]');

        anchorElement ? anchorElement.click() : element && element.click();
    }

    findNextOptionIndex(index) {
        const menuitems = DomHandler.find(this.listViewChild.nativeElement, 'li[data-p-disabled="false"]');
        const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }

    changeFocusedOptionIndex(index) {
        const menuitems = DomHandler.find(this.listViewChild.nativeElement, 'li[data-p-disabled="false"]');

        let order = index >= menuitems.length ? menuitems.length - 1 : index < 0 ? 0 : index;

        this.focusedOptionIndex = menuitems[order].getAttribute('id');

        console.log(this.focusedOptionIndex);
    }

    findPrevOptionIndex(index) {
        const menuitems = DomHandler.find(this.listViewChild.nativeElement, 'li[data-p-disabled="false"]');
        const matchedOptionIndex = [...menuitems].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }

    get containerClass() {
        return {
            ['p-dock p-component ' + ` p-dock-${this.position}`]: true
        };
    }

    isClickableRouterLink(item: any) {
        return item.routerLink && !item.disabled;
    }

    itemClass(index: number) {
        return {
            'p-dock-item': true,
            'p-dock-item-second-prev': this.currentIndex - 2 === index,
            'p-dock-item-prev': this.currentIndex - 1 === index,
            'p-dock-item-current': this.currentIndex === index,
            'p-dock-item-next': this.currentIndex + 1 === index,
            'p-dock-item-second-next': this.currentIndex + 2 === index,
            'p-focus': this.isItemActive(this.getItemId(index))
        };
    }
}

@NgModule({
    imports: [CommonModule, RouterModule, RippleModule, TooltipModule],
    exports: [Dock, SharedModule, TooltipModule, RouterModule],
    declarations: [Dock]
})
export class DockModule {}
