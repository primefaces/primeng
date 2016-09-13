import {NgModule,Component,Input,AfterContentInit,Output,EventEmitter,OnInit,ViewContainerRef,ContentChildren,QueryList,TemplateRef,Inject,forwardRef,Host} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeNode} from '../common/api';
import {PrimeTemplate} from '../common/shared';

@Component({
    selector: 'p-treeNodeTemplateLoader',
    template: ``
})
export class TreeNodeTemplateLoader implements OnInit {
        
    @Input() node: any;
    
    @Input() template: TemplateRef<any>;
        
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.node
        });
    }
}

@Component({
    selector: 'p-treeNode',
    template: `
        <li class="ui-treenode" *ngIf="node">
            <div class="ui-treenode-content" [ngClass]="{'ui-treenode-selectable': tree.selectionMode}" 
                (mouseenter)="hover=true" (mouseleave)="hover=false" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)">
                <span class="ui-tree-toggler fa fa-fw" [ngClass]="{'fa-caret-right':!expanded,'fa-caret-down':expanded}" *ngIf="!isLeaf()"
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
            <ul class="ui-treenode-children" style="display: none;" *ngIf="node.children" [style.display]="expanded ? 'block' : 'none'">
                <p-treeNode *ngFor="let childNode of node.children" [node]="childNode"></p-treeNode>
            </ul>
        </li>
    `
})
export class UITreeNode {

    static ICON_CLASS: string = 'ui-treenode-icon fa fa-fw';

    @Input() node: TreeNode;
        
    hover: boolean = false;
        
    expanded: boolean = false;
    
    constructor(@Inject(forwardRef(() => Tree)) protected tree:Tree) {}
        
    getIcon() {
        let icon;
        if(this.node.icon)
            icon = this.node.icon;
        else
            icon = this.expanded ? this.node.expandedIcon : this.node.collapsedIcon;
        
        return UITreeNode.ICON_CLASS + ' ' + icon;
    }
    
    isLeaf() {
        return this.node.leaf == false ? false : !(this.node.children&&this.node.children.length);
    }
    
    toggle(event) {
        if(this.expanded)
            this.tree.onNodeCollapse.emit({originalEvent: event, node: this.node});
        else
            this.tree.onNodeExpand.emit({originalEvent: event, node: this.node});

        this.expanded = !this.expanded
    }
    
    onNodeClick(event) {
        this.tree.onNodeClick(event, this.node);
    }
    
    onNodeRightClick(event) {
        this.tree.onNodeRightClick(event, this.node);
    }
    
    isSelected() {
        return this.tree.isSelected(this.node);
    }
}

@Component({
    selector: 'p-tree',
    template: `
        <div [ngClass]="'ui-tree ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <ul class="ui-tree-container">
                <p-treeNode *ngFor="let node of value" [node]="node"></p-treeNode>
            </ul>
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
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    protected templateMap: any;
    
    ngAfterContentInit() {
        if(this.templates.length) {
            this.templateMap = {};
        }
        
        this.templates.forEach((item) => {
            this.templateMap[item.type] = item.template;
        });
    }
     
    onNodeClick(event, node: TreeNode) {
        if(event.target.className&&event.target.className.indexOf('ui-tree-toggler') === 0) {
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
                    this.selection = (!event.metaKey) ? [] : this.selection||[];
                    this.selection.push(node);
                    this.selectionChange.emit(this.selection);
                }

                this.onNodeSelect.emit({originalEvent: event, node: node});
            }
        }
    }
    
    onNodeRightClick(event, node: TreeNode) {
        if(this.contextMenu) {
            if(event.target.className&&event.target.className.indexOf('ui-tree-toggler') === 0) {
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
    
    getTemplateForNode(node: TreeNode): TemplateRef<any> {
        if(this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    }
}


@NgModule({
    imports: [CommonModule],
    exports: [Tree],
    declarations: [Tree,UITreeNode,TreeNodeTemplateLoader]
})
export class TreeModule { }