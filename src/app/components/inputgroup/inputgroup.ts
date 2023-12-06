import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
/**
 * InputGroup displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
@Component({
    selector: 'p-inputGroup',
    template: `
        <div class="p-inputgroup" [attr.data-pc-name]="'inputgroup'">
            <ng-content></ng-content>
        </div>
    `,
    host: {
        class: 'p-element p-inputgroup'
    }
})
export class InputGroup {}

@NgModule({
    imports: [CommonModule],
    exports: [InputGroup, SharedModule],
    declarations: [InputGroup]
})
export class InputGroupModule {}
