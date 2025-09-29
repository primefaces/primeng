import { ContentChild, Directive, EventEmitter, Input, Output, TemplateRef, booleanAttribute, inject, input, numberAttribute } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Fluid } from 'primeng/fluid';
import { ButtonProps, ButtonSeverity } from './button.interface';
import { ButtonStyle } from './public_api';

export type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';

@Directive({
    standalone: true
})
export class BaseButton extends BaseComponent {
    /**
     * Type of the button.
     * @group Props
     */
    @Input() type: string = 'button';

    /**
     * Value of the badge.
     * @group Props
     */
    @Input() badge: string | undefined;

    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;

    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) raised: boolean = false;

    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) rounded: boolean = false;

    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) text: boolean = false;

    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) plain: boolean = false;

    /**
     * Add a border class without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) outlined: boolean = false;

    /**
     * Add a link style to the button.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) link: boolean = false;

    /**
     * Add a tabindex to the button.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined;

    /**
     * Defines the size of the button.
     * @group Props
     */
    @Input() size: 'small' | 'large' | undefined;

    /**
     * Specifies the variant of the component.
     * @group Props
     */
    @Input() variant: 'outlined' | 'text' | undefined;

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
     * Style class of the badge.
     * @group Props
     * @deprecated use badgeSeverity instead.
     */
    @Input() badgeClass: string | undefined;

    /**
     * Severity type of the badge.
     * @group Props
     * @defaultValue secondary
     */
    @Input() badgeSeverity: 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined = 'secondary';

    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;

    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;

    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPos: ButtonIconPosition = 'left';

    /**
     * Name of the icon.
     * @group Props
     */
    @Input() icon: string | undefined;

    /**
     * Text of the button.
     * @group Props
     */
    @Input() label: string | undefined;

    /**
     * Whether the button is in loading state.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) loading: boolean = false;

    /**
     * Icon to display in loading state.
     * @group Props
     */
    @Input() loadingIcon: string | undefined;

    /**
     * Defines the style of the button.
     * @group Props
     */
    @Input() severity: ButtonSeverity;

    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() buttonProps: ButtonProps;

    /**
     * Spans 100% width of the container when enabled.
     * @defaultValue undefined
     * @group Props
     */
    fluid = input(undefined, { transform: booleanAttribute });

    /**
     * Template of the content.
     * @group Templates
     **/
    @ContentChild('content') contentTemplate: TemplateRef<any> | undefined;

    /**
     * Template of the loading.
     * @group Templates
     **/
    @ContentChild('loadingicon') loadingIconTemplate: TemplateRef<any> | undefined;

    /**
     * Template of the icon.
     * @group Templates
     **/
    @ContentChild('icon') iconTemplate: TemplateRef<any> | undefined;

    /**
     * Callback to execute when button is clicked.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (click).
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Callback to execute when button is focused.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (focus).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    /**
     * Callback to execute when button loses focus.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (blur).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    pcFluid: Fluid | null = inject(Fluid, { optional: true, host: true, skipSelf: true });

    get hasFluid() {
        return this.fluid() ?? !!this.pcFluid;
    }

    _componentStyle = inject(ButtonStyle);

    initParams() {
        return {
            props: {
                type: this.type,
                badge: this.badge,
                disabled: this.disabled,
                raised: this.raised,
                rounded: this.rounded,
                text: this.text,
                plain: this.plain,
                outlined: this.outlined,
                link: this.link,
                tabindex: this.tabindex,
                size: this.size,
                variant: this.variant,
                style: this.style,
                styleClass: this.styleClass,
                badgeClass: this.badgeClass,
                badgeSeverity: this.badgeSeverity,
                ariaLabel: this.ariaLabel,
                autofocus: this.autofocus,
                iconPos: this.iconPos,
                icon: this.icon,
                label: this.label,
                loading: this.loading,
                loadingIcon: this.loadingIcon,
                severity: this.severity,
                buttonProps: this.buttonProps
            },
            state: {}
        };
    }
}
