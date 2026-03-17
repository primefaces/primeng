import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';
import type { InputColorSwatchBackgroundPassThrough } from 'primeng/types/inputcolor';

/**
 * InputColorSwatchBackground is a helper component for InputColor component.
 * @group Components
 */
@Component({
    selector: 'p-inputcolor-swatch-background',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': '$pc.cx("swatchBackground")',
        '[style.--swatch-background]': '$swatchColor()'
    },
    providers: [{ provide: PARENT_INSTANCE, useExisting: InputColorSwatchBackground }],
    hostDirectives: [Bind]
})
export class InputColorSwatchBackground extends BaseComponent<InputColorSwatchBackgroundPassThrough> {
    componentName = 'InputColorSwatchBackground';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    $swatchColor = computed(() => this.$pc.$color().toRgbString());

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
