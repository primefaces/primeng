import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';
import type { InputColorTransparencyGridPassThrough } from 'primeng/types/inputcolor';

/**
 * InputColorTransparencyGrid is a helper component for InputColor component.
 * @group Components
 */
@Component({
    selector: 'p-inputcolor-transparency-grid',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': '$pc.cx("transparencyGrid")'
    },
    providers: [{ provide: PARENT_INSTANCE, useExisting: InputColorTransparencyGrid }],
    hostDirectives: [Bind]
})
export class InputColorTransparencyGrid extends BaseComponent<InputColorTransparencyGridPassThrough> {
    componentName = 'InputColorTransparencyGrid';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
