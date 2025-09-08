import { CommonModule } from '@angular/common';
import { Component, inject, Input, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { InputGroupStyle } from './style/inputgroupstyle';

/**
 * InputGroup displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
@Component({
    selector: 'p-inputgroup, p-inputGroup, p-input-group',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: ` <ng-content></ng-content> `,
    providers: [InputGroupStyle],
    host: {
        '[attr.data-pc-name]': '"inputgroup"',
        '[class]': "cn(cx('root'), styleClass)"
    }
})
export class InputGroup extends BaseComponent {
    /**
     * Class of the element.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    _componentStyle = inject(InputGroupStyle);
}

@NgModule({
    imports: [InputGroup, SharedModule],
    exports: [InputGroup, SharedModule]
})
export class InputGroupModule {}
