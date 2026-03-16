import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { getChannelGradient } from './color-manager';
import { INPUT_COLOR_INSTANCE, INPUT_COLOR_SLIDER_INSTANCE } from './inputcolor.token';

@Component({
    selector: 'p-inputcolor-slider-track',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': '$pc.cx("sliderTrack")',
        '[style.--slider-background]': '$gradient()'
    },
    providers: [{ provide: PARENT_INSTANCE, useExisting: InputColorSliderTrack }],
    hostDirectives: [Bind]
})
export class InputColorSliderTrack extends BaseComponent {
    componentName = 'InputColorSliderTrack';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    private pcSlider = inject(INPUT_COLOR_SLIDER_INSTANCE);

    $gradient = computed(() => {
        const ch = this.pcSlider.channel();
        const color = this.$pc.$color();
        const orientation = this.pcSlider.orientation();
        return getChannelGradient(color, ch, orientation);
    });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
