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
        @if (lazyContent() && initialized()) {
            <ng-container *ngTemplateOutlet="lazyContent()" />
        } @else {
            <ng-content />
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
     * Value of the active tab.
     * @defaultValue undefined
     * @group Props
     */
    value = model<string | number | undefined>(undefined);
    /**
     * Defining if the lazy loaded content should remains in the DOM even after tab deactivation.
     * @type boolean
     * @defaultValue true
     * @group Props
     */
    cache = input(true, { transform: booleanAttribute });

    id = computed(() => `${this.pcTabs.id()}_tabpanel_${this.value()}`);

    lazyContent = contentChild('content');

    ariaLabelledby = computed(() => `${this.pcTabs.id()}_tab_${this.value()}`);

    active = computed(() => equals(this.pcTabs.value(), this.value()));

    _componentStyle = inject(TabPanelStyle);

    private _initialized = false;

    initialized = computed(() => {
        if (!this.cache()) {
            return this.active();
        }

        if (!this._initialized && this.active()) {
            this._initialized = true;
        }

        return this._initialized;
    });
}
