import { ChangeDetectionStrategy, Component, inject, InjectionToken, input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { InputIconPassThrough } from 'primeng/types/inputicon';
import { InputIconStyle } from './style/inputiconstyle';

const INPUTICON_INSTANCE = new InjectionToken<InputIcon>('INPUTICON_INSTANCE');

/**
 * InputIcon displays an icon.
 * @group Components
 */
@Component({
    selector: 'p-inputicon',
    standalone: true,
    imports: [SharedModule],
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputIconStyle, { provide: INPUTICON_INSTANCE, useExisting: InputIcon }, { provide: PARENT_INSTANCE, useExisting: InputIcon }],
    hostDirectives: [Bind],
    host: {
        '[class]': "cx('root')"
    }
})
export class InputIcon extends BaseComponent<InputIconPassThrough> {
    componentName = 'InputIcon';

    hostName = input('');

    _componentStyle = inject(InputIconStyle);

    $pcInputIcon: InputIcon | undefined = inject(INPUTICON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@NgModule({
    imports: [InputIcon, SharedModule],
    exports: [InputIcon, SharedModule]
})
export class InputIconModule {}
