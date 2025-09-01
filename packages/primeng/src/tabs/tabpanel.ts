import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, input, model, ViewEncapsulation } from '@angular/core';
import { equals } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { TabPanelStyle } from './style/tabpanelstyle';
import { Tabs } from './tabs';

/**
 * TabPanel is a helper component for Tabs component.
 * @group Components
 */
@Component({
    selector: 'p-tabpanel',
    standalone: true,
    imports: [NgTemplateOutlet],
    template: `
        <ng-template #defaultContent>
            <ng-content />
        </ng-template>

        @if (shouldRender()) {
            <ng-container *ngTemplateOutlet="content() ? content() : defaultContent" />
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TabPanelStyle],
    host: {
        '[class]': 'cx("root")',
        '[attr.data-pc-name]': '"tabpanel"',
        '[attr.id]': 'id()',
        '[attr.role]': '"tabpanel"',
        '[attr.aria-labelledby]': 'ariaLabelledby()',
        '[attr.data-p-active]': 'active()',
        '[hidden]': '!active()'
    }
})
export class TabPanel extends BaseComponent {
    pcTabs = inject<Tabs>(forwardRef(() => Tabs));
    /**
     * When enabled, tab is not rendered until activation. Default to false.
     * @type boolean
     * @defaultValue false
     * @group Props
     */
    lazy = input(false, { transform: booleanAttribute });
    /**
     * Value of the active tab.
     * @defaultValue undefined
     * @group Props
     */
    value = model<string | number | undefined>(undefined);
    /**
     * Template for initializing complex content when lazy mode is enabled.
     * @group Templates
     */
    content = contentChild('content');

    id = computed(() => `${this.pcTabs.id()}_tabpanel_${this.value()}`);

    ariaLabelledby = computed(() => `${this.pcTabs.id()}_tab_${this.value()}`);

    active = computed(() => equals(this.pcTabs.value(), this.value()));

    _lazy = computed(() => this.pcTabs.lazy() || this.lazy());

    _componentStyle = inject(TabPanelStyle);

    private hasBeenRendered = false;

    readonly shouldRender = computed(() => {
        if (!this._lazy()) {
            return true;
        }

        if (!this.hasBeenRendered && this.active()) {
            this.hasBeenRendered = true;
        }

        return this.hasBeenRendered;
    });
}
