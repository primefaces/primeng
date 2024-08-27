import { CommonModule } from '@angular/common';
import { Component, inject, Input, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { InputGroupStyle } from './style/inputgroupstyle';
import { BaseComponent } from 'primeng/basecomponent';
/**
 * InputGroup displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
@Component({
    selector: 'p-inputGroup',
    template: `
            <ng-content></ng-content>
    `,
    providers: [InputGroupStyle],

    host: {
        class: 'p-inputgroup',
        '[attr.attr.data-pc-name]': 'inputgroup',
        '[class]': 'styleClass',
        '[style]': 'style'
    },
})
export class InputGroup extends BaseComponent {
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

    _componentStyle = inject(InputGroupStyle);
}

@NgModule({
    imports: [CommonModule],
    exports: [InputGroup, SharedModule],
    declarations: [InputGroup]
})
export class InputGroupModule {}
