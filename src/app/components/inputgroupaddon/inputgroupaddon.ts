import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { SharedModule } from '@alamote/primeng/api';
/**
 * InputGroupAddon displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
@Component({
    selector: 'p-inputGroupAddon',
    template: `
        <div [attr.data-pc-name]="'inputgroupaddon'" [ngClass]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
        </div>
    `,
    host: {
        class: 'p-element p-inputgroup-addon'
    }
})
export class InputGroupAddon {
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
}

@NgModule({
    imports: [CommonModule],
    exports: [InputGroupAddon, SharedModule],
    declarations: [InputGroupAddon]
})
export class InputGroupAddonModule {}
