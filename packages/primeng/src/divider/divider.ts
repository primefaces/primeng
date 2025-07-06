import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { DividerStyle } from './style/dividerstyle';

/**
 * Divider is used to separate contents.
 * @group Components
 */
@Component({
    selector: 'p-divider',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <div [class]="cx('content')">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[aria-orientation]': 'layout',
        'data-pc-name': 'divider',
        role: 'separator',
        '[class]': "cn(cx('root'), styleClass)",
        '[style]': "sx('root')"
    },
    providers: [DividerStyle]
})
export class Divider extends BaseComponent {
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
    imports: [Divider],
    exports: [Divider]
})
export class DividerModule {}
