import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
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
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    signal
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { PlusIcon } from 'primeng/icons/plus';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { UniqueComponentId } from 'primeng/utils';
import { asapScheduler } from 'rxjs';

/**
 * When pressed, a floating action button can display multiple primary actions that can be performed on a page.
 * @group Components
 */
@Component({
    selector: 'p-speedDial',
    template: `
        <div #container [ngClass]="containerClass()" [class]="className" [ngStyle]="style" [attr.data-pc-name]="'speeddial'" [attr.data-pc-section]="'root'">
            <button
                pRipple
                pButton
                class="p-button-icon-only"
                [style]="buttonStyle"
                [icon]="buttonIconClass"
                [ngClass]="buttonClass()"
                [disabled]="disabled"
                [attr.aria-expanded]="visible"
                [attr.aria-haspopup]="true"
                [attr.aria-controls]="id + '_list'"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                (click)="onButtonClick($event)"
                (keydown)="onTogglerKeydown($event)"
                [attr.data-pc-name]="'button'"
            >
                <PlusIcon *ngIf="!showIcon && !buttonTemplate" />
                <ng-container *ngIf="buttonTemplate">
                    <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
                </ng-container>
            </button>
            <ul
                #list
                class="p-speeddial-list"
                role="menu"
                [id]="id + '_list'"
                (focus)="onFocus($event)"
                (focusout)="onBlur($event)"
                (keydown)="onKeyDown($event)"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                [tabindex]="-1"
                [attr.data-pc-section]="'menu'"
            >
                <li
                    *ngFor="let item of model; let i = index"
                    [ngStyle]="getItemStyle(i)"
                    class="p-speeddial-item"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{ 'p-hidden': item.visible === false, 'p-focus': focusedOptionId == id + '_' + i }"
                    [id]="id + '_' + i"
                    [attr.aria-controls]="id + '_item'"
                    role="menuitem"
                    [attr.data-pc-section]="'menuitem'"
                >
                    <a
                        *ngIf="isClickableRouterLink(item); else elseBlock"
                        pRipple
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        class="p-speeddial-action"
                        [ngClass]="{ 'p-disabled': item.disabled }"
                        role="menuitem"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        (click)="onItemClick($event, item)"
                        (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target"
                        [attr.tabindex]="item.disabled || readonly || !visible ? null : item.tabindex ? item.tabindex : '0'"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                        [attr.aria-label]="item.label"
                        [attr.data-pc-section]="'action'"
                    >
                        <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            [attr.href]="item.url || null"
                            class="p-speeddial-action"
                            role="menuitem"
                            pRipple
                            (click)="onItemClick($event, item)"
                            [ngClass]="{ 'p-disabled': item.disabled }"
                            (keydown.enter)="onItemClick($event, item, i)"
                            [attr.target]="item.target"
                            [attr.data-pc-section]="'action'"
                            [attr.aria-label]="item.label"
                            [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) || !visible ? null : item.tabindex ? item.tabindex : '0'"
                        >
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
        <div *ngIf="mask && visible" [ngClass]="{ 'p-speeddial-mask': true, 'p-speeddial-mask-visible': visible }" [class]="maskClassName" [ngStyle]="maskStyle"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./speeddial.css'],
    host: {
        class: 'p-element'
    }
})
export class SpeedDial implements AfterViewInit, AfterContentInit, OnDestroy {
    /**
     * List of items id.
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * MenuModel instance to define the action items.
     * @group Props
     */
    @Input() model: MenuItem[] | null = null;
    /**
     * Specifies the visibility of the overlay.
     * @defaultValue false
     * @group Props
     */
    @Input() get visible(): boolean {
        return this._visible;
    }
    set visible(value: boolean) {
        this._visible = value;

        if (this._visible) {
            this.bindDocumentClickListener();
        } else {
            this.unbindDocumentClickListener();
        }
    }
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() className: string | undefined;
    /**
     * Specifies the opening direction of actions.
     * @gruop Props
     */
    @Input() direction: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right' | undefined = 'up';
    /**
     * Transition delay step for each action item.
     * @group Props
     */
    @Input() transitionDelay: number = 30;
    /**
     * Specifies the opening type of actions.
     * @group Props
     */
    @Input() type: 'linear' | 'circle' | 'semi-circle' | 'quarter-circle' | undefined = 'linear';
    /**
     * Radius for *circle types.
     * @group Props
     */
    @Input() radius: number = 0;
    /**
     * Whether to show a mask element behind the speeddial.
     * @group Props
     */
    @Input() mask: boolean = false;
    /**
     * Whether the component is disabled.
     * @group Props
     */
    @Input() disabled: boolean = false;
    /**
     * Whether the actions close when clicked outside.
     * @group Props
     */
    @Input() hideOnClickOutside: boolean = true;
    /**
     * Inline style of the button element.
     * @group Props
     */
    @Input() buttonStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the button element.
     * @group Props
     */
    @Input() buttonClassName: string | undefined;
    /**
     * Inline style of the mask element.
     * @group Props
     */
    @Input() maskStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the mask element.
     * @group Props
     */
    @Input() maskClassName: string | undefined;
    /**
     * Show icon of the button element.
     * @group Props
     */
    @Input() showIcon: string | undefined;
    /**
     * Hide icon of the button element.
     * @group Props
     */
    @Input() hideIcon: string | undefined;
    /**
     * Defined to rotate showIcon when hideIcon is not present.
     * @group Props
     */
    @Input() rotateAnimation: boolean = true;
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
     * Fired when the visibility of element changed.
     * @param {boolean} boolean - Visibility value.
     * @group Emits
     */
    @Output() onVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Fired when the visibility of element changed.
     * @param {boolean} boolean - Visibility value.
     * @group Emits
     */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Fired when the button element clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /**
     * Fired when the actions are visible.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onShow: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Fired when the actions are hidden.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onHide: EventEmitter<Event> = new EventEmitter<Event>();

    @ViewChild('container') container: ElementRef | undefined;

    @ViewChild('list') list: ElementRef | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    buttonTemplate: TemplateRef<any> | undefined;

    isItemClicked: boolean = false;

    _visible: boolean = false;

    documentClickListener: any;

    focusedOptionIndex = signal<any>(null);

    focused: boolean = false;

    get focusedOptionId() {
        return this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : null;
    }

    constructor(@Inject(PLATFORM_ID) private platformId: any, private el: ElementRef, public cd: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.type !== 'linear') {
                const button = DomHandler.findSingle(this.container?.nativeElement, '.p-speeddial-button');
                const firstItem = DomHandler.findSingle(this.list?.nativeElement, '.p-speeddial-item');

                if (button && firstItem) {
                    const wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
                    const hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);
                    this.list?.nativeElement.style.setProperty('--item-diff-x', `${wDiff / 2}px`);
                    this.list?.nativeElement.style.setProperty('--item-diff-y', `${hDiff / 2}px`);
                }
            }
        }
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'button':
                    this.buttonTemplate = item.template;
                    break;
            }
        });
    }

    show() {
        this.onVisibleChange.emit(true);
        this.visibleChange.emit(true);
        this._visible = true;
        this.onShow.emit();
        this.bindDocumentClickListener();
        this.cd.markForCheck();
    }

    hide() {
        this.onVisibleChange.emit(false);
        this.visibleChange.emit(false);
        this._visible = false;
        this.onHide.emit();
        this.unbindDocumentClickListener();
        this.cd.markForCheck();
    }

    onButtonClick(event: MouseEvent) {
        this.visible ? this.hide() : this.show();
        this.onClick.emit(event);
        this.isItemClicked = true;
    }

    onItemClick(e: MouseEvent, item: MenuItem) {
        if (item.command) {
            item.command({ originalEvent: e, item });
        }

        this.hide();

        this.isItemClicked = true;
    }

    onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDown(event);
                break;

            case 'ArrowUp':
                this.onArrowUp(event);
                break;

            case 'ArrowLeft':
                this.onArrowLeft(event);
                break;

            case 'ArrowRight':
                this.onArrowRight(event);
                break;

            case 'Enter':
            case 'Space':
                this.onEnterKey(event);
                break;

            case 'Escape':
                this.onEscapeKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            default:
                break;
        }
    }

    onFocus(event) {
        this.focused = true;
    }

    onBlur(event) {
        this.focused = false;
        // fix error: NG0600: Writing to signals is not allowed in a computed or an effect by default
        asapScheduler.schedule(() => this.focusedOptionIndex.set(-1));
    }

    onArrowUp(event) {
        if (this.direction === 'up') {
            this.navigateNextItem(event);
        } else if (this.direction === 'down') {
            this.navigatePrevItem(event);
        } else {
            this.navigateNextItem(event);
        }
    }

    onArrowDown(event) {
        if (this.direction === 'up') {
            this.navigatePrevItem(event);
        } else if (this.direction === 'down') {
            this.navigateNextItem(event);
        } else {
            this.navigatePrevItem(event);
        }
    }

    onArrowLeft(event) {
        const leftValidDirections = ['left', 'up-right', 'down-left'];
        const rightValidDirections = ['right', 'up-left', 'down-right'];

        if (leftValidDirections.includes(this.direction)) {
            this.navigateNextItem(event);
        } else if (rightValidDirections.includes(this.direction)) {
            this.navigatePrevItem(event);
        } else {
            this.navigatePrevItem(event);
        }
    }

    onArrowRight(event) {
        const leftValidDirections = ['left', 'up-right', 'down-left'];
        const rightValidDirections = ['right', 'up-left', 'down-right'];

        if (leftValidDirections.includes(this.direction)) {
            this.navigatePrevItem(event);
        } else if (rightValidDirections.includes(this.direction)) {
            this.navigateNextItem(event);
        } else {
            this.navigateNextItem(event);
        }
    }

    onEndKey(event: any) {
        event.preventDefault();

        this.focusedOptionIndex.set(-1);
        this.navigatePrevItem(event);
    }

    onHomeKey(event: any) {
        event.preventDefault();

        this.focusedOptionIndex.set(-1);
        this.navigateNextItem(event);
    }

    onEnterKey(event: any) {
        const items = DomHandler.find(this.container.nativeElement, '[data-pc-section="menuitem"]');
        const itemIndex = [...items].findIndex((item) => item.id === this.focusedOptionIndex);

        this.onItemClick(event, this.model[itemIndex]);
        this.onBlur(event);

        const buttonEl = DomHandler.findSingle(this.container.nativeElement, 'button');

        buttonEl && DomHandler.focus(buttonEl);
    }

    onEscapeKey(event: KeyboardEvent) {
        this.hide();

        const buttonEl = DomHandler.findSingle(this.container.nativeElement, 'button');

        buttonEl && DomHandler.focus(buttonEl);
    }

    onTogglerKeydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowDown':
            case 'ArrowLeft':
                this.onTogglerArrowDown(event);

                break;

            case 'ArrowUp':
            case 'ArrowRight':
                this.onTogglerArrowUp(event);

                break;

            case 'Escape':
                this.onEscapeKey(event);

                break;

            default:
                break;
        }
    }

    onTogglerArrowUp(event) {
        this.focused = true;
        DomHandler.focus(this.list.nativeElement);

        this.show();
        this.navigatePrevItem(event);

        event.preventDefault();
    }

    onTogglerArrowDown(event) {
        this.focused = true;
        DomHandler.focus(this.list.nativeElement);

        this.show();
        this.navigateNextItem(event);

        event.preventDefault();
    }

    navigateNextItem(event) {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex());

        this.changeFocusedOptionIndex(optionIndex);

        event.preventDefault();
    }

    navigatePrevItem(event) {
        const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex());

        this.changeFocusedOptionIndex(optionIndex);

        event.preventDefault();
    }

    findPrevOptionIndex(index) {
        const items = DomHandler.find(this.container.nativeElement, '[data-pc-section="menuitem"]');

        const filteredItems = [...items].filter((item) => !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled'));
        const newIndex = index === -1 ? filteredItems[filteredItems.length - 1].id : index;
        let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);

        matchedOptionIndex = index === -1 ? filteredItems.length - 1 : matchedOptionIndex - 1;

        return matchedOptionIndex;
    }

    findNextOptionIndex(index) {
        const items = DomHandler.find(this.container.nativeElement, '[data-pc-section="menuitem"]');
        const filteredItems = [...items].filter((item) => !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled'));
        const newIndex = index === -1 ? filteredItems[0].id : index;
        let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);

        matchedOptionIndex = index === -1 ? 0 : matchedOptionIndex + 1;

        return matchedOptionIndex;
    }

    changeFocusedOptionIndex(index) {
        const items = DomHandler.find(this.container.nativeElement, '[data-pc-section="menuitem"]');
        const filteredItems = [...items].filter((item) => !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled'));

        if (filteredItems[index]) {
            this.focusedOptionIndex.set(filteredItems[index].getAttribute('id'));
        }
    }

    calculatePointStyle(index: number) {
        const type = this.type;

        if (type !== 'linear') {
            const length = (this.model as MenuItem[]).length;
            const radius = this.radius || length * 20;

            if (type === 'circle') {
                const step = (2 * Math.PI) / length;

                return {
                    left: `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`,
                    top: `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`
                };
            } else if (type === 'semi-circle') {
                const direction = this.direction;
                const step = Math.PI / (length - 1);
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;
                if (direction === 'up') {
                    return { left: x, bottom: y };
                } else if (direction === 'down') {
                    return { left: x, top: y };
                } else if (direction === 'left') {
                    return { right: y, top: x };
                } else if (direction === 'right') {
                    return { left: y, top: x };
                }
            } else if (type === 'quarter-circle') {
                const direction = this.direction;
                const step = Math.PI / (2 * (length - 1));
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;
                if (direction === 'up-left') {
                    return { right: x, bottom: y };
                } else if (direction === 'up-right') {
                    return { left: x, bottom: y };
                } else if (direction === 'down-left') {
                    return { right: y, top: x };
                } else if (direction === 'down-right') {
                    return { left: y, top: x };
                }
            }
        }

        return {};
    }

    calculateTransitionDelay(index: number) {
        const length = (this.model as MenuItem[]).length;

        return (this.visible ? index : length - index - 1) * this.transitionDelay;
    }

    containerClass() {
        return {
            ['p-speeddial p-component' + ` p-speeddial-${this.type}`]: true,
            [`p-speeddial-direction-${this.direction}`]: this.type !== 'circle',
            'p-speeddial-opened': this.visible,
            'p-disabled': this.disabled
        };
    }

    buttonClass() {
        return {
            'p-speeddial-button p-button-rounded': true,
            'p-speeddial-rotate': this.rotateAnimation && !this.hideIcon,
            [this.buttonClassName!]: true
        };
    }

    get buttonIconClass() {
        return (!this.visible && this.showIcon) || !this.hideIcon ? this.showIcon : this.hideIcon;
    }

    getItemStyle(index: number) {
        const transitionDelay = this.calculateTransitionDelay(index);
        const pointStyle = this.calculatePointStyle(index);
        return {
            transitionDelay: `${transitionDelay}ms`,
            ...pointStyle
        };
    }

    isClickableRouterLink(item: MenuItem) {
        return item.routerLink && !this.disabled && !item.disabled;
    }

    isOutsideClicked(event: Event) {
        return this.container && !(this.container.nativeElement.isSameNode(event.target) || this.container.nativeElement.contains(event.target) || this.isItemClicked);
    }

    bindDocumentClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentClickListener && this.hideOnClickOutside) {
                this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    if (this.visible && this.isOutsideClicked(event)) {
                        this.hide();
                    }

                    this.isItemClicked = false;
                });
            }
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindDocumentClickListener();
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule, PlusIcon],
    exports: [SpeedDial, SharedModule, ButtonModule, TooltipModule, RouterModule],
    declarations: [SpeedDial]
})
export class SpeedDialModule {}
