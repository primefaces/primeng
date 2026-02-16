import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, InjectionToken, input, NgModule, numberAttribute, output, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { uuid } from '@primeuix/utils';
import { MenuItem, TooltipOptions } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ButtonDirective } from 'primeng/button';
import { ChevronDownIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import type { AppendTo, CSSProperties } from 'primeng/types/shared';
import { TieredMenu } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonSeverity, ButtonSize } from 'primeng/types/button';
import { ButtonProps, MenuButtonProps, SplitButtonIconPosition, SplitButtonPassThrough } from 'primeng/types/splitbutton';
import { SplitButtonStyle } from './style/splitbuttonstyle';

const SPLITBUTTON_INSTANCE = new InjectionToken<SplitButton>('SPLITBUTTON_INSTANCE');

/**
 * SplitButton groups a set of commands in an overlay with a default command.
 * @group Components
 */
@Component({
    selector: 'p-splitbutton, p-split-button',
    standalone: true,
    imports: [NgTemplateOutlet, ButtonDirective, TieredMenu, AutoFocus, ChevronDownIcon, Ripple, TooltipModule],
    template: `
        @if (contentTemplate()) {
            <button
                [class]="cx('pcButton')"
                type="button"
                pButton
                pRipple
                [severity]="severity()"
                [text]="text()"
                [outlined]="outlined()"
                [size]="size()"
                [icon]="icon()"
                [iconPos]="iconPos()"
                (click)="onDefaultButtonClick($event)"
                [disabled]="disabled()"
                [attr.tabindex]="tabindex()"
                [attr.aria-label]="buttonAriaLabelWithLabel()"
                [pAutoFocus]="autofocus()"
                [pTooltip]="tooltip()"
                [pTooltipUnstyled]="unstyled()"
                [tooltipOptions]="tooltipOptions()"
                [pt]="ptm('pcButton')"
                [unstyled]="unstyled()"
            >
                <ng-container *ngTemplateOutlet="contentTemplate()" />
            </button>
        } @else {
            <button
                #defaultbtn
                [class]="cx('pcButton')"
                type="button"
                pButton
                pRipple
                [severity]="severity()"
                [text]="text()"
                [outlined]="outlined()"
                [size]="size()"
                [icon]="icon()"
                [iconPos]="iconPos()"
                [label]="label()"
                (click)="onDefaultButtonClick($event)"
                [disabled]="$buttonDisabled()"
                [attr.tabindex]="tabindex()"
                [attr.aria-label]="buttonAriaLabel()"
                [pAutoFocus]="autofocus()"
                [pTooltip]="tooltip()"
                [pTooltipUnstyled]="unstyled()"
                [tooltipOptions]="tooltipOptions()"
                [pt]="ptm('pcButton')"
                [unstyled]="unstyled()"
            ></button>
        }
        <button
            type="button"
            pButton
            pRipple
            [size]="size()"
            [severity]="severity()"
            [text]="text()"
            [outlined]="outlined()"
            [class]="cx('pcDropdown')"
            (click)="onDropdownButtonClick($event)"
            (keydown)="onDropdownButtonKeydown($event)"
            [disabled]="$menuButtonDisabled()"
            [attr.aria-label]="menuButtonAriaLabel()"
            [attr.aria-haspopup]="menuButtonAriaHasPopup()"
            [attr.aria-expanded]="menuButtonAriaExpanded()"
            [attr.aria-controls]="menuButtonAriaControls()"
            [pt]="ptm('pcDropdown')"
            [unstyled]="unstyled()"
        >
            @if (dropdownIcon()) {
                <span [class]="dropdownIcon()"></span>
            } @else {
                @if (!dropdownIconTemplate()) {
                    <svg data-p-icon="chevron-down" />
                }
                @if (dropdownIconTemplate()) {
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate()" />
                }
            }
        </button>
        <p-tieredmenu
            [id]="ariaId"
            #menu
            [popup]="true"
            [model]="model_()"
            [style]="menuStyle()"
            [styleClass]="menuStyleClass()"
            [appendTo]="$appendTo()"
            [motionOptions]="computedMotionOptions()"
            (onHide)="onHide()"
            (onShow)="onShow()"
            [pt]="ptm('pcMenu')"
            [unstyled]="unstyled()"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SplitButtonStyle, { provide: SPLITBUTTON_INSTANCE, useExisting: SplitButton }, { provide: PARENT_INSTANCE, useExisting: SplitButton }],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.data-p-severity]': 'severity()'
    },
    hostDirectives: [Bind]
})
export class SplitButton extends BaseComponent<SplitButtonPassThrough> {
    componentName = 'SplitButton';

    $pcSplitButton: SplitButton | undefined = inject(SPLITBUTTON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * MenuModel instance to define the overlay items.
     * @group Props
     */
    model_ = input<MenuItem[] | undefined>(undefined, { alias: 'model' });
    /**
     * Defines the style of the button.
     * @group Props
     */
    severity = input<ButtonSeverity>();
    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    raised = input(false, { transform: booleanAttribute });
    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    rounded = input(false, { transform: booleanAttribute });
    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    text = input(false, { transform: booleanAttribute });
    /**
     * Add a border class without a background initially.
     * @group Props
     */
    outlined = input(false, { transform: booleanAttribute });
    /**
     * Defines the size of the button.
     * @group Props
     */
    size = input<ButtonSize>();
    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    plain = input(false, { transform: booleanAttribute });
    /**
     * Name of the icon.
     * @group Props
     */
    icon = input<string>();
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = input<SplitButtonIconPosition>('left');
    /**
     * Text of the button.
     * @group Props
     */
    label = input<string>();
    /**
     * Tooltip for the main button.
     * @group Props
     */
    tooltip = input<string>();
    /**
     * Tooltip options for the main button.
     * @group Props
     */
    tooltipOptions = input<TooltipOptions>();
    /**
     * Inline style of the overlay menu.
     * @group Props
     */
    menuStyle = input<CSSProperties>();
    /**
     * Style class of the overlay menu.
     * @group Props
     */
    menuStyleClass = input<string>();
    /**
     * Name of the dropdown icon.
     * @group Props
     */
    dropdownIcon = input<string>();
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'body'
     * @group Props
     */
    appendTo = input<AppendTo>('body');
    /**
     * Indicates the direction of the element.
     * @group Props
     */
    dir = input<string>();
    /**
     * Defines a string that labels the expand button for accessibility.
     * @group Props
     */
    expandAriaLabel = input<string>();
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
     * Button Props
     */
    buttonProps = input<ButtonProps>();
    /**
     * Menu Button Props
     */
    menuButtonProps = input<MenuButtonProps>();
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(undefined, { transform: numberAttribute });
    /**
     * When present, it specifies that the menu button element should be disabled.
     * @group Props
     */
    menuButtonDisabled = input(false, { transform: booleanAttribute });
    /**
     * When present, it specifies that the button element should be disabled.
     * @group Props
     */
    buttonDisabled = input(false, { transform: booleanAttribute });
    /**
     * Callback to invoke when default command button is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onClick = output<MouseEvent>();
    /**
     * Callback to invoke when overlay menu is hidden.
     * @group Emits
     */
    onMenuHide = output();
    /**
     * Callback to invoke when overlay menu is shown.
     * @group Emits
     */
    onMenuShow = output();
    /**
     * Callback to invoke when dropdown button is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onDropdownClick = output<MouseEvent>();

    buttonViewChild = viewChild<ElementRef>('defaultbtn');

    menu = viewChild<TieredMenu>('menu');
    /**
     * Custom content template.
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<void>>('content');
    /**
     * Custom dropdown icon template.
     * @group Templates
     **/
    dropdownIconTemplate = contentChild<TemplateRef<void>>('dropdownicon');

    ariaId = uuid('pn_id_');

    isExpanded = signal<boolean>(false);

    _componentStyle = inject(SplitButtonStyle);

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    $buttonDisabled = computed(() => this.disabled() || this.buttonDisabled());

    $menuButtonDisabled = computed(() => this.disabled() || this.menuButtonDisabled());

    buttonAriaLabel = computed(() => this.buttonProps()?.['ariaLabel']);

    buttonAriaLabelWithLabel = computed(() => this.buttonProps()?.['ariaLabel'] || this.label());

    menuButtonAriaLabel = computed(() => this.menuButtonProps()?.['ariaLabel'] || this.expandAriaLabel());

    menuButtonAriaHasPopup = computed(() => this.menuButtonProps()?.['ariaHasPopup'] || true);

    menuButtonAriaExpanded = computed(() => this.menuButtonProps()?.['ariaExpanded'] || this.isExpanded());

    menuButtonAriaControls = computed(() => this.menuButtonProps()?.['ariaControls'] || this.ariaId);

    onDefaultButtonClick(event: MouseEvent) {
        this.onClick.emit(event);
        this.menu()?.hide();
    }

    onDropdownButtonClick(event?: MouseEvent) {
        this.onDropdownClick.emit(event as MouseEvent);
        this.menu()?.toggle({ currentTarget: this.el?.nativeElement, relativeAlign: this.$appendTo() == 'self' });
    }

    onDropdownButtonKeydown(event: KeyboardEvent) {
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            this.onDropdownButtonClick();
            event.preventDefault();
        }
    }

    onHide() {
        this.isExpanded.set(false);
        this.onMenuHide.emit();
    }

    onShow() {
        this.isExpanded.set(true);
        this.onMenuShow.emit();
    }
}

@NgModule({
    imports: [SplitButton],
    exports: [SplitButton]
})
export class SplitButtonModule {}
