import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, InjectionToken, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { InputIconPassThrough } from 'primeng/types/inputicon';
import { InputIconStyle } from './style/inputiconstyle';

const INPUTICON_INSTANCE = new InjectionToken<InputIcon>('INPUTICON_INSTANCE');

/**
 * InputIcon displays an icon.
 * @group Components
 */
@Component({
    selector: 'p-inputicon, p-inputIcon',
    standalone: true,
    imports: [CommonModule, SharedModule, BindModule],
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InputIconStyle, { provide: INPUTICON_INSTANCE, useExisting: InputIcon }, { provide: PARENT_INSTANCE, useExisting: InputIcon }],
    hostDirectives: [Bind],
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    }
})
export class InputIcon extends BaseComponent<InputIconPassThrough> {
    @Input() hostName: any = '';
    /**
     * Style class of the element.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    _componentStyle = inject(InputIconStyle);

    $pcInputIcon: InputIcon | undefined = inject(INPUTICON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@NgModule({
    imports: [InputIcon, SharedModule],
    exports: [InputIcon, SharedModule]
})
export class InputIconModule {}
