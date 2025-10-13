import { Component, HostBinding, inject, InjectionToken, Input, NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { InputGroupAddonPassThrough } from 'primeng/types/inputgroupaddon';
import { InputGroupAddonStyle } from './style/inputgroupaddonstyle';

const INPUTGROUPADDON_INSTANCE = new InjectionToken<InputGroupAddon>('INPUTGROUPADDON_INSTANCE');

/**
 * InputGroupAddon displays text, icon, buttons and other content can be grouped next to an input.
 * @group Components
 */
@Component({
    selector: 'p-inputgroup-addon, p-inputGroupAddon',
    template: ` <ng-content></ng-content> `,
    standalone: true,
    imports: [BindModule],
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    },
    providers: [InputGroupAddonStyle, { provide: INPUTGROUPADDON_INSTANCE, useExisting: InputGroupAddon }, { provide: PARENT_INSTANCE, useExisting: InputGroupAddon }],
    hostDirectives: [Bind]
})
export class InputGroupAddon extends BaseComponent<InputGroupAddonPassThrough> {
    _componentStyle = inject(InputGroupAddonStyle);

    $pcInputGroupAddon: InputGroupAddon | undefined = inject(INPUTGROUPADDON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    @HostBinding('style') get hostStyle(): { [klass: string]: any } | null | undefined {
        return this.style;
    }
}

@NgModule({
    imports: [InputGroupAddon, SharedModule],
    exports: [InputGroupAddon, SharedModule]
})
export class InputGroupAddonModule {}
