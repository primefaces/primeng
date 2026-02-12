import { ChangeDetectionStrategy, Component, inject, InjectionToken, input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { FloatLabelPassThrough, FloatLabelVariant } from 'primeng/types/floatlabel';
import { FloatLabelStyle } from './style/floatlabelstyle';

const FLOATLABEL_INSTANCE = new InjectionToken<FloatLabel>('FLOATLABEL_INSTANCE');

/**
 * FloatLabel appears on top of the input field when focused.
 * @group Components
 */
@Component({
    selector: 'p-floatlabel, p-float-label',
    standalone: true,
    imports: [SharedModule, BindModule],
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FloatLabelStyle, { provide: FLOATLABEL_INSTANCE, useExisting: FloatLabel }, { provide: PARENT_INSTANCE, useExisting: FloatLabel }],
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class FloatLabel extends BaseComponent<FloatLabelPassThrough> {
    componentName = 'FloatLabel';

    _componentStyle = inject(FloatLabelStyle);

    $pcFloatLabel: FloatLabel | undefined = inject(FLOATLABEL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Defines the positioning of the label relative to the input.
     * @group Props
     */
    variant = input<FloatLabelVariant>('over');
}

@NgModule({
    imports: [FloatLabel, SharedModule],
    exports: [FloatLabel, SharedModule]
})
export class FloatLabelModule {}
