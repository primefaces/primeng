import { ChangeDetectionStrategy, Component, inject, InjectionToken, input, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { IconFieldIconPosition, IconFieldPassThrough } from 'primeng/types/iconfield';
import { IconFieldStyle } from './style/iconfieldstyle';

const ICONFIELD_INSTANCE = new InjectionToken<IconField>('ICONFIELD_INSTANCE');

/**
 * IconField wraps an input and an icon.
 * @group Components
 */
@Component({
    selector: 'p-iconfield, p-icon-field',
    standalone: true,
    imports: [BindModule],
    template: ` <ng-content></ng-content>`,
    providers: [IconFieldStyle, { provide: ICONFIELD_INSTANCE, useExisting: IconField }, { provide: PARENT_INSTANCE, useExisting: IconField }],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class IconField extends BaseComponent<IconFieldPassThrough> {
    componentName = 'IconField';

    hostName = input<any>('');

    _componentStyle = inject(IconFieldStyle);

    $pcIconField: IconField | undefined = inject(ICONFIELD_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Position of the icon.
     * @group Props
     */
    iconPosition = input<IconFieldIconPosition>('left');
}

@NgModule({
    imports: [IconField],
    exports: [IconField]
})
export class IconFieldModule {}
