import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { SharedModule } from '../api/shared';
import { RouterModule } from '@angular/router';

/**
 * FloatLabel appears on top of the input field when focused.
 * @group Components
 */
@Component({
    selector: 'p-floatLabel',
    template: `
        <div class="p-float-label">
            <ng-content></ng-content>
        </div>
    `,
    host: {
        class: 'p-element'
    }
})
export class FloatLabel {}

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [FloatLabel, SharedModule],
    declarations: [FloatLabel]
})
export class FloatLabelModule {}
