import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, InjectionToken, input, model, NgModule, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { isAttributeEquals } from '@primeuix/utils';
import { TreeNode } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronDownIcon, ChevronUpIcon } from 'primeng/icons';
import {
    OrganizationChartNodeCollapseEvent,
    OrganizationChartNodeExpandEvent,
    OrganizationChartNodeSelectEvent,
    OrganizationChartNodeUnSelectEvent,
    OrganizationChartPassThrough,
    OrganizationChartSelectionMode
} from 'primeng/types/organizationchart';
import { OrganizationChartStyle } from './style/organizationchartstyle';

const ORGANIZATIONCHART_INSTANCE = new InjectionToken<OrganizationChart>('ORGANIZATIONCHART_INSTANCE');

@Component({
    selector: '[pOrganizationChartNode]',
    standalone: true,
    imports: [NgTemplateOutlet, ChevronDownIcon, ChevronUpIcon, BindModule],
    template: `
        @if (node()) {
            <tbody [pBind]="ptm('body')">
                <tr [pBind]="ptm('row')">
                    <td [attr.colspan]="colspan" [pBind]="ptm('cell')">
                        <div [class]="cn(cx('node'), node()!.styleClass)" (click)="onNodeClick($event, node()!)" [pBind]="getPTOptions('node')">
                            @if (!chart.getTemplateForNode(node()!)) {
                                <div>{{ node()!.label }}</div>
                            } @else {
                                <div>
                                    <ng-container *ngTemplateOutlet="chart.getTemplateForNode(node()!); context: { $implicit: node() }"></ng-container>
                                </div>
                            }
                            @if (collapsible()) {
                                @if (!leaf) {
                                    <a
                                        tabindex="0"
                                        [class]="cx('nodeToggleButton')"
                                        (click)="toggleNode($event, node()!)"
                                        (keydown.enter)="toggleNode($event, node()!)"
                                        (keydown.space)="toggleNode($event, node()!)"
                                        [pBind]="getPTOptions('nodeToggleButton')"
                                    >
                                        @if (!chart.togglerIconTemplate()) {
                                            @if (node()!.expanded) {
                                                <svg data-p-icon="chevron-down" [class]="cx('nodeToggleButtonIcon')" [pBind]="getPTOptions('nodeToggleButtonIcon')" />
                                            } @else {
                                                <svg data-p-icon="chevron-up" [class]="cx('nodeToggleButtonIcon')" [pBind]="getPTOptions('nodeToggleButtonIcon')" />
                                            }
                                        } @else {
                                            <span [class]="cx('nodeToggleButtonIcon')" [pBind]="getPTOptions('nodeToggleButtonIcon')">
                                                <ng-template *ngTemplateOutlet="chart.togglerIconTemplate()!; context: { $implicit: node()!.expanded }"></ng-template>
                                            </span>
                                        }
                                    </a>
                                }
                            }
                        </div>
                    </td>
                </tr>
                <tr [style]="getChildStyle(node()!)" [class]="cx('connectors')" [pBind]="ptm('connectors')">
                    <td [pBind]="ptm('lineCell')" [attr.colspan]="colspan">
                        <div [pBind]="ptm('connectorDown')" [class]="cx('connectorDown')"></div>
                    </td>
                </tr>
                <tr [style]="getChildStyle(node()!)" [class]="cx('connectors')" [pBind]="ptm('connectors')">
                    @if (hasSingleChild()) {
                        <td [pBind]="ptm('lineCell')" [attr.colspan]="colspan">
                            <div [pBind]="ptm('connectorDown')" [class]="cx('connectorDown')"></div>
                        </td>
                    }
                    @if (hasMultipleChildren()) {
                        @for (child of children(); track child) {
                            <td [class]="cx('connectorLeft', { first: $first })" [pBind]="getNodeOptions(!$first, 'connectorLeft')">&nbsp;</td>
                            <td [class]="cx('connectorRight', { last: $last })" [pBind]="getNodeOptions(!$last, 'connectorRight')">&nbsp;</td>
                        }
                    }
                </tr>
                <tr [style]="getChildStyle(node()!)" [class]="cx('nodeChildren')" [pBind]="ptm('nodeChildren')">
                    @for (child of children(); track child) {
                        <td colspan="2" [pBind]="ptm('nodeCell')">
                            <table [class]="cx('table')" pOrganizationChartNode [unstyled]="unstyled()" [pt]="pt" [node]="child" [collapsible]="childrenCollapsible()"></table>
                        </td>
                    }
                </tr>
            </tbody>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [OrganizationChartStyle, { provide: PARENT_INSTANCE, useExisting: OrganizationChartNode }]
})
export class OrganizationChartNode extends BaseComponent {
    node = input<TreeNode<any>>();

    root = input(undefined, { transform: booleanAttribute });

    first = input(undefined, { transform: booleanAttribute });

    last = input(undefined, { transform: booleanAttribute });

    collapsible = input(undefined, { transform: booleanAttribute });

    chart = inject(forwardRef(() => OrganizationChart));

    _componentStyle = inject(OrganizationChartStyle);

    children = computed(() => this.node()?.children ?? []);

    hasSingleChild = computed(() => this.children().length === 1);

    hasMultipleChildren = computed(() => this.children().length > 1);

    childrenCollapsible = computed(() => this.children().length > 0 && !!this.collapsible());

    get leaf() {
        const node = this.node();
        if (node) {
            return node.leaf == false ? false : !(node.children && node.children.length);
        }
    }

    get colspan() {
        const node = this.node();
        if (node) {
            return node.children && node.children.length ? node.children.length * 2 : null;
        }
    }

    getChildStyle(node: TreeNode<any>) {
        return {
            visibility: !this.leaf && node.expanded ? 'inherit' : 'hidden'
        };
    }

    getPTOptions(key: string) {
        return this.ptm(key, {
            context: {
                expanded: this.node()?.expanded,
                selectable: this.node()?.selectable !== false && this.chart.selectionMode(),
                selected: this.isSelected(),
                toggleable: this.collapsible() && !this.leaf,
                active: this.isSelected()
            }
        });
    }

    getNodeOptions(lineTop: boolean, key: string) {
        return this.ptm(key, {
            context: {
                lineTop
            }
        });
    }

    onNodeClick(event: Event, node: TreeNode) {
        this.chart.onNodeClick(event, node);
    }

    toggleNode(event: Event, node: TreeNode) {
        node.expanded = !node.expanded;
        if (node.expanded) this.chart.onNodeExpand.emit({ originalEvent: event, node: this.node() as TreeNode });
        else this.chart.onNodeCollapse.emit({ originalEvent: event, node: this.node() as TreeNode });

        event.preventDefault();
    }

    isSelected() {
        return this.chart.isSelected(this.node() as TreeNode);
    }
}
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
    imports: [OrganizationChart, OrganizationChartNode],
    exports: [OrganizationChart, OrganizationChartNode]
})
export class OrganizationChartModule {}
