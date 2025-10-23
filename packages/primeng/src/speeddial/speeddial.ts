import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    inject,
    InjectionToken,
    Input,
    NgModule,
    numberAttribute,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { find, findSingle, focus, hasClass, uuid } from '@primeuix/utils';
import { MenuItem, PrimeTemplate, SharedModule, TooltipOptions } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ButtonModule, ButtonProps } from 'primeng/button';
import { PlusIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { SpeedDialPassThrough } from 'primeng/types/speeddial';
import { asapScheduler } from 'rxjs';
import { SpeedDialStyle } from './style/speeddialstyle';

const SPEED_DIAL_INSTANCE = new InjectionToken<SpeedDial>('SPEED_DIAL_INSTANCE');

/**
 * When pressed, a floating action button can display multiple primary actions that can be performed on a page.
 * @group Components
 */
@Component({
    selector: 'p-speeddial, p-speedDial, p-speed-dial',
    standalone: true,
    imports: [CommonModule, ButtonModule, Ripple, TooltipModule, RouterModule, PlusIcon, SharedModule, Bind],
    template: `
        <div #container [pBind]="ptm('root')" [class]="cn(cx('root'), className)" [style]="style" [ngStyle]="sx('root')">
            <ng-container *ngIf="!buttonTemplate && !_buttonTemplate">
                <button
                    type="button"
                    pButton
                    pRipple
                    [style]="buttonStyle"
                    [icon]="buttonIconClass"
                    [class]="cn(cx('pcButton'), buttonClassName)"
                    [disabled]="disabled"
                    [attr.aria-expanded]="visible"
                    [attr.aria-haspopup]="true"
                    [attr.aria-controls]="id + '_list'"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    (click)="onButtonClick($event)"
                    (keydown)="onTogglerKeydown($event)"
                    [buttonProps]="buttonProps"
                    [pt]="ptm('pcButton')"
                >
                    <svg data-p-icon="plus" pButtonIcon [pt]="ptm('pcButton')['icon']" *ngIf="!buttonIconClass && !iconTemplate && !_iconTemplate" />
                    <ng-container *ngTemplateOutlet="iconTemplate || _iconTemplate"></ng-container>
                </button>
            </ng-container>
            <ng-container *ngIf="buttonTemplate || _buttonTemplate">
                <ng-container *ngTemplateOutlet="buttonTemplate || _buttonTemplate; context: { toggleCallback: onButtonClick.bind(this) }"></ng-container>
            </ng-container>
            <ul
                #list
                [pBind]="ptm('list')"
                [class]="cx('list')"
                role="menu"
                [id]="id + '_list'"
                (focus)="onFocus($event)"
                (focusout)="onBlur($event)"
                (keydown)="onKeyDown($event)"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                [tabindex]="-1"
                [ngStyle]="sx('list')"
            >
                <li
                    *ngFor="let item of model; let i = index"
                    [pBind]="getPTOptions(id + '_' + i, 'item')"
                    [ngStyle]="getItemStyle(i)"
                    [class]="cx('item', { item, i })"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions || getTooltipOptions(item)"
                    [id]="id + '_' + i"
                    [attr.aria-controls]="id + '_item'"
                    role="menuitem"
                    [attr.data-p-active]="isItemActive(id + '_' + i)"
                >
                    <ng-container *ngIf="itemTemplate || _itemTemplate">
                        <ng-container *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: item, index: i, toggleCallback: onItemClick.bind(this) }"></ng-container>
                    </ng-container>
                    <ng-container *ngIf="!itemTemplate && !_itemTemplate">
                        <button
                            type="button"
                            pButton
                            pRipple
                            [class]="cx('pcAction')"
                            severity="secondary"
                            [rounded]="true"
                            size="small"
                            role="menuitem"
                            [icon]="item.icon"
                            (click)="onItemClick($event, item)"
                            [disabled]="item?.disabled"
                            (keydown.enter)="onItemClick($event, item)"
                            [attr.aria-label]="item.label"
                            [attr.tabindex]="item.disabled || !visible ? null : item.tabindex ? item.tabindex : '0'"
                            [pt]="getPTOptions(id + '_' + i, 'pcAction')"
                        >
                            <span *ngIf="item.icon" pButtonIcon [pt]="getPTOptions(id + '_' + i, 'actionIcon')" [class]="item.icon"></span>
                        </button>
                    </ng-container>
                </li>
            </ul>
        </div>
        <div *ngIf="mask && visible" [pBind]="ptm('mask')" [class]="cn(cx('mask'), maskClassName)" [ngStyle]="maskStyle"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [SpeedDialStyle, { provide: SPEED_DIAL_INSTANCE, useExisting: SpeedDial }, { provide: PARENT_INSTANCE, useExisting: SpeedDial }],
    hostDirectives: [Bind]
})
export class SpeedDial extends BaseComponent<SpeedDialPassThrough> {
    $pcSpeedDial: SpeedDial | undefined = inject(SPEED_DIAL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

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
    @Input({ transform: numberAttribute }) transitionDelay: number = 30;
    /**
     * Specifies the opening type of actions.
     * @group Props
     */
    @Input() type: 'linear' | 'circle' | 'semi-circle' | 'quarter-circle' | undefined = 'linear';
    /**
     * Radius for *circle types.
     * @group Props
     */
    @Input({ transform: numberAttribute }) radius: number = 0;
    /**
     * Whether to show a mask element behind the speeddial.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) mask: boolean = false;
    /**
     * Whether the component is disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean = false;
    /**
     * Whether the actions close when clicked outside.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) hideOnClickOutside: boolean = true;
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
    @Input({ transform: booleanAttribute }) rotateAnimation: boolean = true;
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
     * Whether to display the tooltip on items. The modifiers of Tooltip can be used like an object in it. Valid keys are 'event' and 'position'.
     * @group Props
     */
    @Input() tooltipOptions: TooltipOptions;
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() buttonProps: ButtonProps;
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
    /**
     * Template of the button.
     * @group Templates
     */
    @ContentChild('button', { descendants: false }) buttonTemplate: TemplateRef<any> | undefined;
    /**
     * Template of the item.
     * @group Templates
     */
    @ContentChild('item', { descendants: false }) itemTemplate: TemplateRef<any> | undefined;

    /**
     * Template of the item.
     * @group Templates
     */
    @ContentChild('icon', { descendants: false }) iconTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _buttonTemplate: TemplateRef<any> | undefined;

    _itemTemplate: TemplateRef<any> | undefined;

    _iconTemplate: TemplateRef<any> | undefined;

    isItemClicked: boolean = false;

    _visible: boolean = false;

    documentClickListener: any;

    focusedOptionIndex = signal<any>(null);

    focused: boolean = false;

    _componentStyle = inject(SpeedDialStyle);

    get focusedOptionId() {
        return this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : null;
    }

    getTooltipOptions(item: MenuItem) {
        return { ...this.tooltipOptions, tooltipLabel: item.label, disabled: !this.tooltipOptions };
    }

    getPTOptions(id: string, key: string) {
        return this.ptm(key, {
            context: {
                active: this.isItemActive(id),
                hidden: !this.visible
            }
        });
    }

    isItemActive(id: string) {
        return id === this.focusedOptionId;
    }

    onInit() {
        this.id = this.id || uuid('pn_id_');
    }

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.type !== 'linear') {
                const button = <any>findSingle(this.container?.nativeElement, '.p-speeddial-button');
                const firstItem = <any>findSingle(this.list?.nativeElement, '.p-speeddial-item');

                if (button && firstItem) {
                    const wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
                    const hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);
                    this.list?.nativeElement.style.setProperty('--item-diff-x', `${wDiff / 2}px`);
                    this.list?.nativeElement.style.setProperty('--item-diff-y', `${hDiff / 2}px`);
                }
            }
        }
    }

    onAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'button':
                    this._buttonTemplate = item.template;
                    break;
                case 'item':
                    this._itemTemplate = item.template;
                    break;
                case 'icon':
                    this._iconTemplate = item.template;
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

    onItemClick(e: Event, item: MenuItem) {
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

        if (leftValidDirections.includes(this.direction || '')) {
            this.navigateNextItem(event);
        } else if (rightValidDirections.includes(this.direction || '')) {
            this.navigatePrevItem(event);
        } else {
            this.navigatePrevItem(event);
        }
    }

    onArrowRight(event) {
        const leftValidDirections = ['left', 'up-right', 'down-left'];
        const rightValidDirections = ['right', 'up-left', 'down-right'];

        if (leftValidDirections.includes(this.direction || '')) {
            this.navigatePrevItem(event);
        } else if (rightValidDirections.includes(this.direction || '')) {
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
        const items = find(this.container?.nativeElement, '[data-pc-section="item"]');
        const itemIndex = [...items].findIndex((item) => item.id === this.focusedOptionIndex());

        if (itemIndex !== -1 && this.model && this.model[itemIndex]) {
            this.onItemClick(event, this.model[itemIndex]);
        }
        this.onBlur(event);

        const buttonEl = <any>findSingle(this.container?.nativeElement, 'button');

        buttonEl && focus(buttonEl);
    }

    onEscapeKey(event: KeyboardEvent) {
        this.hide();

        const buttonEl = <any>findSingle(this.container?.nativeElement, 'button');

        buttonEl && focus(buttonEl);
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
        focus(this.list?.nativeElement);

        this.show();
        this.navigatePrevItem(event);

        event.preventDefault();
    }

    onTogglerArrowDown(event) {
        this.focused = true;
        focus(this.list?.nativeElement);

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
        const items = find(this.container?.nativeElement, '[data-pc-section="item"]');

        const filteredItems = [...items].filter((item) => !hasClass(findSingle(item, 'a')!, 'p-disabled'));
        const newIndex = index === -1 ? filteredItems[filteredItems.length - 1].id : index;
        let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);

        matchedOptionIndex = index === -1 ? filteredItems.length - 1 : matchedOptionIndex - 1;

        return matchedOptionIndex;
    }

    findNextOptionIndex(index) {
        const items = find(this.container?.nativeElement, '[data-pc-section="item"]');
        const filteredItems = [...items].filter((item) => !hasClass(findSingle(item, 'a')!, 'p-disabled'));
        const newIndex = index === -1 ? filteredItems[0].id : index;
        let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);

        matchedOptionIndex = index === -1 ? 0 : matchedOptionIndex + 1;

        return matchedOptionIndex;
    }

    changeFocusedOptionIndex(index) {
        const items = find(this.container?.nativeElement, '[data-pc-section="item"]');
        const filteredItems = [...items].filter((item) => !hasClass(findSingle(item, 'a')!, 'p-disabled'));

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

    get buttonIconClass() {
        if (!this.visible && this.showIcon) {
            return this.showIcon;
        }
        if (this.visible && this.hideIcon) {
            return this.hideIcon;
        }
        return this.showIcon;
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

    onDestroy() {
        this.unbindDocumentClickListener();
    }
}

@NgModule({
    imports: [SpeedDial, SharedModule],
    exports: [SpeedDial, SharedModule]
})
export class SpeedDialModule {}
