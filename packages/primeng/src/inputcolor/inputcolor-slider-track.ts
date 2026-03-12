import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ColorChannel, getChannelGradient } from './color-manager';
import { INPUT_COLOR_INSTANCE, INPUT_COLOR_SLIDER_INSTANCE } from './inputcolor.token';
import { InputColorSliderTrackStyle } from './style/inputcolorslidertrackstyle';

@Component({
    selector: 'p-inputcolor-slider-track',
    standalone: true,
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")',
        '[style.--slider-background]': '$gradient()'
    },
    providers: [InputColorSliderTrackStyle, { provide: PARENT_INSTANCE, useExisting: InputColorSliderTrack }],
    hostDirectives: [Bind]
})
export class InputColorSliderTrack extends BaseComponent {
    componentName = 'InputColorSliderTrack';

    _componentStyle = inject(InputColorSliderTrackStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    private pcSlider = inject(INPUT_COLOR_SLIDER_INSTANCE);

    $gradient = computed(() => {
        const ch = this.pcSlider.channel();
        const color = this.$pc.$color();
        return getChannelGradient(color, ch);
    });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
