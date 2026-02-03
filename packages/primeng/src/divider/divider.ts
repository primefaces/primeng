import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { DividerStyle } from './style/dividerstyle';
import { DividerAlign, DividerLayout, DividerPassThrough, DividerType } from 'primeng/types/divider';

const DIVIDER_INSTANCE = new InjectionToken<Divider>('DIVIDER_INSTANCE');

/**
 * Divider is used to separate contents.
 * @group Components
 */
@Component({
    selector: 'p-divider',
    standalone: true,
    imports: [SharedModule, BindModule],
    template: `
        <div [pBind]="ptm('content')" [class]="cx('content')">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.aria-orientation]': 'layout()',
        role: 'separator',
        '[class]': "cx('root')",
        '[style]': "sx('root')",
        '[attr.data-p]': 'dataP()'
    },
    providers: [DividerStyle, { provide: DIVIDER_INSTANCE, useExisting: Divider }, { provide: PARENT_INSTANCE, useExisting: Divider }],
    hostDirectives: [Bind]
})
export class Divider extends BaseComponent<DividerPassThrough> {
    componentName = 'Divider';

    $pcDivider: Divider | undefined = inject(DIVIDER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Specifies the orientation.
     * @group Props
     */
    layout = input<DividerLayout>('horizontal');

    /**
     * Border style type.
     * @group Props
     */
    type = input<DividerType>('solid');

    /**
     * Alignment of the content.
     * @group Props
     */
    align = input<DividerAlign>();

    _componentStyle = inject(DividerStyle);

    dataP = computed(() => {
        return this.cn({
            [this.align() as string]: this.align(),
            [this.layout() as string]: this.layout(),
            [this.type() as string]: this.type()
        });
    });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@NgModule({
    imports: [Divider, BindModule],
    exports: [Divider, BindModule]
})
export class DividerModule {}
