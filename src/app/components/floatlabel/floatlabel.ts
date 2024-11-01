import { ChangeDetectionStrategy, Component, inject, input, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { FloatLabelStyle } from './style/floatlabelstyle';

/**
 * FloatLabel appears on top of the input field when focused.
 * @group Components
 */
@Component({
    selector: 'p-floatlabel, p-floatLabel',
    standalone: true,
    imports: [SharedModule],
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FloatLabelStyle],
    host: {
        '[class.p-floatlabel]': 'true',
        '[class.p-floatlabel-over]': "variant() === 'over'",
        '[class.p-floatlabel-on]': "variant() === 'on'",
        '[class.p-floatlabel-in]': "variant() === 'in'",
    },
})
export class FloatLabel extends BaseComponent {
    _componentStyle = inject(FloatLabelStyle);
    /**
     * Defines the positioning of the label relative to the input.
     * @group Props
     */
    variant = input<'in' | 'over' | 'on'>('over');
}

@NgModule({
    imports: [FloatLabel, SharedModule],
    exports: [FloatLabel, SharedModule],
})
export class FloatLabelModule {}
