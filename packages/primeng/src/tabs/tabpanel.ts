import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, model, ViewEncapsulation } from '@angular/core';
import { equals } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { Tabs } from './tabs';

/**
 * TabPanel is a helper component for Tabs component.
 * @group Components
 */
@Component({
    selector: 'p-tabpanel',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-template #content>
            <ng-content></ng-content>
        </ng-template>

        @if (!lazy() || active()) {
            <ng-container *ngTemplateOutlet="content"></ng-container>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-tabpanel]': 'true',
        '[class.p-component]': 'true',
        '[attr.data-pc-name]': '"tabpanel"',
        '[attr.id]': 'id()',
        '[attr.role]': '"tabpanel"',
        '[attr.aria-labelledby]': 'ariaLabelledby()',
        '[attr.data-p-active]': 'active()',
        '[hidden]': '!active()'
    }
})
export class TabPanel extends BaseComponent {
    pcTabs: Tabs = inject(forwardRef(() => Tabs));
    /**
     * Value of the active tab.
     * @defaultValue undefined
     * @group Props
     */
    value = model<string | number | undefined>(undefined);

    id = computed(() => `${this.pcTabs.id()}_tabpanel_${this.value()}`);

    ariaLabelledby = computed(() => `${this.pcTabs.id()}_tab_${this.value()}`);

    active = computed(() => equals(this.pcTabs.value(), this.value()));

    lazy = computed(() => this.pcTabs.lazy());
}
