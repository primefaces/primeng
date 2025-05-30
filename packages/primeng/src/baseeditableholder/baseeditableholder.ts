import { Directive, inject, input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { NgControl, NgModel } from '@angular/forms';

@Directive({ standalone: true })
export class BaseEditableHolder extends BaseComponent {
    ngModel = inject(NgModel, { optional: true });

    ngControl = inject(NgControl, { optional: true, self: true });
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
}
