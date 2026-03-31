import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, effect, inject, input, model, NgModule, output, TemplateRef } from '@angular/core';
import { isAttributeEquals } from '@primeuix/utils';
import { TreeNode } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import {
    OrgChartNode,
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
            <ul [class]="cx('subtree', { root: true })" role="tree" [attr.aria-multiselectable]="selectionMode() === 'multiple' ? true : undefined" [pBind]="ptm('subtree')">
                <li
                    [class]="cx('tree')"
                    role="treeitem"
                    [attr.aria-expanded]="getAriaExpanded(root()!)"
                    [attr.aria-selected]="isSelected(root()!)"
                    pOrganizationChartNode
                    [node]="root()"
                    [root]="true"
                    [collapsible]="collapsible()"
                    [pt]="pt"
                    [unstyled]="unstyled()"
                    [pBind]="ptm('tree')"
                ></li>
            </ul>
        }
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [OrganizationChartStyle, { provide: ORGANIZATIONCHART_INSTANCE, useExisting: OrganizationChart }, { provide: PARENT_INSTANCE, useExisting: OrganizationChart }],
    host: {
        '[class]': "cx('root')",
        '[style.--gap-x]': 'gapX()',
        '[style.--gap-y]': 'gapY()'
    },
    hostDirectives: [Bind]
})
export class OrganizationChart extends BaseComponent<OrganizationChartPassThrough> {
    componentName = 'OrganizationChart';

    /**
     * An array of nested TreeNodes.
     * @group Props
     */
    value = input<OrgChartNode[]>();
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
     * Defines the gap between nodes. Can be a single number or a tuple [gapX, gapY].
     * @group Props
     */
    gap = input<number | [number, number]>(40);
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
     * Custom collapse button template.
     * @param {Object} context - collapse button data.
     * @group Templates
     */
    collapseButtonTemplate = contentChild<TemplateRef<any>>('collapsebutton', { descendants: false });

    /**
     * Custom node template.
     * @group Templates
     */
    nodeTemplate = contentChild<TemplateRef<any>>('node', { descendants: false });

    _componentStyle = inject(OrganizationChartStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcOrganizationChart = inject(ORGANIZATIONCHART_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    private _defaultsApplied = false;

    constructor() {
        super();
        effect(() => {
            const value = this.value();
            if (value && value.length && !this._defaultsApplied) {
                this._defaultsApplied = true;
                this._applyDefaults(value);
            }
        });
    }

    ngAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    root = computed(() => {
        const value = this.value();
        return value && value.length ? value[0] : null;
    });

    gapX = computed(() => {
        const g = this.gap();
        return Array.isArray(g) ? g[0] : g;
    });

    gapY = computed(() => {
        const g = this.gap();
        return Array.isArray(g) ? (g.length > 1 ? g[1] : g[0]) : g;
    });

    getAriaExpanded(node: TreeNode): true | undefined {
        return node.expanded !== false && node.children && node.children.length > 0 ? true : undefined;
    }

    getTemplateForNode(_node: TreeNode): TemplateRef<any> | null {
        return this.nodeTemplate() ?? null;
    }

    onNodeClick(event: Event, node: TreeNode) {
        let eventTarget = <Element>event.target;

        if (isAttributeEquals(eventTarget, 'data-pc-section', 'collapsebutton') || isAttributeEquals(eventTarget, 'data-pc-section', 'collapsebuttonicon')) {
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

    private _applyDefaults(nodes: OrgChartNode[]) {
        const selectedNodes: OrgChartNode[] = [];
        const collapsible = this.collapsible();
        const selectionMode = this.selectionMode();

        this._traverseDefaults(nodes, selectedNodes, collapsible, selectionMode);

        if (selectedNodes.length > 0) {
            if (selectionMode === 'single') {
                this.selection.set(selectedNodes[0]);
            } else if (selectionMode === 'multiple') {
                this.selection.set(selectedNodes);
            }
        }
    }

    private _traverseDefaults(nodes: OrgChartNode[], selectedNodes: OrgChartNode[], collapsible: boolean | undefined, selectionMode: string | null | undefined) {
        for (const node of nodes) {
            if (node.collapsedByDefault && (node.collapsible ?? collapsible) && node.children && node.children.length > 0) {
                node.expanded = false;
            }
            if (node.selectedByDefault && selectionMode && node.selectable !== false) {
                if (selectionMode === 'single' && selectedNodes.length > 0) {
                    continue;
                }
                selectedNodes.push(node);
            }
            if (node.children) {
                this._traverseDefaults(node.children, selectedNodes, collapsible, selectionMode);
            }
        }
    }
}

@NgModule({
    imports: [OrganizationChart],
    exports: [OrganizationChart]
})
export class OrganizationChartModule {}
