import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, InjectionToken, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/pbind';
import { TabPanelsStyle } from './style/tabpanelsstyle';

const TABPANELS_INSTANCE = new InjectionToken<TabPanels>('TABPANELS_INSTANCE');

/**
 * TabPanels is a helper component for Tabs component.
 * @group Components
 */
@Component({
    selector: 'p-tabpanels',
    standalone: true,
    imports: [CommonModule, BindModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")',
        '[attr.role]': '"presentation"'
    },
    providers: [TabPanelsStyle, { provide: TABPANELS_INSTANCE, useExisting: TabPanels }, { provide: PARENT_INSTANCE, useExisting: TabPanels }],
    hostDirectives: [Bind]
})
export class TabPanels extends BaseComponent {
    $pcTabPanels: TabPanels | undefined = inject(TABPANELS_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(TabPanelsStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
