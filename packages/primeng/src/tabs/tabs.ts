import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, model, NgModule, numberAttribute, signal, ViewEncapsulation } from '@angular/core';

import { uuid } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { TabsStyle } from './style/tabsstyle';
import { Tab } from './tab';
import { TabList } from './tablist';
import { TabPanel } from './tabpanel';
import { TabPanels } from './tabpanels';

/**
 * Tabs facilitates seamless switching between different views.
 * @group Components
 */
@Component({
    selector: 'p-tabs',
    standalone: true,
    imports: [CommonModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TabsStyle],
    host: {
        '[class.p-tabs]': 'true',
        '[class.p-tabs-scrollable]': 'scrollable()',
        '[class.p-component]': 'true',
        '[attr.data-pc-name]': '"tabs"',
        '[attr.id]': 'id'
    }
})
export class Tabs extends BaseComponent {
    /**
     * Value of the active tab.
     * @defaultValue undefined
     * @group Props
     */
    value = model<string | number | undefined>(undefined);
    /**
     * When specified, enables horizontal and/or vertical scrolling.
     * @type boolean
     * @defaultValue false
     * @group Props
     */
    scrollable = input(false, { transform: booleanAttribute });
    /**
     * When enabled, hidden tabs are not rendered at all. Defaults to false that hides tabs with css.
     * @type boolean
     * @defaultValue false
     * @group Props
     */
    lazy = input(false, { transform: booleanAttribute });
    /**
     * When enabled, the focused tab is activated.
     * @type boolean
     * @defaultValue false
     * @group Props
     */
    selectOnFocus = input(false, { transform: booleanAttribute });
    /**
     * Whether to display navigation buttons in container when scrollable is enabled.
     * @type boolean
     * @defaultValue true
     * @group Props
     */
    showNavigators = input(true, { transform: booleanAttribute });
    /**
     * Tabindex of the tab buttons.
     * @type number
     * @defaultValue 0
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });

    id = signal<string>(uuid('pn_id_'));

    _componentStyle = inject(TabsStyle);

    updateValue(newValue) {
        this.value.update(() => newValue);
    }
}

@NgModule({
    imports: [Tabs, TabPanels, TabPanel, TabList, Tab],
    exports: [Tabs, TabPanels, TabPanel, TabList, Tab]
})
export class TabsModule {}
