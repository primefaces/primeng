import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { TabPanelsStyle } from './style/tabpanelsstyle';

/**
 * TabPanels is a helper component for Tabs component.
 * @group Components
 */
@Component({
    selector: 'p-tabpanels',
    standalone: true,
    imports: [CommonModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")',
        '[attr.data-pc-name]': '"tabpanels"',
        '[attr.role]': '"presentation"'
    },
    providers: [TabPanelsStyle]
})
export class TabPanels extends BaseComponent {
    _componentStyle = inject(TabPanelsStyle);
}
