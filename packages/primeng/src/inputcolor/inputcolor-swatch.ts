import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';

/**
 * InputColorSwatch is a helper component for InputColor component.
 * @group Components
 */
@Component({
    selector: 'p-inputcolor-swatch',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': '$pc.cx("swatch")'
    },
    providers: [{ provide: PARENT_INSTANCE, useExisting: InputColorSwatch }],
    hostDirectives: [Bind]
})
export class InputColorSwatch extends BaseComponent {
    componentName = 'InputColorSwatch';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
