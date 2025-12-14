import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, inject, InjectionToken, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { FloatLabelPassThrough } from 'primeng/types/floatlabel';
import { FloatLabelStyle } from './style/floatlabelstyle';

const FLOATLABEL_INSTANCE = new InjectionToken<FloatLabel>('FLOATLABEL_INSTANCE');

/**
 * FloatLabel appears on top of the input field when focused.
 * @group Components
 */
@Component({
    selector: 'p-floatlabel, p-floatLabel, p-float-label',
    standalone: true,
    imports: [CommonModule, SharedModule, BindModule],
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FloatLabelStyle, { provide: FLOATLABEL_INSTANCE, useExisting: FloatLabel }, { provide: PARENT_INSTANCE, useExisting: FloatLabel }],
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class FloatLabel extends BaseComponent<FloatLabelPassThrough> implements AfterViewChecked {
    _componentStyle = inject(FloatLabelStyle);

    $pcFloatLabel: FloatLabel | undefined = inject(FLOATLABEL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Defines the positioning of the label relative to the input.
     * @group Props
     */
    @Input() variant: 'in' | 'over' | 'on' = 'over';
}

@NgModule({
    imports: [FloatLabel, SharedModule],
    exports: [FloatLabel, SharedModule]
})
export class FloatLabelModule {}
