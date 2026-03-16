import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';
import { InputColorSwatchBackgroundStyle } from './style/inputcolorswatchbackgroundstyle';

@Component({
    selector: 'p-inputcolor-swatch-background',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")',
        '[style.--swatch-background]': '$swatchColor()'
    },
    providers: [InputColorSwatchBackgroundStyle, { provide: PARENT_INSTANCE, useExisting: InputColorSwatchBackground }],
    hostDirectives: [Bind]
})
export class InputColorSwatchBackground extends BaseComponent {
    componentName = 'InputColorSwatchBackground';

    _componentStyle = inject(InputColorSwatchBackgroundStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    $swatchColor = computed(() => this.$pc.$color().toRgbString());

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
