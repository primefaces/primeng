import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { InputColorTransparencyGridStyle } from './style/inputcolortransparencygridstyle';

@Component({
    selector: 'p-inputcolor-transparency-grid',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")'
    },
    providers: [InputColorTransparencyGridStyle, { provide: PARENT_INSTANCE, useExisting: InputColorTransparencyGrid }],
    hostDirectives: [Bind]
})
export class InputColorTransparencyGrid extends BaseComponent {
    componentName = 'InputColorTransparencyGrid';

    _componentStyle = inject(InputColorTransparencyGridStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
