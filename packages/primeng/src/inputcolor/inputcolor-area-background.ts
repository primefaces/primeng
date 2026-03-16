import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { InputColorAreaBackgroundStyle } from './style/inputcolorareabackgroundstyle';

@Component({
    selector: 'p-inputcolor-area-background',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")'
    },
    providers: [InputColorAreaBackgroundStyle, { provide: PARENT_INSTANCE, useExisting: InputColorAreaBackground }],
    hostDirectives: [Bind]
})
export class InputColorAreaBackground extends BaseComponent {
    componentName = 'InputColorAreaBackground';

    _componentStyle = inject(InputColorAreaBackgroundStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
