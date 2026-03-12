import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { InputColorSwatchStyle } from './style/inputcolorswatchstyle';

@Component({
    selector: 'p-inputcolor-swatch',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")'
    },
    providers: [InputColorSwatchStyle, { provide: PARENT_INSTANCE, useExisting: InputColorSwatch }],
    hostDirectives: [Bind]
})
export class InputColorSwatch extends BaseComponent {
    componentName = 'InputColorSwatch';

    _componentStyle = inject(InputColorSwatchStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
