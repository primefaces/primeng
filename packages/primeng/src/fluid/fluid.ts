import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { FluidStyle } from './style/fluidstyle';

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
    providers: [FluidStyle],
    host: {
        '[class.p-fluid]': 'true'
    }
})
export class Fluid extends BaseComponent {
    _componentStyle = inject(FluidStyle);
}

@NgModule({
    imports: [Fluid],
    exports: [Fluid]
})
export class FluidModule {}
