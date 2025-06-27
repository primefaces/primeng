import { booleanAttribute, computed, Directive, inject, input } from '@angular/core';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Fluid } from 'primeng/fluid';

@Directive({ standalone: true })
export class BaseInput extends BaseEditableHolder {
    pcFluid: Fluid = inject(Fluid, { optional: true, host: true, skipSelf: true });

    /**
     * Spans 100% width of the container when enabled.
     * @defaultValue false
     * @group Props
     */
    fluid = input(undefined, { transform: booleanAttribute });
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant = input<'filled' | 'outlined' | undefined>();
    /**
     * Specifies the size of the component.
     * @group Props
     */
    size = input<'large' | 'small' | undefined>();
    /**
     * Specifies the visible width of the input element in characters.
     * @group Props
     */
    inputSize = input<number>();
    /**
     * Specifies the value must match the pattern.
     * @group Props
     */
    pattern = input<string>();
    /**
     * The value must be greater than or equal to the value.
     * @group Props
     */
    min = input<number>();
    /**
     * The value must be less than or equal to the value.
     * @group Props
     */
    max = input<number>();
    /**
     * Unless the step is set to the any literal, the value must be min + an integral multiple of the step.
     * @group Props
     */
    step = input<number>();
    /**
     * The number of characters (code points) must not be less than the value of the attribute, if non-empty.
     * @group Props
     */
    minlength = input<number>();
    /**
     * The number of characters (code points) must not exceed the value of the attribute.
     * @group Props
     */
    maxlength = input<number>();

    $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant());

    get hasFluid() {
        return this.fluid() ?? !!this.pcFluid;
    }
}
