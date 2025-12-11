import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, InjectionToken, input, model, ViewEncapsulation } from '@angular/core';
import { equals } from '@primeuix/utils';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { TabPanelStyle } from './style/tabpanelstyle';
import { Tabs } from './tabs';
import { TabPanelPassThrough } from 'primeng/types/tabs';

const TABPANEL_INSTANCE = new InjectionToken<TabPanel>('TABPANEL_INSTANCE');

/**
 * TabPanel is a helper component for Tabs component.
 * @group Components
 */
@Component({
    selector: 'p-tabpanel',
    standalone: true,
    imports: [NgTemplateOutlet, BindModule],
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
    providers: [TabPanelStyle, { provide: TABPANEL_INSTANCE, useExisting: TabPanel }, { provide: PARENT_INSTANCE, useExisting: TabPanel }],
    host: {
        '[class]': 'cx("root")',
        '[attr.id]': 'id()',
        '[attr.role]': '"tabpanel"',
        '[attr.aria-labelledby]': 'ariaLabelledby()',
        '[attr.data-p-active]': 'active()',
        '[hidden]': '!active()'
    },
    hostDirectives: [Bind]
})
export class TabPanel extends BaseComponent<TabPanelPassThrough> {
    $pcTabPanel: TabPanel | undefined = inject(TABPANEL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    pcTabs = inject<Tabs>(forwardRef(() => Tabs));

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * When enabled, tab is not rendered until activation.
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
     * Template for initializing complex content when lazy is enabled.
     * @group Templates
     */
    content = contentChild('content');

    id = computed(() => `${this.pcTabs.id()}_tabpanel_${this.value()}`);

    ariaLabelledby = computed(() => `${this.pcTabs.id()}_tab_${this.value()}`);

    active = computed(() => equals(this.pcTabs.value(), this.value()));

    isLazyEnabled = computed(() => this.pcTabs.lazy() || this.lazy());

    private hasBeenRendered = false;

    shouldRender = computed(() => {
        if (!this.isLazyEnabled() || this.hasBeenRendered) {
            return true;
        }

        if (this.active()) {
            this.hasBeenRendered = true;
            return true;
        }

        return false;
    });

    _componentStyle = inject(TabPanelStyle);
}
