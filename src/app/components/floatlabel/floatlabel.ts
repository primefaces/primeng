import { CommonModule } from '@angular/common';
import {
    Component,
    NgModule,
} from '@angular/core';
import { SharedModule } from '../api/shared';
import { RouterModule } from '@angular/router';

/**
 * test.
 * @group Components
 */
@Component({
    selector: 'p-floatLabel',
    template: `
        <div class="p-float-label">
            <input type="text" id="test"/>
            <label for="test"></label>
        </div>
    `,
    host: {
        class: 'p-element'
    }
})
export class FloatLabel {
}

@NgModule({
    imports: [CommonModule,SharedModule,RouterModule],
    exports: [FloatLabel,SharedModule],
    declarations: [FloatLabel]
})
export class FloatLabelModule {}
