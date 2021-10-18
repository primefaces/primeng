import {NgModule,Component,ElementRef,Input,Output,AfterContentInit,EventEmitter,TemplateRef,
        Inject,forwardRef,ContentChildren,QueryList,ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'primeng/api';
import {TreeNode} from 'primeng/api';
import {PrimeTemplate} from 'primeng/api';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: '[pOrganizationChartNode]',
    template: `
        <tbody *ngIf="node">
            <tr>
                <td [attr.colspan]="colspan">
                    <div [class]="node.styleClass" [ngClass]="{'p-organizationchart-node-content': true, 'p-organizationchart-selectable-node': chart.selectionMode && node.selectable !== false,'p-highlight':isSelected()}"
                        (click)="onNodeClick($event,node)">
                        <div *ngIf="!chart.getTemplateForNode(node)">{{node.label}}</div>
                        <div *ngIf="chart.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="chart.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                        </div>
                        <a *ngIf="!leaf" tabindex="0" class="p-node-toggler" (click)="toggleNode($event, node)" (keydown.enter)="toggleNode($event, node)">
                            <i class="p-node-toggler-icon pi" [ngClass]="{'pi-chevron-down': node.expanded, 'pi-chevron-up': !node.expanded}"></i>
                        </a>
                    </div>
                </td>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-lines" [@childState]="'in'">
                <td [attr.colspan]="colspan">
                    <div class="p-organizationchart-line-down"></div>
                </td>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-lines" [@childState]="'in'">
                <ng-container *ngIf="node.children && node.children.length === 1">
                    <td [attr.colspan]="colspan">
                        <div class="p-organizationchart-line-down"></div>
                    </td>
                </ng-container>
                <ng-container *ngIf="node.children && node.children.length > 1">
                    <ng-template ngFor let-child [ngForOf]="node.children" let-first="first" let-last="last">
                        <td class="p-organizationchart-line-left" [ngClass]="{'p-organizationchart-line-top':!first}">&nbsp;</td>
                        <td class="p-organizationchart-line-right" [ngClass]="{'p-organizationchart-line-top':!last}">&nbsp;</td>
                    </ng-template>
                </ng-container>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-nodes" [@childState]="'in'">
                <td *ngFor="let child of node.children" colspan="2">
                    <table class="p-organizationchart-table" pOrganizationChartNode [node]="child"></table>
                </td>
            </tr>
        </tbody>
    `,
    animations: [
        trigger('childState', [
            state('in', style({opacity: 1})),
           transition('void => *', [
             style({opacity: 0}),
             animate(150)
           ]),
           transition('* => void', [
             animate(150, style({opacity:0}))
           ])
        ])
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./organizationchart.css'],
    host: {
        'class': 'p-element'
    }
})
export class OrganizationChartNode implements OnDestroy{

    @Input() node: TreeNode;

    @Input() root: boolean;

    @Input() first: boolean;

    @Input() last: boolean;

    chart: OrganizationChart;

    subscription: Subscription;

    constructor(@Inject(forwardRef(() => OrganizationChart)) chart, public cd: ChangeDetectorRef) {
        this.chart = chart as OrganizationChart;
        this.subscription = this.chart.selectionSource$.subscribe(() =>{
            this.cd.markForCheck();
        })
    }

    get leaf(): boolean {
        return this.node.leaf == false ? false : !(this.node.children&&this.node.children.length);
    }

    get colspan() {
        return (this.node.children && this.node.children.length) ? this.node.children.length * 2: null;
    }

    onNodeClick(event: Event, node: TreeNode) {
        this.chart.onNodeClick(event, node)
    }

    toggleNode(event: Event, node: TreeNode) {
        node.expanded = !node.expanded;
        if (node.expanded)
            this.chart.onNodeExpand.emit({originalEvent: event, node: this.node});
        else
            this.chart.onNodeCollapse.emit({originalEvent: event, node: this.node});

        event.preventDefault();
    }

    isSelected() {
        return this.chart.isSelected(this.node);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

@Component({
    selector: 'p-organizationChart',
    template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'p-organizationchart p-component': true, 'p-organizationchart-preservespace': preserveSpace}">
            <table class="p-organizationchart-table" pOrganizationChartNode [node]="root" *ngIf="root"></table>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush,
   host: {
    'class': 'p-element'
}
})
export class OrganizationChart implements AfterContentInit {

    @Input() value: TreeNode[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() selectionMode: string;

    @Input() preserveSpace: boolean = true;

    @Input()  get selection(): any {
        return this._selection;
    }

    set selection(val:any) {
        this._selection = val;

        if (this.initialized)
            this.selectionSource.next();
    }

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();

    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();

    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    public templateMap: any;

    private selectionSource = new Subject<any>();

    _selection: any;

    initialized: boolean;

    selectionSource$ = this.selectionSource.asObservable();

    constructor(public el: ElementRef, public cd:ChangeDetectorRef) {}

    get root(): TreeNode {
        return this.value && this.value.length ? this.value[0] : null;
    }

    ngAfterContentInit() {
        if (this.templates.length) {
            this.templateMap = {};
        }

        this.templates.forEach((item) => {
            this.templateMap[item.getType()] = item.template;
        });

        this.initialized = true;
    }

    getTemplateForNode(node: TreeNode): TemplateRef<any> {
        if (this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    }

    onNodeClick(event: Event, node: TreeNode) {
        let eventTarget = (<Element> event.target);

        if (eventTarget.className && (eventTarget.className.indexOf('p-node-toggler') !== -1 || eventTarget.className.indexOf('p-node-toggler-icon') !== -1)) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }

            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);

            if (this.selectionMode === 'single') {
                if (selected) {
                    this.selection = null;
                    this.onNodeUnselect.emit({originalEvent: event, node: node});
                }
                else {
                    this.selection = node;
                    this.onNodeSelect.emit({originalEvent: event, node: node});
                }
            }
            else if (this.selectionMode === 'multiple') {
                if (selected) {
                    this.selection = this.selection.filter((val,i) => i!=index);
                    this.onNodeUnselect.emit({originalEvent: event, node: node});
                }
                else {
                    this.selection = [...this.selection||[],node];
                    this.onNodeSelect.emit({originalEvent: event, node: node});
                }
            }

            this.selectionChange.emit(this.selection);
            this.selectionSource.next();
        }
    }

    findIndexInSelection(node: TreeNode) {
        let index: number = -1;

        if (this.selectionMode && this.selection) {
            if (this.selectionMode === 'single') {
                index = (this.selection == node) ? 0 : - 1;
            }
            else if (this.selectionMode === 'multiple') {
                for(let i = 0; i  < this.selection.length; i++) {
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
    imports: [CommonModule],
    exports: [OrganizationChart,SharedModule],
    declarations: [OrganizationChart,OrganizationChartNode]
})
export class OrganizationChartModule { }
