import { Component, inject, InjectionToken, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { InputGroupPassThrough } from 'primeng/types/inputgroup';
import { InputGroupStyle } from './style/inputgroupstyle';

const INPUTGROUP_INSTANCE = new InjectionToken<InputGroup>('INPUTGROUP_INSTANCE');

/**
 * InputGroup displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
@Component({
    selector: 'p-inputgroup, p-input-group',
    standalone: true,
    imports: [BindModule],
    template: ` <ng-content></ng-content> `,
    providers: [InputGroupStyle, { provide: INPUTGROUP_INSTANCE, useExisting: InputGroup }, { provide: PARENT_INSTANCE, useExisting: InputGroup }],
    hostDirectives: [Bind],
    host: {
        '[class]': "cx('root')"
    }
})
export class InputGroup extends BaseComponent<InputGroupPassThrough> {
    componentName = 'InputGroup';

    _componentStyle = inject(InputGroupStyle);

    $pcInputGroup: InputGroup | undefined = inject(INPUTGROUP_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@NgModule({
    imports: [InputGroup, SharedModule],
    exports: [InputGroup, SharedModule]
})
export class InputGroupModule {}
