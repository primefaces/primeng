import { booleanAttribute, computed, Directive, input, signal } from '@angular/core';
import { isNotEmpty } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';

@Directive({ standalone: true })
export class BaseEditableHolder extends BaseComponent {
    /**
     * There must be a value (if set).
     * @defaultValue false
     * @group Props
     */
    required = input(undefined, { transform: booleanAttribute });
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     * @group Props
     */
    invalid = input(undefined, { transform: booleanAttribute });
    /**
     * When present, it specifies that the component should have disabled state style.
     * @defaultValue false
     * @group Props
     */
    disabled = input(undefined, { transform: booleanAttribute });
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
