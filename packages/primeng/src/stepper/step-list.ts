import { ChangeDetectionStrategy, Component, contentChildren, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { StepListPassThrough } from 'primeng/types/stepper';
import { Step } from './step';
import { StepListStyle } from './style/stepliststyle';
import { STEPLIST_INSTANCE } from './stepper-token';

@Component({
    selector: 'p-step-list',
    standalone: true,
    imports: [BindModule],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")'
    },
    providers: [StepListStyle, { provide: STEPLIST_INSTANCE, useExisting: StepList }, { provide: PARENT_INSTANCE, useExisting: StepList }],
    hostDirectives: [Bind]
})
export class StepList extends BaseComponent<StepListPassThrough> {
    $pcStepList: StepList | undefined = inject(STEPLIST_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    componentName = 'StepList';

    steps = contentChildren(Step);

    _componentStyle = inject(StepListStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
