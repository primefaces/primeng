import { booleanAttribute, Directive, inject, input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { NgControl, NgModel } from '@angular/forms';

@Directive({ standalone: true })
export class BaseInput extends BaseComponent {
    ngModel = inject(NgModel, { optional: true });

    ngControl = inject(NgControl, { optional: true, self: true });

    invalid = input(undefined);
    /**
     * Spans 100% width of the container when enabled.
     * @group Props
     */
    fluid = input(false, { transform: booleanAttribute });
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant = input<'filled' | 'outlined' | undefined>();

    get isInvalid() {
        if (this.invalid() != undefined) return this.invalid();
        const controlInvalid = !!this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched);
        const modelInvalid = !!this.ngModel?.invalid && (this.ngModel?.dirty || this.ngModel?.touched);
        return controlInvalid || modelInvalid;
    }
}
