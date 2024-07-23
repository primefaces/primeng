import { CommonModule } from '@angular/common';
import { Component, inject, Input, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { InputGroupAddonStyle } from './style/inputgroupaddonstyle';
/**
 * InputGroupAddon displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
@Component({
    selector: 'p-inputGroupAddon',
    template: `
        <div [attr.data-pc-name]="'inputgroupaddon'" class="p-inputgroupaddon" [ngClass]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
        </div>
    `,
    providers: [InputGroupAddonStyle]
})
export class InputGroupAddon extends BaseComponent {
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

    _componentStyle = inject(InputGroupAddonStyle);
}

@NgModule({
    imports: [CommonModule],
    exports: [InputGroupAddon, SharedModule],
    declarations: [InputGroupAddon]
})
export class InputGroupAddonModule {}
