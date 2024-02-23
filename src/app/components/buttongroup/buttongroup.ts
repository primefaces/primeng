import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'p-buttonGroup',
    template: `
        <span class="p-button-group p-component" role="group">
            <ng-content></ng-content>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class ButtonGroup {}

@NgModule({
    imports: [CommonModule],
    exports: [ButtonGroup],
    declarations: [ButtonGroup]
})
export class ButtonGroupModule {}
