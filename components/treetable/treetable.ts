import {Component,Input,Output,EventEmitter,ElementRef,ContentChild,IterableDiffers,ContentChildren,QueryList} from 'angular2/core';
import {TreeNode} from '../api/treenode';
import {UITreeRow} from './uitreerow';
import {Column} from '../column/column';
import {DomHandler} from '../dom/domhandler';
import {Header} from '../common/header';
import {Footer} from '../common/footer';

@Component({
    selector: 'p-treeTable',
    template: `
        <div [ngClass]="'ui-treetable ui-widget'" [attr.style]="style" [attr.class]="styleClass">
            <div class="ui-datatable-header ui-widget-header" *ngIf="header">
                <ng-content select="header"></ng-content>
            </div>
            <div class="ui-treetable-tablewrapper">
                <div style="display:table;width:100%">
                    <div style="display:table-header-group">
                        <div style="display:table-row" class="ui-state-default">
                            <div #headerCell *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass" 
                                [ngStyle]="{'display':'table-cell'}" [ngClass]="'ui-state-default ui-unselectable-text'">
                                <span class="ui-column-title">{{col.header}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="display:table-row-group" pTreeRow *ngFor="#node of value" [node]="node"></div>
                </div>
            </div>
            <div class="ui-datatable-footer ui-widget-header" *ngIf="header">
                <ng-content select="footer"></ng-content>
            </div>
        </div>
    `,
    directives: [UITreeRow]
})
export class TreeTable {

    @Input() value: TreeNode[];
        
    @Input() selectionMode: string;
    
    @Input() selection: any;
    
    @Output() selectionChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();
    
    @Input() style: string;
        
    @Input() styleClass: string;
    
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @ContentChildren(Column) columns: QueryList<Column>;
        
    onNodeClick(event, node) {
        if(event.target.className&&event.target.className.indexOf('ui-tree-toggler') === 0) {
            return;
        }
        else {
            let metaKey = (event.metaKey||event.ctrlKey);
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
                   
            if(selected && metaKey) {
                if(this.isSingleSelectionMode()) {
                    this.selectionChange.next(null);
                }
                else {
                    this.selection.splice(index,1);
                    this.selectionChange.next(this.selection);
                }

                this.onNodeUnselect.next({originalEvent: event, node: node});
            }
            else {
                if(this.isSingleSelectionMode()) {
                    this.selectionChange.next(node);
                }
                else if(this.isMultipleSelectionMode()) {
                    this.selection = (!event.metaKey) ? [] : this.selection||[];
                    this.selection.push(node);
                    this.selectionChange.next(this.selection);
                }

                this.onNodeSelect.next({originalEvent: event, node: node});
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
}