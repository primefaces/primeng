import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { BindModule } from 'primeng/bind';
import { OrgChartNode } from 'primeng/types/organizationchart';
import { ChevronDown as ChevronDownIcon } from '@primeicons/angular/chevron-down';
import { ChevronUp as ChevronUpIcon } from '@primeicons/angular/chevron-up';
import type { OrganizationChart } from './organizationchart';
import { ORGANIZATIONCHART_INSTANCE } from './organizationchart-token';
import { OrganizationChartStyle } from './style/organizationchartstyle';

@Component({
    selector: '[pOrganizationChartNode]',
    standalone: true,
    imports: [NgTemplateOutlet, ChevronDownIcon, ChevronUpIcon, BindModule],
    template: `
        @if (node()) {
            <div
                [class]="cn(cx('node'), node()!.styleClass)"
                [attr.data-selectable]="isSelectable()"
                [attr.data-selected]="isSelected()"
                [attr.data-collapsible]="isCollapsible()"
                [attr.data-collapsed]="isCollapsed()"
                [attr.tabindex]="nodeTabIndex()"
                (click)="onNodeClick($event, node()!)"
                (keydown.enter)="onNodeKeyDown($event, node()!)"
                (keydown.space)="onNodeKeyDown($event, node()!)"
                [pBind]="getPTOptions('node')"
            >
                <div [class]="cx('nodeContent')" [pBind]="ptm('nodeContent')">
                    @if (!chart.getTemplateForNode(node()!)) {
                        {{ node()!.label }}
                    } @else {
                        <ng-container *ngTemplateOutlet="chart.getTemplateForNode(node()!); context: { $implicit: node() }"></ng-container>
                    }
                </div>
                @if (isCollapsible()) {
                    @if (chart.collapseButtonTemplate()) {
                        <ng-container *ngTemplateOutlet="chart.collapseButtonTemplate()!; context: getCollapseButtonContext()"></ng-container>
                    } @else {
                        <button type="button" [class]="cx('collapseButton')" (click)="toggleNode($event, node()!)" (keydown.enter)="toggleNode($event, node()!)" (keydown.space)="toggleNode($event, node()!)" [pBind]="getPTOptions('collapseButton')">
                            @if (isCollapsed()) {
                                <span>+{{ children().length }}</span>
                            } @else {
                                <span>Collapse</span>
                            }
                            @if (!chart.togglerIconTemplate()) {
                                @if (isCollapsed()) {
                                    <svg data-p-icon="chevron-down" [class]="cx('collapseButtonDownIcon')" [pBind]="getPTOptions('collapseButtonDownIcon')" />
                                } @else {
                                    <svg data-p-icon="chevron-up" [class]="cx('collapseButtonUpIcon')" [pBind]="getPTOptions('collapseButtonUpIcon')" />
                                }
                            } @else {
                                <span [pBind]="getPTOptions(isCollapsed() ? 'collapseButtonDownIcon' : 'collapseButtonUpIcon')">
                                    <ng-template *ngTemplateOutlet="chart.togglerIconTemplate()!; context: { $implicit: node()!.expanded }"></ng-template>
                                </span>
                            }
                        </button>
                    }
                }
            </div>
            @if (!leaf && node()!.expanded) {
                <ul [class]="cx('subtree')" role="group" [pBind]="ptm('subtree')">
                    @for (child of children(); track child) {
                        <li
                            [class]="cx('tree')"
                            role="treeitem"
                            [attr.aria-expanded]="getAriaExpanded(child)"
                            [attr.aria-selected]="chart.isSelected(child)"
                            pOrganizationChartNode
                            [node]="child"
                            [collapsible]="collapsible()"
                            [unstyled]="unstyled()"
                            [pt]="pt"
                            [pBind]="ptm('tree')"
                        ></li>
                    }
                </ul>
            }
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [OrganizationChartStyle, { provide: PARENT_INSTANCE, useExisting: OrganizationChartNode }]
})
export class OrganizationChartNode extends BaseComponent {
    node = input<OrgChartNode<any>>();

    root = input(undefined, { transform: booleanAttribute });

    collapsible = input(undefined, { transform: booleanAttribute });

    chart = inject<OrganizationChart>(ORGANIZATIONCHART_INSTANCE);

    _componentStyle = inject(OrganizationChartStyle);

    children = computed(() => this.node()?.children ?? []);

    toggleNodeFn = this.toggleNode.bind(this);

    nodeTabIndex = computed(() => (this.isSelectable() ? 0 : -1));

    get leaf() {
        const node = this.node();
        if (node) {
            return node.leaf == false ? false : !(node.children && node.children.length);
        }
    }

    private _resolveCollapsible(): boolean {
        return this.node()?.collapsible ?? !!this.collapsible();
    }

    isCollapsible() {
        return !this.leaf && this._resolveCollapsible();
    }

    isCollapsed() {
        return this.isCollapsible() && !this.node()?.expanded;
    }

    isSelectable() {
        return !!this.chart.selectionMode() && this.node()?.selectable !== false;
    }

    getCollapseButtonContext() {
        return {
            $implicit: this.node(),
            expanded: this.node()!.expanded,
            collapsed: this.isCollapsed(),
            childCount: this.children().length,
            toggle: this.toggleNodeFn
        };
    }

    getAriaExpanded(node: TreeNode): true | undefined {
        return node.expanded !== false && node.children && node.children.length > 0 ? true : undefined;
    }

    getPTOptions(key: string) {
        return this.ptm(key, {
            context: {
                expanded: this.node()?.expanded,
                selectable: this.isSelectable(),
                selected: this.isSelected(),
                toggleable: this.isCollapsible(),
                collapsed: this.isCollapsed(),
                active: this.isSelected()
            }
        });
    }

    onNodeClick(event: Event, node: TreeNode) {
        this.chart.onNodeClick(event, node);
    }

    onNodeKeyDown(event: Event, node: TreeNode) {
        event.preventDefault();
        this.chart.onNodeClick(event, node);
    }

    toggleNode(event: Event, node: TreeNode) {
        node.expanded = !node.expanded;
        if (node.expanded) this.chart.onNodeExpand.emit({ originalEvent: event, node: this.node() as TreeNode });
        else this.chart.onNodeCollapse.emit({ originalEvent: event, node: this.node() as TreeNode });

        event.preventDefault();
        event.stopPropagation();
    }

    isSelected() {
        return this.chart.isSelected(this.node() as TreeNode);
    }
}
