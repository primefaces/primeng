import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {TreeNode} from '../api/treenode';

@Component({
    selector: 'p-treeNode',
    template: `
        <li class="ui-treenode" *ngIf="node">
            <span class="ui-treenode-content">
                <span class="ui-tree-toggler fa fa-fw" [ngClass]="{'fa-caret-right':!expanded,'fa-caret-down':expanded}" *ngIf="!isLeaf()"
                        (click)="toggle($event)"></span
                ><span class="ui-treenode-leaf-icon" *ngIf="isLeaf()"></span
                ><span [attr.class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span
                ><span class="ui-treenode-label ui-corner-all">{{node.label}}</span>
            </span>
            <ul class="ui-treenode-children" style="display: none;" *ngIf="node.children" [style.display]="expanded ? 'block' : 'none'">
                <p-treeNode *ngFor="#childNode of node.children" [node]="childNode"></p-treeNode>
            </ul>
        </li>
    `,
    directives: [UITreeNode]
})
export class UITreeNode {

    static ICON_CLASS: string = 'ui-treenode-icon fa fa-fw';

    @Input() node: TreeNode;
    
    expanded: boolean = false;
        
    getIcon() {
        let icon;
        if(this.node.icon)
            icon = this.node.icon;
        else
            icon = this.expanded ? this.node.expandedIcon : this.node.collapsedIcon;
        
        return UITreeNode.ICON_CLASS + ' ' + icon;
    }
    
    isLeaf() {
        return !(this.node.children&&this.node.children.length);
    }
    
    toggle(event) {
        this.expanded = !this.expanded
    }
}