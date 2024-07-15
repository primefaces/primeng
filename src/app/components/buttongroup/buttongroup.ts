import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { ButtonGroupStyle } from './style/buttongroupstyle';

@Component({
    selector: 'p-buttonGroup',
    template: `
        <span class="p-buttongroup p-component" role="group">
            <ng-content></ng-content>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ButtonGroupStyle]
})
export class ButtonGroup extends BaseComponent {
    _componentStyle = inject(ButtonGroupStyle);
}

@NgModule({
    imports: [CommonModule],
    exports: [ButtonGroup],
    declarations: [ButtonGroup]
})
export class ButtonGroupModule {}
