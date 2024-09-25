import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { BaseComponent } from 'primeng/basecomponent';
import { FloatLabelStyle } from './style/floatlabelstyle';

/**
 * FloatLabel appears on top of the input field when focused.
 * @group Components
 */
@Component({
    selector: 'p-floatlabel, p-floatLabel',
    template: `
        <span [class]="containerClass">
            <ng-content></ng-content>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FloatLabelStyle],
})
export class FloatLabel extends BaseComponent {
    _componentStyle = inject(FloatLabelStyle);
    /**
     * Defines the positioning of the label relative to the input.
     * @group Props
     */
    @Input() variant: 'in' | 'over' | 'on' = 'over';

    get containerClass() {
        return {
            'p-floatlabel': true,
            'p-floatlabel-over': this.variant === 'over',
            'p-floatlabel-on': this.variant === 'on',
            'p-floatlabel-in': this.variant === 'in',
        };
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [FloatLabel, SharedModule],
    declarations: [FloatLabel],
})
export class FloatLabelModule {}
