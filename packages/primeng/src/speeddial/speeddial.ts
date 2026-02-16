import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    inject,
    InjectionToken,
    input,
    model,
    NgModule,
    numberAttribute,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { find, findSingle, focus, hasClass, uuid } from '@primeuix/utils';
import { MenuItem, TooltipOptions } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ButtonModule, ButtonProps } from 'primeng/button';
import { PlusIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import type { CSSProperties } from 'primeng/types/shared';
import { SpeedDialButtonTemplateContext, SpeedDialDirection, SpeedDialItemTemplateContext, SpeedDialPassThrough, SpeedDialType } from 'primeng/types/speeddial';
import { asapScheduler } from 'rxjs';
import { SpeedDialStyle } from './style/speeddialstyle';

const SPEED_DIAL_INSTANCE = new InjectionToken<SpeedDial>('SPEED_DIAL_INSTANCE');

/**
 * When pressed, a floating action button can display multiple primary actions that can be performed on a page.
 * @group Components
 */
@Component({
    selector: 'p-speeddial, p-speed-dial',
    standalone: true,
    imports: [NgTemplateOutlet, ButtonModule, Ripple, TooltipModule, RouterModule, PlusIcon, Bind],
    template: `
        @if (!buttonTemplate()) {
            <button
                type="button"
                pButton
                pRipple
                [style]="buttonStyle()"
                [class]="buttonClass()"
                [disabled]="disabled()"
                [attr.aria-expanded]="visible()"
                [attr.aria-haspopup]="true"
                [attr.aria-controls]="listId()"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                (click)="onButtonClick($event)"
                (keydown)="onTogglerKeydown($event)"
                [buttonProps]="buttonProps()"
                [pt]="ptm('pcButton')"
                [unstyled]="unstyled()"
            >
                @if (buttonIconClass()) {
                    <span pButtonIcon [pt]="ptm('pcButton')['icon']" [class]="buttonIconClass()"></span>
                }
                @if (showDefaultIcon()) {
                    <svg data-p-icon="plus" pButtonIcon [pt]="ptm('pcButton')['icon']" />
                }
                @if (iconTemplate()) {
                    <ng-container *ngTemplateOutlet="iconTemplate()" />
                }
            </button>
        } @else {
            <ng-container *ngTemplateOutlet="buttonTemplate(); context: buttonTemplateContext" />
        }
        <ul
            #list
            [pBind]="ptm('list')"
            [class]="cx('list')"
            role="menu"
            [id]="listId()"
            (focus)="onFocus($event)"
            (focusout)="onBlur($event)"
            (keydown)="onKeyDown($event)"
            [attr.aria-activedescendant]="ariaActivedescendant()"
            [tabindex]="-1"
            [style]="sx('list')"
        >
            @for (item of model_(); track item; let i = $index) {
                <li
                    [pBind]="getPTOptions(getItemId(i), 'item')"
                    [style]="getItemStyle(i)"
                    [class]="cx('item', { item, i })"
                    pTooltip
                    [pTooltipUnstyled]="unstyled()"
                    [tooltipOptions]="getItemTooltipOptions(item)"
                    [id]="getItemId(i)"
                    [attr.aria-controls]="itemAriaControls()"
                    role="menuitem"
                    [attr.data-p-active]="isItemActive(getItemId(i))"
                >
                    @if (itemTemplate()) {
                        <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(item, i)" />
                    } @else {
                        <button
                            type="button"
                            pButton
                            pRipple
                            [class]="cx('pcAction')"
                            severity="secondary"
                            [rounded]="true"
                            size="small"
                            role="menuitem"
                            (click)="onItemClick($event, item)"
                            [disabled]="item?.disabled"
                            (keydown.enter)="onItemClick($event, item)"
                            [attr.aria-label]="item.label"
                            [attr.tabindex]="getItemTabindex(item)"
                            [pt]="getPTOptions(getItemId(i), 'pcAction')"
                            [unstyled]="unstyled()"
                        >
                            @if (item.icon) {
                                <span pButtonIcon [pt]="getPTOptions(getItemId(i), 'actionIcon')" [class]="item.icon"></span>
                            }
                        </button>
                    }
                </li>
            }
        </ul>
        @if (maskVisible()) {
            <div [pBind]="ptm('mask')" [class]="maskClass()" [style]="maskStyle()" animate.enter="p-overlay-mask-enter-active" animate.leave="p-overlay-mask-leave-active"></div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [SpeedDialStyle, { provide: SPEED_DIAL_INSTANCE, useExisting: SpeedDial }, { provide: PARENT_INSTANCE, useExisting: SpeedDial }],
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')"
    },
    hostDirectives: [Bind]
})
export class SpeedDial extends BaseComponent<SpeedDialPassThrough> {
    componentName = 'SpeedDial';

    $pcSpeedDial: SpeedDial | undefined = inject(SPEED_DIAL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * List of items id.
     * @group Props
     */
    id = input<string>();
    /**
     * MenuModel instance to define the action items.
     * @group Props
     */
    model_ = input<MenuItem[] | null>(null, { alias: 'model' });
    /**
     * Specifies the visibility of the overlay.
     * @defaultValue false
     * @group Props
     */
    visible = model(false);
    /**
     * Specifies the opening direction of actions.
     * @gruop Props
     */
    direction = input<SpeedDialDirection>('up');
    /**
     * Transition delay step for each action item.
     * @group Props
     */
    transitionDelay = input(30, { transform: numberAttribute });
    /**
     * Specifies the opening type of actions.
     * @group Props
     */
    type = input<SpeedDialType>('linear');
    /**
     * Radius for *circle types.
     * @group Props
     */
    radius = input(0, { transform: numberAttribute });
    /**
     * Whether to show a mask element behind the speeddial.
     * @group Props
     */
    mask = input(false, { transform: booleanAttribute });
    /**
     * Whether the component is disabled.
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });
    /**
     * Whether the actions close when clicked outside.
     * @group Props
     */
    hideOnClickOutside = input(true, { transform: booleanAttribute });
    /**
     * Inline style of the button element.
     * @group Props
     */
    buttonStyle = input<CSSProperties>();
    /**
     * Style class of the button element.
     * @group Props
     */
    buttonClassName = input<string>();
    /**
     * Inline style of the mask element.
     * @group Props
     */
    maskStyle = input<CSSProperties>();
    /**
     * Style class of the mask element.
     * @group Props
     */
    maskClassName = input<string>();
    /**
     * Show icon of the button element.
     * @group Props
     */
    showIcon = input<string>();
    /**
     * Hide icon of the button element.
     * @group Props
     */
    hideIcon = input<string>();
    /**
     * Defined to rotate showIcon when hideIcon is not present.
     * @group Props
     */
    rotateAnimation = input(true, { transform: booleanAttribute });
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
     * Whether to display the tooltip on items. The modifiers of Tooltip can be used like an object in it. Valid keys are 'event' and 'position'.
     * @group Props
     */
    tooltipOptions = input<TooltipOptions>();
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    buttonProps = input<ButtonProps>();
    /**
     * Fired when the visibility of element changed.
     * @param {boolean} boolean - Visibility value.
     * @group Emits
     */
    onVisibleChange = output<boolean>();
    /**
     * Fired when the button element clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onClick = output<MouseEvent>();
    /**
     * Fired when the actions are visible.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onShow = output();
    /**
     * Fired when the actions are hidden.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onHide = output();

    list = viewChild<ElementRef>('list');
    /**
     * Custom button template.
     * @param {SpeedDialButtonTemplateContext} context - button context.
     * @see {@link SpeedDialButtonTemplateContext}
     * @group Templates
     */
    buttonTemplate = contentChild<TemplateRef<SpeedDialButtonTemplateContext>>('button');
    /**
     * Custom item template.
     * @param {SpeedDialItemTemplateContext} context - item context.
     * @see {@link SpeedDialItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<SpeedDialItemTemplateContext>>('item');
    /**
     * Custom icon template.
     * @group Templates
     */
    iconTemplate = contentChild<TemplateRef<void>>('icon');

    isItemClicked: boolean = false;

    documentClickListener: any;

    focusedOptionIndex = signal<any>(null);

    focused = signal(false);

    _componentStyle = inject(SpeedDialStyle);

    private generatedId = uuid('pn_id_');

    $id = computed(() => this.id() || this.generatedId);

    listId = computed(() => this.$id() + '_list');

    itemAriaControls = computed(() => this.$id() + '_item');

    focusedOptionId = computed(() => (this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : null));

    ariaActivedescendant = computed(() => (this.focused() ? this.focusedOptionId() : undefined));

    buttonIconClass = computed(() => {
        if (!this.visible() && this.showIcon()) return this.showIcon();
        if (this.visible() && this.hideIcon()) return this.hideIcon();
        return this.showIcon();
    });

    showDefaultIcon = computed(() => !this.buttonIconClass() && !this.iconTemplate());

    buttonClass = computed(() => this.cn(this.cx('pcButton'), this.buttonClassName()));

    maskVisible = computed(() => this.mask() && this.visible());

    maskClass = computed(() => this.cn(this.cx('mask'), this.maskClassName()));

    buttonTemplateContext = { toggleCallback: this.onButtonClick.bind(this) };

    onItemClickBound = this.onItemClick.bind(this);

    constructor() {
        super();
        effect(() => {
            const v = this.visible();
            if (v) {
                this.bindDocumentClickListener();
            } else {
                this.unbindDocumentClickListener();
            }
        });
    }

    getItemId(index: number) {
        return this.$id() + '_' + index;
    }

    getItemTemplateContext(item: MenuItem, index: number): SpeedDialItemTemplateContext {
        return { $implicit: item, index, toggleCallback: this.onItemClickBound };
    }

    getItemTooltipOptions(item: MenuItem) {
        return item.tooltipOptions || { ...this.tooltipOptions(), tooltipLabel: item.label, disabled: !this.tooltipOptions() };
    }

    getItemTabindex(item: MenuItem) {
        return item.disabled || !this.visible() ? null : item.tabindex ? item.tabindex : '0';
    }

    getPTOptions(id: string, key: string) {
        return this.ptm(key, {
            context: {
                active: this.isItemActive(id),
                hidden: !this.visible()
            }
        });
    }

    isItemActive(id: string) {
        return id === this.focusedOptionId();
    }

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.type() !== 'linear') {
                const button = findSingle(this.el?.nativeElement, '[data-pc-name="pcbutton"]') as HTMLElement | null;
                const firstItem = findSingle(this.list()?.nativeElement, '[data-pc-section="item"]') as HTMLElement | null;

                if (button && firstItem) {
                    const wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
                    const hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);
                    this.list()?.nativeElement.style.setProperty('--item-diff-x', `${wDiff / 2}px`);
                    this.list()?.nativeElement.style.setProperty('--item-diff-y', `${hDiff / 2}px`);
                }
            }
        }
    }

    show() {
        this.onVisibleChange.emit(true);
        this.visible.set(true);
        this.onShow.emit();
    }

    hide() {
        this.onVisibleChange.emit(false);
        this.visible.set(false);
        this.onHide.emit();
    }

    onButtonClick(event: MouseEvent) {
        this.visible() ? this.hide() : this.show();
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
        this.focused.set(true);
    }

    onBlur(event) {
        this.focused.set(false);
        asapScheduler.schedule(() => this.focusedOptionIndex.set(-1));
    }

    onArrowUp(event) {
        if (this.direction() === 'up') {
            this.navigateNextItem(event);
        } else if (this.direction() === 'down') {
            this.navigatePrevItem(event);
        } else {
            this.navigateNextItem(event);
        }
    }

    onArrowDown(event) {
        if (this.direction() === 'up') {
            this.navigatePrevItem(event);
        } else if (this.direction() === 'down') {
            this.navigateNextItem(event);
        } else {
            this.navigatePrevItem(event);
        }
    }

    onArrowLeft(event) {
        const leftValidDirections = ['left', 'up-right', 'down-left'];
        const rightValidDirections = ['right', 'up-left', 'down-right'];

        if (leftValidDirections.includes(this.direction())) {
            this.navigateNextItem(event);
        } else if (rightValidDirections.includes(this.direction())) {
            this.navigatePrevItem(event);
        } else {
            this.navigatePrevItem(event);
        }
    }

    onArrowRight(event) {
        const leftValidDirections = ['left', 'up-right', 'down-left'];
        const rightValidDirections = ['right', 'up-left', 'down-right'];

        if (leftValidDirections.includes(this.direction())) {
            this.navigatePrevItem(event);
        } else if (rightValidDirections.includes(this.direction())) {
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
        const items = find(this.el?.nativeElement, '[data-pc-section="item"]');
        const itemIndex = [...items].findIndex((item) => item.id === this.focusedOptionIndex());

        if (itemIndex !== -1 && this.model_() && this.model_()![itemIndex]) {
            this.onItemClick(event, this.model_()![itemIndex]);
        }
        this.onBlur(event);

        const buttonEl = findSingle(this.el?.nativeElement, 'button') as HTMLElement | null;

        buttonEl && focus(buttonEl);
    }

    onEscapeKey(event: KeyboardEvent) {
        this.hide();

        const buttonEl = findSingle(this.el?.nativeElement, 'button') as HTMLElement | null;

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
        this.focused.set(true);
        focus(this.list()?.nativeElement);

        this.show();
        this.navigatePrevItem(event);

        event.preventDefault();
    }

    onTogglerArrowDown(event) {
        this.focused.set(true);
        focus(this.list()?.nativeElement);

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
        const items = find(this.el?.nativeElement, '[data-pc-section="item"]');

        const filteredItems = [...items].filter((item) => !hasClass(findSingle(item, 'a')!, 'p-disabled'));
        const newIndex = index === -1 ? filteredItems[filteredItems.length - 1].id : index;
        let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);

        matchedOptionIndex = index === -1 ? filteredItems.length - 1 : matchedOptionIndex - 1;

        return matchedOptionIndex;
    }

    findNextOptionIndex(index) {
        const items = find(this.el?.nativeElement, '[data-pc-section="item"]');
        const filteredItems = [...items].filter((item) => !hasClass(findSingle(item, 'a')!, 'p-disabled'));
        const newIndex = index === -1 ? filteredItems[0].id : index;
        let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);

        matchedOptionIndex = index === -1 ? 0 : matchedOptionIndex + 1;

        return matchedOptionIndex;
    }

    changeFocusedOptionIndex(index) {
        const items = find(this.el?.nativeElement, '[data-pc-section="item"]');
        const filteredItems = [...items].filter((item) => !hasClass(findSingle(item, 'a')!, 'p-disabled'));

        if (filteredItems[index]) {
            this.focusedOptionIndex.set(filteredItems[index].getAttribute('id'));
        }
    }

    calculatePointStyle(index: number) {
        const type = this.type();

        if (type !== 'linear') {
            const length = (this.model_() as MenuItem[]).length;
            const radius = this.radius() || length * 20;

            if (type === 'circle') {
                const step = (2 * Math.PI) / length;

                return {
                    left: `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`,
                    top: `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`
                };
            } else if (type === 'semi-circle') {
                const direction = this.direction();
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
                const direction = this.direction();
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
        const length = (this.model_() as MenuItem[]).length;

        return (this.visible() ? index : length - index - 1) * this.transitionDelay();
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
        return item.routerLink && !this.disabled() && !item.disabled;
    }

    isOutsideClicked(event: Event) {
        return this.el && !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target) || this.isItemClicked);
    }

    bindDocumentClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentClickListener && this.hideOnClickOutside()) {
                this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    if (this.visible() && this.isOutsideClicked(event)) {
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
    imports: [SpeedDial],
    exports: [SpeedDial]
})
export class SpeedDialModule {}
