import {NgModule,Component,Input,AfterContentInit,Output,EventEmitter,OnInit,ViewContainerRef,ContentChildren,QueryList,TemplateRef,Inject,forwardRef,Host} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeNode} from '../common/api';
import {SharedModule} from '../common/shared';
import {PrimeTemplate} from '../common/shared';

@Component({
    selector: 'p-treeNodeTemplateLoader',
    template: ``
})
export class TreeNodeTemplateLoader implements OnInit {
        
    @Input() node: any;
    
    @Input() template: TemplateRef<any>;
        
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.node
        });
    }
}

@Component({
    selector: 'p-treeNode',
    template: `
        <template [ngIf]="node">
            <li class="ui-treenode" *ngIf="!tree.horizontal">
                <div class="ui-treenode-content"
                    (mouseenter)="hover=true" (mouseleave)="hover=false" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)">
                    <span class="ui-tree-toggler fa fa-fw" [ngClass]="{'fa-caret-right':!node.expanded,'fa-caret-down':node.expanded}" *ngIf="!isLeaf()"
                            (click)="toggle($event)"></span
                    ><span class="ui-treenode-leaf-icon" *ngIf="isLeaf()"></span
                    ><span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span
                    ><span class="ui-treenode-label ui-corner-all" 
                        [ngClass]="{'ui-state-hover':hover&&tree.selectionMode,'ui-state-highlight':isSelected()}">
                            <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                            <span *ngIf="tree.getTemplateForNode(node)">
                                <p-treeNodeTemplateLoader [node]="node" [template]="tree.getTemplateForNode(node)"></p-treeNodeTemplateLoader>
                            </span>
                    </span>
                </div>
                <ul class="ui-treenode-children" style="display: none;" *ngIf="node.children" [style.display]="node.expanded ? 'block' : 'none'">
                    <p-treeNode *ngFor="let childNode of node.children" [node]="childNode"></p-treeNode>
                </ul>
            </li>
            <table *ngIf="tree.horizontal">
                <tbody>
                    <tr>
                        <td class="ui-treenode-connector" *ngIf="!root">
                            <table class="ui-treenode-connector-table">
                                <tbody>
                                    <tr>
                                        <td [ngClass]="{'ui-treenode-connector-line':!firstChild}"></td>
                                    </tr>
                                    <tr>
                                        <td [ngClass]="{'ui-treenode-connector-line':!lastChild}"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="ui-treenode" [ngClass]="{'ui-treenode-collapsed':!node.expanded}">
                            <div class="ui-treenode-content ui-state-default ui-corner-all" 
                                [ngClass]="{'ui-state-hover':hover&&tree.selectionMode,'ui-state-highlight':isSelected()}"
                                (mouseenter)="hover=true" (mouseleave)="hover=false" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)">
                                <span class="ui-tree-toggler fa fa-fw" [ngClass]="{'fa-plus':!node.expanded,'fa-minus':node.expanded}" *ngIf="!isLeaf()"
                                        (click)="toggle($event)"></span
                                ><span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span
                                ><span class="ui-treenode-label ui-corner-all">
                                        <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                                        <span *ngIf="tree.getTemplateForNode(node)">
                                            <p-treeNodeTemplateLoader [node]="node" [template]="tree.getTemplateForNode(node)"></p-treeNodeTemplateLoader>
                                        </span>
                                </span>
                            </div>
                        </td>
                        <td class="ui-treenode-children-container" *ngIf="node.children" [style.display]="node.expanded ? 'table-cell' : 'none'">
                            <div class="ui-treenode-children">
                                <p-treeNode *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last;" [node]="childNode" 
                                        [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
    `
})
export class UITreeNode {

    static ICON_CLASS: string = 'ui-treenode-icon fa fa-fw';

    @Input() node: TreeNode;
    
    @Input() root: boolean;
    
    @Input() firstChild: boolean;
    
    @Input() lastChild: boolean;
        
    hover: boolean = false;
        
    constructor(@Inject(forwardRef(() => Tree)) public tree:Tree) {}
        
    getIcon() {
        let icon: string;
        
        if(this.node.icon)
            icon = this.node.icon;
        else
            icon = this.node.expanded ? this.node.expandedIcon : this.node.collapsedIcon;
        
        return UITreeNode.ICON_CLASS + ' ' + icon;
    }
    
    isLeaf() {
        return this.node.leaf == false ? false : !(this.node.children&&this.node.children.length);
    }
    
    toggle(event: Event) {
        if(this.node.expanded)
            this.tree.onNodeCollapse.emit({originalEvent: event, node: this.node});
        else
            this.tree.onNodeExpand.emit({originalEvent: event, node: this.node});

        this.node.expanded = !this.node.expanded
    }
    
    onNodeClick(event: MouseEvent) {
        this.tree.onNodeClick(event, this.node);
    }
    
    onNodeRightClick(event: MouseEvent) {
        this.tree.onNodeRightClick(event, this.node);
    }
    
    isSelected() {
        return this.tree.isSelected(this.node);
    }
}

@Component({
    selector: 'p-tree',
    template: `
        <div [ngClass]="{'ui-tree ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode}" [ngStyle]="style" [class]="styleClass" *ngIf="!horizontal">
            <ul class="ui-tree-container">
                <p-treeNode *ngFor="let node of value" [node]="node"></p-treeNode>
            </ul>
        </div>
        <div [ngClass]="{'ui-tree ui-tree-horizontal ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode}"  [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <table *ngIf="value&&value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
        </div>
    `
})
export class Tree implements AfterContentInit {

    @Input() value: TreeNode[];
        
    @Input() selectionMode: string;
    
    @Input() selection: any;
    
    @Output() selectionChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeContextMenuSelect: EventEmitter<any> = new EventEmitter();
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() contextMenu: any;
    
    @Input() layout: string = 'vertical';
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public templateMap: any;
    
    get horizontal(): boolean {
        return this.layout == 'horizontal';
    }
    
    ngAfterContentInit() {
        if(this.templates.length) {
            this.templateMap = {};
        }
        
        this.templates.forEach((item) => {
            this.templateMap[item.type] = item.template;
        });
    }
         
    onNodeClick(event: MouseEvent, node: TreeNode) {
        let eventTarget = (<Element> event.target);
        
        if(eventTarget.className && eventTarget.className.indexOf('ui-tree-toggler') === 0) {
            return;
        }
        else {
            let metaKey = (event.metaKey||event.ctrlKey);
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
                   
            if(selected && metaKey) {
                if(this.isSingleSelectionMode()) {
                    this.selectionChange.emit(null);
                }
                else {
                    this.selection.splice(index,1);
                    this.selectionChange.emit(this.selection);
                }

                this.onNodeUnselect.emit({originalEvent: event, node: node});
            }
            else {
                if(this.isSingleSelectionMode()) {
                    this.selectionChange.emit(node);
                }
                else if(this.isMultipleSelectionMode()) {
                    this.selection = (!metaKey) ? [] : this.selection||[];
                    this.selection.push(node);
                    this.selectionChange.emit(this.selection);
                }

                this.onNodeSelect.emit({originalEvent: event, node: node});
            }
        }
    }
    
    onNodeRightClick(event: MouseEvent, node: TreeNode) {
        if(this.contextMenu) {
            let eventTarget = (<Element> event.target);
            
            if(eventTarget.className && eventTarget.className.indexOf('ui-tree-toggler') === 0) {
                return;
            }
            else {
                let index = this.findIndexInSelection(node);
                let selected = (index >= 0);
                
                if(!selected) {
                    if(this.isSingleSelectionMode())
                        this.selectionChange.emit(node);
                    else
                        this.selectionChange.emit([node]);
                }
                   
                this.contextMenu.show(event);
                this.onNodeContextMenuSelect.emit({originalEvent: event, node: node});
            }
        }
    }
    
    findIndexInSelection(node: TreeNode) {
        let index: number = -1;

        if(this.selectionMode && this.selection) {
            if(this.isSingleSelectionMode()) {
                index = (this.selection == node) ? 0 : - 1;
            }
            else if(this.isMultipleSelectionMode()) {
                for(let i = 0; i  < this.selection.length; i++) {
                    if(this.selection[i] == node) {
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
    
    isSingleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'single';
    }
    
    isMultipleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'multiple';
    }

    expandToNode(node: TreeNode): void {
        const pathToNode: TreeNode[] = this.findPathToNode(node);
        if(pathToNode) {
            pathToNode.forEach( node => node.expanded=true );
        }
    }

    findPathToNode(node: TreeNode): TreeNode[] {
        return Tree.findPathToNodeRecursive(node, this.value);
    }

    private static findPathToNodeRecursive(searchingFor: TreeNode, searchingIn: TreeNode[]): TreeNode[] {

        if(!searchingIn || searchingIn.length == 0){
            return undefined;
        }

        for(let i=0; i<searchingIn.length; i++){
            if(searchingFor == searchingIn[i]){
                return [ searchingIn[i] ];
            }
            const path: TreeNode[] = Tree.findPathToNodeRecursive( searchingFor, searchingIn[i].children );
            if(path) {
                path.unshift(searchingIn[i]);
                return path;
            }
        }

        return undefined;
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
    exports: [Tree,SharedModule],
    declarations: [Tree,UITreeNode,TreeNodeTemplateLoader]
})
export class TreeModule { }
