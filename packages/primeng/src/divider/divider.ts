import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, inject, InjectionToken, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/pbind';
import { DividerStyle } from './style/dividerstyle';

const DIVIDER_INSTANCE = new InjectionToken<Divider>('DIVIDER_INSTANCE');

/**
 * Divider is used to separate contents.
 * @group Components
 */
@Component({
    selector: 'p-divider',
    standalone: true,
    imports: [CommonModule, SharedModule, Bind],
    template: `
        <div [pBind]="ptm('content')" [class]="cx('content')">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.aria-orientation]': 'layout',
        role: 'separator',
        '[class]': "cn(cx('root'), styleClass)",
        '[style]': "sx('root')"
    },
    providers: [DividerStyle, { provide: DIVIDER_INSTANCE, useExisting: Divider }, { provide: PARENT_INSTANCE, useExisting: Divider }],
    hostDirectives: [Bind]
})
export class Divider extends BaseComponent {
    $pcDivider: Divider | undefined = inject(DIVIDER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Specifies the orientation.
     * @group Props
     */
    @Input() layout: 'horizontal' | 'vertical' | undefined = 'horizontal';
    /**
     * Border style type.
     * @group Props
     */
    @Input() type: 'solid' | 'dashed' | 'dotted' | undefined = 'solid';
    /**
     * Alignment of the content.
     * @group Props
     */
    @Input() align: 'left' | 'center' | 'right' | 'top' | 'bottom' | undefined;

    _componentStyle = inject(DividerStyle);
}

@NgModule({
    imports: [Divider, Bind],
    exports: [Divider, Bind]
})
export class DividerModule {}
