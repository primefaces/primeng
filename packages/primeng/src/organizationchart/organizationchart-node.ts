import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { BindModule } from 'primeng/bind';
import { ChevronDownIcon, ChevronUpIcon } from 'primeng/icons';
import type { OrganizationChart } from './organizationchart';
import { ORGANIZATIONCHART_INSTANCE } from './organizationchart-token';
import { OrganizationChartStyle } from './style/organizationchartstyle';

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

    chart = inject<OrganizationChart>(ORGANIZATIONCHART_INSTANCE);

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
