import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, HostBinding, inject, InjectionToken, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { IconFieldPassThrough } from 'primeng/types/iconfield';
import { IconFieldStyle } from './style/iconfieldstyle';

const ICONFIELD_INSTANCE = new InjectionToken<IconField>('ICONFIELD_INSTANCE');

/**
 * IconField wraps an input and an icon.
 * @group Components
 */
@Component({
    selector: 'p-iconfield, p-iconField, p-icon-field',
    standalone: true,
    imports: [CommonModule, BindModule],
    template: ` <ng-content></ng-content>`,
    providers: [IconFieldStyle, { provide: ICONFIELD_INSTANCE, useExisting: IconField }, { provide: PARENT_INSTANCE, useExisting: IconField }],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    },
    hostDirectives: [Bind]
})
export class IconField extends BaseComponent<IconFieldPassThrough> implements AfterViewChecked {
    _componentStyle = inject(IconFieldStyle);

    $pcIconField: IconField | undefined = inject(ICONFIELD_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPosition: 'right' | 'left' = 'left';
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string;
}

@NgModule({
    imports: [IconField],
    exports: [IconField]
})
export class IconFieldModule {}
