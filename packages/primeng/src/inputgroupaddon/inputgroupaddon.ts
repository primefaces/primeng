import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, Input, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { InputGroupAddonStyle } from './style/inputgroupaddonstyle';

/**
 * InputGroupAddon displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
@Component({
    selector: 'p-inputgroup-addon, p-inputGroupAddon',
    template: ` <ng-content></ng-content> `,
    standalone: true,
    imports: [CommonModule],
    host: {
        '[class]': 'styleClass',
        '[class.p-inputgroupaddon]': 'true',
        '[attr.data-pc-name]': '"inputgroupaddon"'
    },
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

    @HostBinding('style') get hostStyle(): { [klass: string]: any } | null | undefined {
        return this.style;
    }
}

@NgModule({
    imports: [InputGroupAddon, SharedModule],
    exports: [InputGroupAddon, SharedModule]
})
export class InputGroupAddonModule {}
