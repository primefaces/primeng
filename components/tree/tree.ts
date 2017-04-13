import {NgModule,Component,Input,AfterContentInit,OnDestroy,Output,EventEmitter,OnInit,EmbeddedViewRef,ViewContainerRef,
    ContentChildren,QueryList,TemplateRef,Inject,forwardRef,Host} from '@angular/core';
import {Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeNode} from '../common/api';
import {SharedModule} from '../common/shared';
import {PrimeTemplate} from '../common/shared';
import {TreeDragDropService} from '../common/api';
import {Subscription}   from 'rxjs/Subscription';

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
                    [ngClass]="{'ui-treenode-selectable':tree.selectionMode && node.selectable !== false,'ui-treenode-dragover':draghoverNode}" [draggable]="tree.draggableNodes" (dragstart)="onDragStart($event)" (dragend)="onDragStop($event)">
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
            icon = this.node.expanded && this.node.children && this.node.children.length ? this.node.expandedIcon : this.node.collapsedIcon;
        
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
        let dragNodeScope = this.tree.dragNodeScope;
        let isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? (position === 1 || dragNodeIndex !== this.index - 1) : true;

        if(this.tree.allowDrop(dragNode, this.node, dragNodeScope) && isValidDropPointIndex) {
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
            
            this.tree.onNodeDrop.emit({
                originalEvent: event,
                dragNode: dragNode
            });
        }
        
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }
    
    onDropPointDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }
    
    onDropPointDragEnter(event: Event, position: number) {
        if(this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
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
        if(this.tree.draggableNodes && this.node.draggable !== false) {
            event.dataTransfer.setData("text", "data");
            
            this.tree.dragDropService.startDrag({
                tree: this,
                node: this.node,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: this.index,
                scope: this.tree.draggableScope
            });
        }
        else {
            event.preventDefault();
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
        event.dataTransfer.dropEffect = 'move';
        if(this.tree.droppableNodes) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    
    onDropNode(event) {
        if(this.tree.droppableNodes && this.node.droppable !== false) {
            event.preventDefault();
            event.stopPropagation();
            let dragNode = this.tree.dragNode;
            if(this.tree.allowDrop(dragNode, this.node, this.tree.dragNodeScope)) {
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
                
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node
                });
            }
        }
        
        this.draghoverNode = false;
    }
    
    onDropNodeDragEnter(event) {
        if(this.tree.droppableNodes && this.node.droppable !== false && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            this.draghoverNode = true;
        }
    }
    
    onDropNodeDragLeave(event) {
        if(this.tree.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if(event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
               this.draghoverNode = false;
            }
        }
    }
}

@Component({
    selector: 'p-tree',
    template: `
        <div [ngClass]="{'ui-tree ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode,'ui-treenode-dragover':dragHover}" [ngStyle]="style" [class]="styleClass" *ngIf="!horizontal"
            (drop)="onDrop($event)" (dragover)="onDragOver($event)" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)">
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
export class Tree implements OnInit,AfterContentInit,OnDestroy {

    @Input() value: TreeNode[];
        
    @Input() selectionMode: string;
    
    @Input() selection: any;
    
    @Output() selectionChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeContextMenuSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeDrop: EventEmitter<any> = new EventEmitter();
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() contextMenu: any;
    
    @Input() layout: string = 'vertical';
    
    @Input() draggableScope: any;
    
    @Input() droppableScope: any;
        
    @Input() draggableNodes: boolean;
    
    @Input() droppableNodes: boolean;
    
    @Input() metaKeySelection: boolean = true;
    
    @Input() propagateSelectionUp: boolean = true;
    
    @Input() propagateSelectionDown: boolean = true;
        
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public templateMap: any;
    
    public nodeTouched: boolean;
    
    public dragNodeTree: Tree;
    
    public dragNode: TreeNode;
    
    public dragNodeSubNodes: TreeNode[];
    
    public dragNodeIndex: number;
    
    public dragNodeScope: any;
    
    public dragHover: boolean;
    
    public dragStartSubscription: Subscription;
    
    public dragStopSubscription: Subscription;
    
    constructor(@Optional() public dragDropService: TreeDragDropService) {}
    
    ngOnInit() {
        if(this.droppableNodes) {
            this.dragStartSubscription = this.dragDropService.dragStart$.subscribe(
              event => {
                this.dragNodeTree = event.tree;
                this.dragNode = event.node;
                this.dragNodeSubNodes = event.subNodes;
                this.dragNodeIndex = event.index;
                this.dragNodeScope = event.scope;
            });
            
            this.dragStopSubscription = this.dragDropService.dragStop$.subscribe(
              event => {
                this.dragNodeTree = null;
                this.dragNode = null;
                this.dragNodeSubNodes = null;
                this.dragNodeIndex = null;
                this.dragNodeScope = null;
                this.dragHover = false;
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
        else if(this.selectionMode) {
            if(node.selectable === false) {
                return;
            }
            
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
                   
            if(this.isCheckboxSelectionMode()) {
                if(selected) {
                    if(this.propagateSelectionDown)
                        this.propagateDown(node, false);
                    else
                        this.selection = this.selection.filter((val,i) => i!=index);
                    
                    if(this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, false);
                    }
                    
                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({originalEvent: event, node: node});
                }
                else {
                    if(this.propagateSelectionDown)
                        this.propagateDown(node, true);
                    else
                        this.selection = [...this.selection||[],node];
                    
                    if(this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, true);
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
                            this.selection = this.selection.filter((val,i) => i!=index);
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
                            this.selection = [...this.selection,node];
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
                            this.selection = this.selection.filter((val,i) => i!=index);
                            this.onNodeUnselect.emit({originalEvent: event, node: node});
                        }
                        else {
                            this.selection = [...this.selection||[],node];
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
    
    propagateUp(node: TreeNode, select: boolean) {
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
                this.selection = [...this.selection||[],node];
                node.partialSelected = false;
            }
            else {                
                if(!select) {
                    let index = this.findIndexInSelection(node);
                    if(index >= 0) {
                        this.selection = this.selection.filter((val,i) => i!=index);
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
            this.propagateUp(parent, select);
        }
    }
    
    propagateDown(node: TreeNode, select: boolean) {
        let index = this.findIndexInSelection(node);
        
        if(select && index == -1) {
            this.selection = [...this.selection||[],node];
        }
        else if(!select && index > -1) {
            this.selection = this.selection.filter((val,i) => i!=index);
        }
        
        node.partialSelected = false;
        
        if(node.children && node.children.length) {
            for(let child of node.children) {
                this.propagateDown(child, select);
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
    
    onDragOver(event) {
        if(this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.dataTransfer.dropEffect = 'move';
            event.preventDefault();
        }
    }
    
    onDrop(event) {
        if(this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.preventDefault();
            let dragNode = this.dragNode;
            if(this.allowDrop(dragNode, null, this.dragNodeScope)) {
                let dragNodeIndex = this.dragNodeIndex;            
                this.dragNodeSubNodes.splice(dragNodeIndex, 1);
                this.value = this.value||[];
                this.value.push(dragNode);
                
                this.dragDropService.stopDrag({
                    node: dragNode
                });
            }
        }
    }
    
    onDragEnter(event) {
        if(this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
            this.dragHover = true;
        }
    }
    
    onDragLeave(event) {
        if(this.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if(event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
               this.dragHover = false;
            }
        }
    }
    
    allowDrop(dragNode: TreeNode, dropNode: TreeNode, dragNodeScope: any): boolean {
        if(this.isValidDragScope(dragNodeScope)) {
            let allow: boolean = true;
            if(dropNode) {
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
            }
            
            return allow;
        }
        else {
            return false;
        }
    }
    
    isValidDragScope(dragScope: any): boolean {
        let dropScope = this.droppableScope;
        
        if(dropScope) {
            if(typeof dropScope === 'string') {
                if(typeof dragScope === 'string')
                    return dropScope === dragScope;
                else if(dragScope instanceof Array)
                    return (<Array<any>>dragScope).indexOf(dropScope) != -1;
            }
            else if(dropScope instanceof Array) {
                if(typeof dragScope === 'string') {
                    return (<Array<any>>dropScope).indexOf(dragScope) != -1;
                }
                else if(dragScope instanceof Array) {
                    for(let s of dropScope) {
                        for(let ds of dragScope) {
                            if(s === ds) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    }
    
    ngOnDestroy() {
        if(this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }
        
        if(this.dragStopSubscription) {
            this.dragStopSubscription.unsubscribe();
        }
    }
}
@NgModule({
    imports: [CommonModule],
    exports: [Tree,SharedModule],
    declarations: [Tree,UITreeNode,TreeNodeTemplateLoader]
})
export class TreeModule { }
