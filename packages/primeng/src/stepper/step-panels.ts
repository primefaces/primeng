import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { StepPanelsPassThrough } from 'primeng/types/stepper';
import { StepPanelsStyle } from './style/steppanelsstyle';
import { STEPPANELS_INSTANCE } from './stepper-token';

@Component({
    selector: 'p-step-panels',
    standalone: true,
    imports: [SharedModule, BindModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")'
    },
    providers: [StepPanelsStyle, { provide: STEPPANELS_INSTANCE, useExisting: StepPanels }, { provide: PARENT_INSTANCE, useExisting: StepPanels }],
    hostDirectives: [Bind]
})
export class StepPanels extends BaseComponent<StepPanelsPassThrough> {
    $pcStepPanels: StepPanels | undefined = inject(STEPPANELS_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    componentName = 'StepPanels';

    _componentStyle = inject(StepPanelsStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
