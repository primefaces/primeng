import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';

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
        '[class.p-tabpanels]': 'true',
        '[class.p-component]': 'true',
        '[attr.data-pc-name]': '"tabpanels"',
        '[attr.role]': '"presentation"'
    }
})
export class TabPanels extends BaseComponent {}
