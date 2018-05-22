import {NgModule, AfterContentInit, Component, Input, Output, EventEmitter, ContentChildren, TemplateRef, QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeNode} from '../common/treenode';
import {Subscription} from 'rxjs';
import {DomHandler} from '../dom/domhandler';
import { PrimeTemplate } from '../common/shared';

@Component({
    selector: 'p-treeTable',
    template: `
        <div #container [ngStyle]="style" [class]="styleClass"
                [ngClass]="{'ui-treetable ui-widget': true, 'ui-table-auto-layout': autoLayout}">
            <div *ngIf="captionTemplate" class="ui-treetable-caption ui-widget-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <div class="ui-treetable-wrapper" *ngIf="!scrollable">
                <table #table class="ui-treetable-table">
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="ui-treetable-thead">
                        <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: columns}"></ng-container>
                    </thead>
                    <tfoot class="ui-treetable-tfoot">
                        <ng-container *ngTemplateOutlet="footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                    <tbody class="ui-treetable-tbody" [pTreeTableBody]="columns" [pTreeTableBodyTemplate]="bodyTemplate"></tbody>
                </table>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class TreeTable implements AfterContentInit{

    @Input() columns: any[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() autoLayout: boolean;

    @Input() scrollable: boolean;

    @Input() rowTrackBy: Function = (index: number, item: any) => item;

    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    _value: TreeNode[] = [];

    serializedValue: any[];

    colGroupTemplate: TemplateRef<any>;

    captionTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    bodyTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    emptyMessageTemplate: TemplateRef<any>;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'caption':
                    this.captionTemplate = item.template;
                break;

                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'body':
                    this.bodyTemplate = item.template;
                break;

                case 'footer':
                    this.footerTemplate = item.template;
                break;

                case 'emptymessage':
                    this.emptyMessageTemplate = item.template;
                break;
            }
        });
    }

    @Input() get value(): any[] {
        return this._value;
    }
    set value(val: any[]) {
        this._value = val;
        this.updateSerializedValue();
    }

    updateSerializedValue() {
        this.serializedValue = [];
        this.serializeNodes(null, this.value, 0);
    }

    serializeNodes(parent, nodes, level) {
        if(nodes && nodes.length) {
            for(let node of nodes) {
                this.serializedValue.push({
                    node: node,
                    parent: parent,
                    level: level
                });

                this.serializeNodes(node, node.children, level + 1);
            }
        }
    }

    isEmpty() {
        return this.value == null || this.value.length == 0;
    }
}

@Component({
    selector: '[pTreeTableBody]',
    template: `
        <ng-template ngFor let-serializedNode let-rowIndex="index" [ngForOf]="tt.serializedValue" [ngForTrackBy]="tt.rowTrackBy">
            <ng-container *ngIf="!serializedNode.parent || serializedNode.parent.expanded">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: serializedNode, rowData: serializedNode.node.data, columns: columns}"></ng-container>
            </ng-container>
        </ng-template>
        <ng-container *ngIf="tt.isEmpty()">
            <ng-container *ngTemplateOutlet="tt.emptyMessageTemplate; context: {$implicit: columns}"></ng-container>
        </ng-container>
    `
})
export class TreeTableBody {

    @Input("pTreeTableBody") columns: any[];

    @Input("pTreeTableBodyTemplate") template: TemplateRef<any>;

    constructor(public tt: TreeTable) {}
}

@Component({
    selector: 'p-treeTableToggler',
    template: `
        <a href="#" (click)="onClick($event)" [style.visibility]="rowNode.node.children && rowNode.node.children.length ? 'visible' : 'hidden'" [style.marginLeft]="rowNode.level * 16 + 'px'">
            <i [ngClass]="rowNode.node.expanded ? 'fa fa-fw fa-chevron-circle-down' : 'fa fa-fw fa-chevron-circle-right'"></i>
        </a>
    `
})
export class TreeTableToggler {

    @Input() rowNode: any;

    constructor(public tt: TreeTable) {}

    onClick(event: Event) {
        this.rowNode.node.expanded = !this.rowNode.node.expanded;

        if(this.rowNode.node.expanded) {
            this.tt.onNodeExpand.emit({
                originalEvent: event,
                node: this.rowNode.node
            })
        }
        event.preventDefault();
    }
}



@NgModule({
    imports: [CommonModule],
    exports: [TreeTable,TreeTableToggler],
    declarations: [TreeTable,TreeTableBody,TreeTableToggler]
})
export class TreeTableModule { }