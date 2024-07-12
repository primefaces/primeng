import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { BaseComponent } from 'primeng/basecomponent';
import { FloatLabelStyle } from './style/floatlabelstyle';

/**
 * FloatLabel appears on top of the input field when focused.
 * @group Components
 */
@Component({
    selector: 'p-floatLabel',
    template: `
        <span class="p-floatlabel">
            <ng-content></ng-content>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FloatLabelStyle]
})
export class FloatLabel extends BaseComponent {
    _componentStyle = inject(FloatLabelStyle);
}

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [FloatLabel, SharedModule],
    declarations: [FloatLabel]
})
export class FloatLabelModule {}
