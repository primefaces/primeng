import { booleanAttribute, ChangeDetectionStrategy, Component, inject, InjectionToken, input, model, numberAttribute, signal, ViewEncapsulation } from '@angular/core';
import { uuid } from '@primeuix/utils';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { TabsPassThrough } from 'primeng/types/tabs';
import { TabsStyle } from './style/tabsstyle';

const TABS_INSTANCE = new InjectionToken<Tabs>('TABS_INSTANCE');

/**
 * Tabs facilitates seamless switching between different views.
 * @group Components
 */
@Component({
    selector: 'p-tabs',
    standalone: true,
    imports: [BindModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TabsStyle, { provide: TABS_INSTANCE, useExisting: Tabs }, { provide: PARENT_INSTANCE, useExisting: Tabs }],
    host: {
        '[class]': 'cx("root")',
        '[attr.id]': 'id()'
    },
    hostDirectives: [Bind]
})
export class Tabs extends BaseComponent<TabsPassThrough> {
    componentName = 'Tabs';

    $pcTabs: Tabs | undefined = inject(TABS_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

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
     * When enabled, tabs are not rendered until activation.
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

    updateValue(newValue: string | number | undefined) {
        this.value.update(() => newValue);
    }
}
