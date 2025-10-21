import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, InjectionToken, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { FluidPassThrough } from 'primeng/types/fluid';
import { FluidStyle } from './style/fluidstyle';

const FLUID_INSTANCE = new InjectionToken<Fluid>('FLUID_INSTANCE');

/**
 * Fluid is a layout component to make descendant components span full width of their container.
 * @group Components
 */
@Component({
    selector: 'p-fluid',
    template: ` <ng-content></ng-content> `,
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FluidStyle, { provide: FLUID_INSTANCE, useExisting: Fluid }, { provide: PARENT_INSTANCE, useExisting: Fluid }],
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class Fluid extends BaseComponent<FluidPassThrough> {
    $pcFluid: Fluid | undefined = inject(FLUID_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    _componentStyle = inject(FluidStyle);
}

@NgModule({
    imports: [Fluid],
    exports: [Fluid]
})
export class FluidModule {}
