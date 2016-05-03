import {Component,Input,Output,EventEmitter,ElementRef,ContentChild,IterableDiffers,ContentChildren,QueryList} from '@angular/core';
import {TreeNode} from '../api/treenode';
import {UITreeRow} from './uitreerow';
import {Column} from '../column/column';
import {DomHandler} from '../dom/domhandler';
import {Header} from '../common/header';
import {Footer} from '../common/footer';

@Component({
    selector: 'p-treeTable',
    template: `
        <div [ngClass]="'ui-treetable ui-widget'" [attr.style]="style" [class]="styleClass">
            <div class="ui-treetable-header ui-widget-header" *ngIf="header">
                <ng-content select="header"></ng-content>
            </div>
            <div class="ui-treetable-tablewrapper">
                <table class="ui-widget-content" style="border:0 0 1px 0px">
                    <thead>
                        <tr class="ui-state-default">
                            <th #headerCell *ngFor="let col of columns" [attr.style]="col.style" [class]="col.styleClass" 
                                [ngClass]="'ui-state-default ui-unselectable-text'">
                                <span class="ui-column-title">{{col.header}}</span>
                            </th>
                        </tr>
                    </thead>
                    <tfoot *ngIf="hasFooter()">
                        <tr>
                            <td *ngFor="let col of columns" [attr.style]="col.style" [class]="col.styleClass" [ngClass]="{'ui-state-default':true}">{{col.footer}}</td>
                        </tr>
                    </tfoot>
                    <tbody pTreeRow *ngFor="let node of value" [node]="node" [level]="0"></tbody>
                </table>
            </div>
            <div class="ui-treetable-footer ui-widget-header" *ngIf="footer">
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
        
    onRowClick(event, node) {
        if(event.target.className&&event.target.className.indexOf('ui-treetable-toggler') === 0) {
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
    
    hasFooter() {
        if(this.columns) {
            let columnsArr = this.columns.toArray();
            for(let i = 0; i < columnsArr.length; i++) {
                if(columnsArr[i].footer) {
                    return true;
                }
            }
        }
        return false;
    }
}