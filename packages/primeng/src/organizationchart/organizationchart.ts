import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, inject, input, model, NgModule, output, TemplateRef } from '@angular/core';
import { isAttributeEquals } from '@primeuix/utils';
import { TreeNode } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import {
    OrganizationChartNodeCollapseEvent,
    OrganizationChartNodeExpandEvent,
    OrganizationChartNodeSelectEvent,
    OrganizationChartNodeUnSelectEvent,
    OrganizationChartPassThrough,
    OrganizationChartSelectionMode
} from 'primeng/types/organizationchart';
import { OrganizationChartNode } from './organizationchart-node';
import { ORGANIZATIONCHART_INSTANCE } from './organizationchart-token';
import { OrganizationChartStyle } from './style/organizationchartstyle';

/**
 * OrganizationChart visualizes hierarchical organization data.
 * @group Components
 */
@Component({
    selector: 'p-organization-chart, p-organizationchart',
    standalone: true,
    imports: [OrganizationChartNode, BindModule],
    template: `
        @if (root()) {
            <table [class]="cx('table')" [collapsible]="collapsible()" pOrganizationChartNode [pt]="pt" [unstyled]="unstyled()" [node]="root()" [pBind]="ptm('table')"></table>
        }
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [OrganizationChartStyle, { provide: ORGANIZATIONCHART_INSTANCE, useExisting: OrganizationChart }, { provide: PARENT_INSTANCE, useExisting: OrganizationChart }],
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class OrganizationChart extends BaseComponent<OrganizationChartPassThrough> {
    componentName = 'OrganizationChart';

    /**
     * An array of nested TreeNodes.
     * @group Props
     */
    value = input<TreeNode[]>();
    /**
     * Defines the selection mode.
     * @group Props
     */
    selectionMode = input<OrganizationChartSelectionMode | null>();
    /**
     * Whether the nodes can be expanded or toggled.
     * @group Props
     */
    collapsible = input(undefined, { transform: booleanAttribute });
    /**
     * A single treenode instance or an array to refer to the selections.
     * @group Props
     */
    selection = model<any>();
    /**
     * Callback to invoke when a node is selected.
     * @param {OrganizationChartNodeSelectEvent} event - custom node select event.
     * @group Emits
     */
    onNodeSelect = output<OrganizationChartNodeSelectEvent>();
    /**
     * Callback to invoke when a node is unselected.
     * @param {OrganizationChartNodeUnSelectEvent} event - custom node unselect event.
     * @group Emits
     */
    onNodeUnselect = output<OrganizationChartNodeUnSelectEvent>();
    /**
     * Callback to invoke when a node is expanded.
     * @param {OrganizationChartNodeExpandEvent} event - custom node expand event.
     * @group Emits
     */
    onNodeExpand = output<OrganizationChartNodeExpandEvent>();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {OrganizationChartNodeCollapseEvent} event - custom node collapse event.
     * @group Emits
     */
    onNodeCollapse = output<OrganizationChartNodeCollapseEvent>();

    /**
     * Custom toggler icon template.
     * @param {Object} context - item data.
     * @group Templates
     */
    togglerIconTemplate = contentChild<TemplateRef<any>>('togglericon', { descendants: false });

    /**
     * Custom node template.
     * @group Templates
     */
    nodeTemplate = contentChild<TemplateRef<any>>('node', { descendants: false });

    _componentStyle = inject(OrganizationChartStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcOrganizationChart = inject(ORGANIZATIONCHART_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    ngAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    root = computed(() => {
        const value = this.value();
        return value && value.length ? value[0] : null;
    });

    getTemplateForNode(_node: TreeNode): TemplateRef<any> | null {
        return this.nodeTemplate() ?? null;
    }

    onNodeClick(event: Event, node: TreeNode) {
        let eventTarget = <Element>event.target;

        if (isAttributeEquals(eventTarget, 'data-pc-section', 'nodetogglebutton') || isAttributeEquals(eventTarget, 'data-pc-section', 'nodetogglebuttonicon')) {
            return;
        } else if (this.selectionMode()) {
            if (node.selectable === false) {
                return;
            }

            let index = this.findIndexInSelection(node);
            let selected = index >= 0;

            if (this.selectionMode() === 'single') {
                if (selected) {
                    this.selection.set(null);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                } else {
                    this.selection.set(node);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            } else if (this.selectionMode() === 'multiple') {
                if (selected) {
                    this.selection.set(this.selection().filter((_: any, i: number) => i != index));
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                } else {
                    this.selection.set([...(this.selection() || []), node]);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
        }
    }

    findIndexInSelection(node: TreeNode) {
        let index: number = -1;

        if (this.selectionMode() && this.selection()) {
            if (this.selectionMode() === 'single') {
                index = this.selection() == node ? 0 : -1;
            } else if (this.selectionMode() === 'multiple') {
                for (let i = 0; i < this.selection().length; i++) {
                    if (this.selection()[i] == node) {
                        index = i;
                        break;
                    }
                }
            }
        }

        return index;
    }

    isSelected(node: TreeNode) {
        return this.findIndexInSelection(node) != -1;
    }
}

@NgModule({
    imports: [OrganizationChart],
    exports: [OrganizationChart]
})
export class OrganizationChartModule {}
