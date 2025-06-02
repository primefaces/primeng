import { computed, Directive, input, signal } from '@angular/core';
import { isNotEmpty } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';

@Directive({ standalone: true })
export class BaseEditableHolder extends BaseComponent {
    /**
     * There must be a value (if set).
     * @group Props
     */
    required = input<boolean | undefined>();
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue undefined
     * @group Props
     */
    invalid = input<boolean | undefined>();
    /**
     * When present, it specifies that the component should have disabled state style.
     * @defaultValue undefined
     * @group Props
     */
    disabled = input<boolean | undefined>();
    /**
     * When present, it specifies that the name of the input.
     * @defaultValue undefined
     * @group Props
     */
    name = input<string | undefined>();

    modelValue = signal<string | string[] | any | undefined>(undefined);

    $filled = computed(() => isNotEmpty(this.modelValue()));

    writeModelValue(value: any, event?: any) {
        this.modelValue.set(value);
    }
}
