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
}
