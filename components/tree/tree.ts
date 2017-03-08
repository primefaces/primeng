import {NgModule,Component,Input,AfterContentInit,Output,EventEmitter,OnInit,OnDestroy,EmbeddedViewRef,ViewContainerRef,
    ContentChildren,QueryList,TemplateRef,Inject,forwardRef,Host} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeNode} from '../common/api';
import {SharedModule} from '../common/shared';
import {PrimeTemplate} from '../common/shared';
import {TreeDragDropService} from '../common/api';

@Component({
    selector: 'p-treeNodeTemplateLoader',
    template: ``
})
export class TreeNodeTemplateLoader implements OnInit, OnDestroy {
        
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
    selector: 'p-treeNode',
    template: `
        <ng-template [ngIf]="node">
            <li *ngIf="tree.droppableNodes" class="ui-treenode-droppoint" [ngClass]="{'ui-treenode-droppoint-active ui-state-highlight':draghoverPrev}"
            (drop)="onDropPoint($event,-1)" (dragover)="onDropPointDragOver($event)" (dragenter)="onDropPointDragEnter($event,-1)" (dragleave)="onDropPointDragLeave($event)"></li>
            <li class="ui-treenode {{node.styleClass}}" *ngIf="!tree.horizontal" [ngClass]="{'ui-treenode-leaf': isLeaf()}">
                <div class="ui-treenode-content" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)" (touchend)="onNodeTouchEnd()"
                    (drop)="onDropNode($event)" (dragover)="onDropNodeDragOver($event)" (dragenter)="onDropNodeDragEnter($event)" (dragleave)="onDropNodeDragLeave($event)"
                    [ngClass]="{'ui-treenode-selectable':tree.selectionMode,'ui-treenode-dragover':draghoverNode}" [draggable]="tree.draggableNodes" (dragstart)="onDragStart($event)" (dragend)="onDragStop($event)">
                    <span class="ui-tree-toggler  fa fa-fw" [ngClass]="{'fa-caret-right':!node.expanded,'fa-caret-down':node.expanded}"
                            (click)="toggle($event)"></span
                    ><div class="ui-chkbox" *ngIf="tree.selectionMode == 'checkbox'"><div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default">
                        <span class="ui-chkbox-icon ui-c fa" 
                            [ngClass]="{'fa-check':isSelected(),'fa-minus':node.partialSelected}"></span></div></div
                    ><span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span
                    ><span class="ui-treenode-label ui-corner-all" 
                        [ngClass]="{'ui-state-highlight':isSelected()}">
                            <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                            <span *ngIf="tree.getTemplateForNode(node)">
                                <p-treeNodeTemplateLoader [node]="node" [template]="tree.getTemplateForNode(node)"></p-treeNodeTemplateLoader>
                            </span>
                    </span>
                </div>
                <ul class="ui-treenode-children" style="display: none;" *ngIf="node.children && node.expanded" [style.display]="node.expanded ? 'block' : 'none'">
                    <p-treeNode *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last; let index=index" [node]="childNode" [parentNode]="node"
                        [firstChild]="firstChild" [lastChild]="lastChild" [index]="index"></p-treeNode>
                </ul>
            </li>
            <li *ngIf="tree.droppableNodes&&lastChild" class="ui-treenode-droppoint" [ngClass]="{'ui-treenode-droppoint-active ui-state-highlight':draghoverNext}"
            (drop)="onDropPoint($event,1)" (dragover)="onDropPointDragOver($event)" (dragenter)="onDropPointDragEnter($event,1)" (dragleave)="onDropPointDragLeave($event)"></li>
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
                                [ngClass]="{'ui-treenode-selectable':tree.selectionMode,'ui-state-highlight':isSelected()}" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)"
                                (touchend)="onNodeTouchEnd()">
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
                        <td class="ui-treenode-children-container" *ngIf="node.children && node.expanded" [style.display]="node.expanded ? 'table-cell' : 'none'">
                            <div class="ui-treenode-children">
                                <p-treeNode *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last;" [node]="childNode" 
                                        [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    `
})
export class UITreeNode implements OnInit {

    static ICON_CLASS: string = 'ui-treenode-icon fa fa-fw';

    @Input() node: TreeNode;
    
    @Input() parentNode: TreeNode;
    
    @Input() root: boolean;
    
    @Input() index: number;
    
    @Input() firstChild: boolean;
    
    @Input() lastChild: boolean;
        
    constructor(@Inject(forwardRef(() => Tree)) public tree:Tree) {}
    
    draghoverPrev: boolean;
    
    draghoverNext: boolean;
    
    draghoverNode: boolean
    
    ngOnInit() {
        this.node.parent = this.parentNode;
    }
        
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
    
    onNodeTouchEnd() {
        this.tree.onNodeTouchEnd();
    }
    
    onNodeRightClick(event: MouseEvent) {
        this.tree.onNodeRightClick(event, this.node);
    }
    
    isSelected() {
        return this.tree.isSelected(this.node);
    }
    
    onDropPoint(event: Event, position: number) {
        event.preventDefault();
        let dragNode = this.tree.dragNode;
        let dragNodeIndex = this.tree.dragNodeIndex;

        if(this.allowDrop(dragNode, this.node) && dragNode !== this.node && (position === 1 || dragNodeIndex !== this.index - 1)) {
            let newNodeList = this.node.parent ? this.node.parent.children : this.tree.value;
            this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
            if(position < 0)
                newNodeList.splice(this.index, 0, dragNode);
            else
                newNodeList.push(dragNode);
            
            this.tree.dragDropService.stopDrag({
                node: dragNode,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: dragNodeIndex
            });
        }
        
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }
    
    onDropPointDragOver(event) {
        event.preventDefault();
    }
    
    onDropPointDragEnter(event: Event, position: number) {
        if(this.allowDrop(this.tree.dragNode, this.node)) {
            if(position < 0)
                this.draghoverPrev = true;
            else
                this.draghoverNext = true;
        }
    }
    
    onDropPointDragLeave(event: Event) {
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }
    
    onDragStart(event) {
        if(this.tree.draggableNodes) {
            event.dataTransfer.setData("text", "data");
            
            this.tree.dragDropService.startDrag({
                node: this.node,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: this.index
            });
        }
    }
    
    onDragStop(event) {
        this.tree.dragDropService.stopDrag({
            node: this.node,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: this.index
        });
    }
    
    onDropNodeDragOver(event) {
        if(this.tree.droppableNodes) {
            event.preventDefault();
        }
    }
    
    onDropNode(event) {
        if(this.tree.droppableNodes) {
            event.preventDefault();
            let dragNode = this.tree.dragNode;
            if(this.allowDrop(dragNode, this.node)) {
                let dragNodeIndex = this.tree.dragNodeIndex;            
                this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
                
                if(this.node.children)
                    this.node.children.push(dragNode);
                else
                    this.node.children = [dragNode];
                
                this.tree.dragDropService.stopDrag({
                    node: dragNode,
                    subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                    index: this.tree.dragNodeIndex
                });
            }
            
            this.draghoverNode = false;
        }
    }
    
    onDropNodeDragEnter(event) {
        if(this.tree.droppableNodes && this.allowDrop(this.tree.dragNode, this.node)) {
            this.draghoverNode = true;
        }
    }
    
    onDropNodeDragLeave(event) {
        if(this.tree.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if(event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
               this.draghoverNode = false;
            }
        }
    }
    
    allowDrop(dragNode: TreeNode, dropNode: TreeNode): boolean {
        let allow: boolean = true;
        if(dragNode === dropNode) {
            allow = false;
        }
        else {
            let parent = dropNode.parent;
            while(parent != null) {
                if(parent === dragNode) {
                    allow = false;
                    break;
                }
                parent = parent.parent;
            }
        }
        
        return allow;
    }
}

@Component({
    selector: 'p-tree',
    template: `
        <div [ngClass]="{'ui-tree ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode}" [ngStyle]="style" [class]="styleClass" *ngIf="!horizontal">
            <ul class="ui-tree-container">
                <p-treeNode *ngFor="let node of value;let firstChild=first;let lastChild=last; let index=index" [node]="node" 
                [firstChild]="firstChild" [lastChild]="lastChild" [index]="index"></p-treeNode>
            </ul>
        </div>
        <div [ngClass]="{'ui-tree ui-tree-horizontal ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode}"  [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <table *ngIf="value&&value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
        </div>
    `
})
export class Tree implements OnInit,AfterContentInit {

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
        
    @Input() draggableNodes: boolean;
    
    @Input() droppableNodes: boolean;
    
    @Input() metaKeySelection: boolean = true;
        
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public templateMap: any;
    
    public nodeTouched: boolean;
    
    public dragNode: TreeNode;
    
    public dragNodeSubNodes: TreeNode[];
    
    public dragNodeIndex: number;
    
    constructor(public dragDropService: TreeDragDropService) {}
    
    ngOnInit() {
        if(this.droppableNodes) {
            this.dragDropService.dragStart$.subscribe(
              event => {
                this.dragNode = event.node;
                this.dragNodeSubNodes = event.subNodes;
                this.dragNodeIndex = event.index;
            });
            
            this.dragDropService.dragStop$.subscribe(
              event => {
                this.dragNode = null;
                this.dragNodeSubNodes = null;
                this.dragNodeIndex = null;
            });
        }     
    }
    
    get horizontal(): boolean {
        return this.layout == 'horizontal';
    }
    
    ngAfterContentInit() {
        if(this.templates.length) {
            this.templateMap = {};
        }
        
        this.templates.forEach((item) => {
            this.templateMap[item.getType()] = item.template;
        });
    }
         
    onNodeClick(event: MouseEvent, node: TreeNode) {
        let eventTarget = (<Element> event.target);
        
        if(eventTarget.className && eventTarget.className.indexOf('ui-tree-toggler') === 0) {
            return;
        }
        else {
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
                   
            if(this.isCheckboxSelectionMode()) {
                if(selected) {
                    this.propagateSelectionDown(node, false);
                    if(node.parent) {
                        this.propagateSelectionUp(node.parent, false);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({originalEvent: event, node: node});
                }
                else {
                    this.propagateSelectionDown(node, true);
                    if(node.parent) {
                        this.propagateSelectionUp(node.parent, true);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({originalEvent: event, node: node});
                }
            }
            else {
                let metaSelection = this.nodeTouched ? false : this.metaKeySelection;
                
                if(metaSelection) {
                    let metaKey = (event.metaKey||event.ctrlKey);
                    
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
                else {
                    if(this.isSingleSelectionMode()) {
                        if(selected) {
                            this.selection = null;
                            this.onNodeUnselect.emit({originalEvent: event, node: node});
                        }
                        else {
                            this.selection = node;
                            this.onNodeSelect.emit({originalEvent: event, node: node});
                        }
                    }
                    else {
                        if(selected) {
                            this.selection.splice(index,1);
                            this.onNodeUnselect.emit({originalEvent: event, node: node});
                        }
                        else {
                            this.selection = this.selection||[];
                            this.selection.push(node);
                            this.onNodeSelect.emit({originalEvent: event, node: node});
                        }
                    }
                    
                    this.selectionChange.emit(this.selection);
                }
            }
        }
        
        this.nodeTouched = false;
    }
    
    onNodeTouchEnd() {
        this.nodeTouched = true;
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
            else {
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
    
    propagateSelectionUp(node: TreeNode, select: boolean) {
        if(node.children && node.children.length) {
            let selectedCount: number = 0;
            let childPartialSelected: boolean = false;
            for(let child of node.children) {
                if(this.isSelected(child)) {
                    selectedCount++;
                }
                else if(child.partialSelected) {
                    childPartialSelected = true;
                }
            }
            
            if(select && selectedCount == node.children.length) {
                this.selection = this.selection||[];
                this.selection.push(node);
                node.partialSelected = false;
            }
            else {                
                if(!select) {
                    let index = this.findIndexInSelection(node);
                    if(index >= 0) {
                        this.selection.splice(index, 1);
                    }
                }
                
                if(childPartialSelected || selectedCount > 0 && selectedCount != node.children.length)
                    node.partialSelected = true;
                else
                    node.partialSelected = false;
            }
        }
                
        let parent = node.parent;
        if(parent) {
            this.propagateSelectionUp(parent, select);
        }
    }
    
    propagateSelectionDown(node: TreeNode, select: boolean) {
        let index = this.findIndexInSelection(node);
        
        if(select && index == -1) {
            this.selection = this.selection||[];
            this.selection.push(node);
        }
        else if(!select && index > -1) {
            this.selection.splice(index, 1);
        }
        
        node.partialSelected = false;
        
        if(node.children && node.children.length) {
            for(let child of node.children) {
                this.propagateSelectionDown(child, select);
            }
        }
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
    
    isCheckboxSelectionMode() {
        return this.selectionMode && this.selectionMode == 'checkbox';
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
