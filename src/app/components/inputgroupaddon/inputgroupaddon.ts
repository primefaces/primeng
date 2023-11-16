import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
/**
 * InputGroupAddon displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
@Component({
    selector: 'p-inputGroupAddon',
    template: `
        <div [attr.data-pc-name]="'inputgroupaddon'">
            <ng-content></ng-content>
        </div>
    `,
    host: {
        class: 'p-element p-inputgroup-addon'
    }
})
export class InputGroupAddon {}

@NgModule({
    imports: [CommonModule],
    exports: [InputGroupAddon, SharedModule],
    declarations: [InputGroupAddon]
})
export class InputGroupAddonModule {}
