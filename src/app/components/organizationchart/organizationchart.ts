import {NgModule,Component,ElementRef,Input,Output,OnInit,AfterContentInit,OnDestroy,EventEmitter,TemplateRef,EmbeddedViewRef,ViewContainerRef,
        Inject,forwardRef,ContentChildren,QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {SharedModule} from '../common/shared';
import {TreeNode} from '../common/treenode';
import {PrimeTemplate} from '../common/shared';

@Component({
    selector: 'p-organizationChartNodeTemplateLoader',
    template: ``
})
export class OrganizationChartNodeTemplateLoader implements OnInit, OnDestroy {
        
    @Input() node: any;
    
    @Input() template: TemplateRef<any>;
    
    view: EmbeddedViewRef<any>;
        
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.node
        });
    }
    
    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: '[pOrganizationChartNode]',
    template: `
        <tr>
            <td [attr.colspan]="colspan">
                <div class="ui-organizationchart-node-content ui-widget-content ui-corner-all">
                    <span *ngIf="!chart.getTemplateForNode(node)">{{node.label}} - {{leaf}}</span>
                    <span *ngIf="chart.getTemplateForNode(node)">
                        <p-organizationChartNodeTemplateLoader [node]="node" [template]="chart.getTemplateForNode(node)"></p-organizationChartNodeTemplateLoader>
                    </span>
                </div>
            </td>
        </tr>
        <tr *ngIf="!leaf" class="ui-organizationchart-lines">
            <td [attr.colspan]="colspan">
                <div class="ui-organizationchart-line-down"></div>
            </td>
        </tr>
        <tr *ngIf="!leaf" class="ui-organizationchart-lines">
            <ng-template ngFor let-child [ngForOf]="node.children" let-first="first" let-last="last">
                <td class="ui-organizationchart-line-left" [ngClass]="{'ui-organizationchart-line-top':!first}">&nbsp;</td>
                <td class="ui-organizationchart-line-right" [ngClass]="{'ui-organizationchart-line-top':!last}">&nbsp;</td>
            </ng-template>
        </tr>
        <tr *ngIf="!leaf" class="ui-organizationchart-nodes">
            <td *ngFor="let child of node.children" colspan="2">
                <table class="ui-organizationchart-table" pOrganizationChartNode [node]="child"></table>
            </td>
        </tr>
    `
})
export class OrganizationChartNode {

    @Input() node: TreeNode;
        
    @Input() root: boolean;
    
    @Input() first: boolean;
    
    @Input() last: boolean;
        
    constructor(@Inject(forwardRef(() => OrganizationChart)) public chart:OrganizationChart) {}
                
    get leaf(): boolean {
        return this.node.leaf == false ? false : !(this.node.children&&this.node.children.length);
    }
    
    get colspan() {
        return (this.node.children && this.node.children.length) ? this.node.children.length * 2: null;
    }
}

@Component({
    selector: 'p-organizationChart',
    template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="'ui-organizationchart ui-widget'">
            <table class="ui-organizationchart-table" pOrganizationChartNode [node]="root"></table>
        </div>
    `,
    providers: [DomHandler]
})
export class OrganizationChart implements AfterContentInit {
            
    @Input() value: TreeNode[];            

    @Input() style: any;

    @Input() styleClass: string;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public templateMap: any;
    
    constructor(public el: ElementRef, public domHandler: DomHandler) {}
    
    get root(): TreeNode {
        return this.value && this.value.length ? this.value[0] : null;
    }
    
    ngAfterContentInit() {
        if(this.templates.length) {
            this.templateMap = {};
        }
        
        this.templates.forEach((item) => {
            this.templateMap[item.getType()] = item.template;
        });
    }
    
    getTemplateForNode(node: TreeNode): TemplateRef<any> {
        if(this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [OrganizationChart,SharedModule],
    declarations: [OrganizationChart,OrganizationChartNode,OrganizationChartNodeTemplateLoader]
})
export class OrganizationChartModule { }