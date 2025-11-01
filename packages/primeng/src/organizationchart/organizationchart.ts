import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    inject,
    InjectionToken,
    Input,
    NgModule,
    Output,
    QueryList,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { hasClass, isAttributeEquals } from '@primeuix/utils';
import { PrimeTemplate, SharedModule, TreeNode } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronDownIcon, ChevronUpIcon } from 'primeng/icons';
import { Nullable } from 'primeng/ts-helpers';
import { OrganizationChartNodeCollapseEvent, OrganizationChartNodeExpandEvent, OrganizationChartNodeSelectEvent, OrganizationChartNodeUnSelectEvent, OrganizationChartPassThrough } from 'primeng/types/organizationchart';
import { Subject, Subscription } from 'rxjs';
import { OrganizationChartStyle } from './style/organizationchartstyle';

const ORGANIZATIONCHART_INSTANCE = new InjectionToken<OrganizationChart>('ORGANIZATIONCHART_INSTANCE');

@Component({
    selector: '[pOrganizationChartNode]',
    standalone: true,
    imports: [CommonModule, ChevronDownIcon, ChevronUpIcon, SharedModule, BindModule],
    template: `
        <tbody *ngIf="node" [pBind]="ptm('body')">
            <tr [pBind]="ptm('row')">
                <td [attr.colspan]="colspan" [pBind]="ptm('cell')">
                    <div [class]="cn(cx('node'), node.styleClass)" (click)="onNodeClick($event, node)" [pBind]="getPTOptions('node')">
                        <div *ngIf="!chart.getTemplateForNode(node)">{{ node.label }}</div>
                        <div *ngIf="chart.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="chart.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                        </div>
                        <ng-container *ngIf="collapsible">
                            <a
                                *ngIf="!leaf"
                                tabindex="0"
                                [class]="cx('nodeToggleButton')"
                                (click)="toggleNode($event, node)"
                                (keydown.enter)="toggleNode($event, node)"
                                (keydown.space)="toggleNode($event, node)"
                                [pBind]="getPTOptions('nodeToggleButton')"
                            >
                                <ng-container *ngIf="!chart.togglerIconTemplate && !chart._togglerIconTemplate">
                                    <svg data-p-icon="chevron-down" *ngIf="node.expanded" [class]="cx('nodeToggleButtonIcon')" [pBind]="getPTOptions('nodeToggleButtonIcon')" />
                                    <svg data-p-icon="chevron-up" *ngIf="!node.expanded" [class]="cx('nodeToggleButtonIcon')" [pBind]="getPTOptions('nodeToggleButtonIcon')" />
                                </ng-container>
                                <span [class]="cx('nodeToggleButtonIcon')" *ngIf="chart.togglerIconTemplate || chart._togglerIconTemplate" [pBind]="getPTOptions('nodeToggleButtonIcon')">
                                    <ng-template *ngTemplateOutlet="chart.togglerIconTemplate || chart._togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                                </span>
                            </a>
                        </ng-container>
                    </div>
                </td>
            </tr>
            <tr [ngStyle]="getChildStyle(node)" [class]="cx('connectors')" [@childState]="'in'" [pBind]="ptm('connectors')">
                <td [pBind]="ptm('lineCell')" [attr.colspan]="colspan">
                    <div [pBind]="ptm('connectorDown')" [class]="cx('connectorDown')"></div>
                </td>
            </tr>
            <tr [ngStyle]="getChildStyle(node)" [class]="cx('connectors')" [@childState]="'in'" [pBind]="ptm('connectors')">
                <ng-container *ngIf="node.children && node.children.length === 1">
                    <td [pBind]="ptm('lineCell')" [attr.colspan]="colspan">
                        <div [pBind]="ptm('connectorDown')" [class]="cx('connectorDown')"></div>
                    </td>
                </ng-container>
                <ng-container *ngIf="node.children && node.children.length > 1">
                    <ng-template ngFor let-child [ngForOf]="node.children" let-first="first" let-last="last" let-index="index">
                        <td [class]="cx('connectorLeft', { first })" [pBind]="getNodeOptions(!(index === 0), 'connectorLeft')">&nbsp;</td>
                        <td [class]="cx('connectorRight', { last })" [pBind]="getNodeOptions(!(index === node.children.length - 1), 'connectorRight')">&nbsp;</td>
                    </ng-template>
                </ng-container>
            </tr>
            <tr [ngStyle]="getChildStyle(node)" [class]="cx('nodeChildren')" [@childState]="'in'" [pBind]="ptm('nodeChildren')">
                <td *ngFor="let child of node.children" colspan="2" [pBind]="ptm('nodeCell')">
                    <table [class]="cx('table')" pOrganizationChartNode [unstyled]="unstyled()" [pt]="pt" [node]="child" [collapsible]="node.children && node.children.length > 0 && collapsible"></table>
                </td>
            </tr>
        </tbody>
    `,
    animations: [trigger('childState', [state('in', style({ opacity: 1 })), transition('void => *', [style({ opacity: 0 }), animate(150)]), transition('* => void', [animate(150, style({ opacity: 0 }))])])],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [OrganizationChartStyle, { provide: PARENT_INSTANCE, useExisting: OrganizationChartNode }]
})
export class OrganizationChartNode extends BaseComponent {
    @Input() node: TreeNode<any> | undefined;

    @Input({ transform: booleanAttribute }) root: boolean | undefined;

    @Input({ transform: booleanAttribute }) first: boolean | undefined;

    @Input({ transform: booleanAttribute }) last: boolean | undefined;

    @Input({ transform: booleanAttribute }) collapsible: boolean | undefined;

    chart: OrganizationChart;

    subscription: Subscription;

    _componentStyle = inject(OrganizationChartStyle);

    constructor(
        @Inject(forwardRef(() => OrganizationChart)) chart: OrganizationChart,
        public cd: ChangeDetectorRef
    ) {
        super();
        this.chart = chart as OrganizationChart;
        this.subscription = this.chart.selectionSource$.subscribe(() => {
            this.cd.markForCheck();
        });
    }

    get leaf(): boolean | undefined {
        if (this.node) {
            return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
        }
    }

    get colspan() {
        if (this.node) {
            return this.node.children && this.node.children.length ? this.node.children.length * 2 : null;
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
                expanded: this.node?.expanded,
                selectable: this.node?.selectable !== false && this.chart.selectionMode,
                selected: this.isSelected(),
                toggleable: this.collapsible && !this.leaf,
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
        if (node.expanded) this.chart.onNodeExpand.emit({ originalEvent: event, node: <TreeNode>this.node });
        else this.chart.onNodeCollapse.emit({ originalEvent: event, node: <TreeNode>this.node });

        event.preventDefault();
    }

    isSelected() {
        return this.chart.isSelected(this.node as TreeNode);
    }

    onDestroy() {
        this.subscription.unsubscribe();
    }
}
/**
 * OrganizationChart visualizes hierarchical organization data.
 * @group Components
 */
@Component({
    selector: 'p-organizationChart, p-organization-chart, p-organizationchart',
    standalone: true,
    imports: [CommonModule, OrganizationChartNode, SharedModule, BindModule],
    template: ` <table [class]="cx('table')" [collapsible]="collapsible" pOrganizationChartNode [pt]="pt" [unstyled]="unstyled()" [node]="root" *ngIf="root" [pBind]="ptm('table')"></table> `,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [OrganizationChartStyle, { provide: ORGANIZATIONCHART_INSTANCE, useExisting: OrganizationChart }, { provide: PARENT_INSTANCE, useExisting: OrganizationChart }],
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    },
    hostDirectives: [Bind]
})
export class OrganizationChart extends BaseComponent<OrganizationChartPassThrough> {
    /**
     * An array of nested TreeNodes.
     * @group Props
     */
    @Input() value: TreeNode[] | undefined;
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Defines the selection mode.
     * @group Props
     */
    @Input() selectionMode: 'single' | 'multiple' | null | undefined;
    /**
     * Whether the nodes can be expanded or toggled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) collapsible: boolean | undefined;
    /**
     * Whether the space allocated by a node is preserved when hidden.
     * @deprecated since v20.0.0.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) preserveSpace: boolean = true;
    /**
     * A single treenode instance or an array to refer to the selections.
     * @group Props
     */
    @Input() get selection(): any {
        return this._selection;
    }
    set selection(val: any) {
        this._selection = val;

        if (this.initialized) this.selectionSource.next(null);
    }
    /**
     * Callback to invoke on selection change.
     * @param {*} any - selected value.
     * @group Emits
     */
    @Output() selectionChange: EventEmitter<any> = new EventEmitter();
    /**
     * Callback to invoke when a node is selected.
     * @param {OrganizationChartNodeSelectEvent} event - custom node select event.
     * @group Emits
     */
    @Output() onNodeSelect: EventEmitter<OrganizationChartNodeSelectEvent> = new EventEmitter<OrganizationChartNodeSelectEvent>();
    /**
     * Callback to invoke when a node is unselected.
     * @param {OrganizationChartNodeUnSelectEvent} event - custom node unselect event.
     * @group Emits
     */
    @Output() onNodeUnselect: EventEmitter<OrganizationChartNodeUnSelectEvent> = new EventEmitter<OrganizationChartNodeUnSelectEvent>();
    /**
     * Callback to invoke when a node is expanded.
     * @param {OrganizationChartNodeExpandEvent} event - custom node expand event.
     * @group Emits
     */
    @Output() onNodeExpand: EventEmitter<OrganizationChartNodeExpandEvent> = new EventEmitter<OrganizationChartNodeExpandEvent>();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {OrganizationChartNodeCollapseEvent} event - custom node collapse event.
     * @group Emits
     */
    @Output() onNodeCollapse: EventEmitter<OrganizationChartNodeCollapseEvent> = new EventEmitter<OrganizationChartNodeCollapseEvent>();

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    @ContentChild('togglericon', { descendants: false }) togglerIconTemplate: TemplateRef<any> | undefined;

    public templateMap: any;

    _togglerIconTemplate: Nullable<TemplateRef<any>>;

    private selectionSource = new Subject<any>();

    _selection: any;

    initialized: Nullable<boolean>;

    selectionSource$ = this.selectionSource.asObservable();

    _componentStyle = inject(OrganizationChartStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcOrganizationChart: OrganizationChart | undefined = inject(ORGANIZATIONCHART_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    constructor(
        public el: ElementRef,
        public cd: ChangeDetectorRef
    ) {
        super();
    }

    ngAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    get root(): TreeNode<any> | null {
        return this.value && this.value.length ? this.value[0] : null;
    }

    onAfterContentInit() {
        if ((this.templates as QueryList<PrimeTemplate>).length) {
            this.templateMap = {};
        }

        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            if (item.getType() === 'togglericon') {
                this._togglerIconTemplate = item.template;
            } else {
                this.templateMap[item.getType()] = item.template;
            }
        });

        this.initialized = true;
    }

    getTemplateForNode(node: TreeNode): TemplateRef<any> | null {
        if (this.templateMap) return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else return null;
    }

    onNodeClick(event: Event, node: TreeNode) {
        let eventTarget = <Element>event.target;

        if (isAttributeEquals(eventTarget, 'data-pc-section', 'nodetogglebutton') || isAttributeEquals(eventTarget, 'data-pc-section', 'nodetogglebuttonicon')) {
            return;
        } else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }

            let index = this.findIndexInSelection(node);
            let selected = index >= 0;

            if (this.selectionMode === 'single') {
                if (selected) {
                    this.selection = null;
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                } else {
                    this.selection = node;
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            } else if (this.selectionMode === 'multiple') {
                if (selected) {
                    this.selection = this.selection.filter((val: any, i: number) => i != index);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                } else {
                    this.selection = [...(this.selection || []), node];
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }

            this.selectionChange.emit(this.selection);
            this.selectionSource.next(null);
        }
    }

    findIndexInSelection(node: TreeNode) {
        let index: number = -1;

        if (this.selectionMode && this.selection) {
            if (this.selectionMode === 'single') {
                index = this.selection == node ? 0 : -1;
            } else if (this.selectionMode === 'multiple') {
                for (let i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == node) {
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
    imports: [OrganizationChart, OrganizationChartNode, SharedModule],
    exports: [OrganizationChart, OrganizationChartNode, SharedModule]
})
export class OrganizationChartModule {}
