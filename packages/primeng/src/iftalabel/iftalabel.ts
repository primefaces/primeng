import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { IftaLabelStyle } from './style/iftalabelstyle';

/**
 * IftaLabel is used to create infield top aligned labels.
 * @group Components
 */
@Component({
    selector: 'p-iftalabel, p-iftaLabel, p-ifta-label',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [IftaLabelStyle],
    host: {
        class: 'p-iftalabel'
    }
})
export class IftaLabel extends BaseComponent {
    _componentStyle = inject(IftaLabelStyle);
}

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [IftaLabel, SharedModule],
    declarations: [IftaLabel]
})
export class IftaLabelModule {}
