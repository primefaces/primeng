import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, model, TemplateRef, ViewEncapsulation } from '@angular/core';
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

    id = computed(() => `${this.pcTabs.id()}_tabpanel_${this.value()}`);

    lazyContent = contentChild(TemplateRef);

    ariaLabelledby = computed(() => `${this.pcTabs.id()}_tab_${this.value()}`);

    active = computed(() => equals(this.pcTabs.value(), this.value()));

    _componentStyle = inject(TabPanelStyle);

    private _initialized = false;

    initialized = computed(() => {
        if (this._initialized) {
            return true;
        }

        if (!this.active()) {
            return false;
        }

        this._initialized = true;
        return true;
    });
}
