import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleUpIcon } from 'primeng/icons/angleup';
import { TimesIcon } from 'primeng/icons/times';
import { InputTextModule } from 'primeng/inputtext';

/**
 * IconField wraps an input and an icon.
 * @group Components
 */
@Component({
    selector: 'p-inputIcon',
    template: `<ng-content></ng-content> `,

    host: {
        class: 'p-element'
    }
})
export class InputIcon {}

@NgModule({
    imports: [CommonModule, InputTextModule, ButtonModule, TimesIcon, AngleUpIcon, AngleDownIcon],
    exports: [InputIcon, SharedModule],
    declarations: [InputIcon]
})
export class InputIconModule {}
