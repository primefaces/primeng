import {Component,ElementRef,OnDestroy,DoCheck,Input,Output,ContentChild,TemplateRef,Renderer} from 'angular2/core';
import {Button} from '../button/button';
import {DomUtils} from '../utils/domutils';

@Component({
    selector: 'p-pickList',
    template: `
        <div [attr.class]="styleClass" [attr.style]="style" [ngClass]="{'ui-picklist ui-widget ui-helper-clearfix': true, 'ui-picklist-responsive': responsive}">
            <div class="ui-picklist-source-controls ui-picklist-buttons">
                <div class="ui-picklist-buttons-cell">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp(sourcelist,source)"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop(sourcelist,source)"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown(sourcelist,source)"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom(sourcelist,source)"></button>
                </div>
            </div>
            <div class="ui-picklist-listwrapper ui-picklist-source-wrapper">
                <div class="ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr" *ngIf="sourceHeader">{{sourceHeader}}</div>
                <ul #sourcelist class="ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom" [attr.style]="sourceStyle"
                    (mouseover)="onMouseover($event)" (mouseout)="onMouseout($event)" (click)="onClick($event)">
                    <template ngFor [ngForOf]="source" [ngForTemplate]="itemTemplate"></template>
                </ul>
            </div>
            <div class="ui-picklist-buttons">
                <div class="ui-picklist-buttons-cell">
                    <button type="button" pButton icon="fa-angle-right" (click)="moveRight(sourcelist)"></button>
                    <button type="button" pButton icon="fa-angle-double-right" (click)="moveAllRight(sourcelist)"></button>
                    <button type="button" pButton icon="fa-angle-left" (click)="moveLeft(targetlist)"></button>
                    <button type="button" pButton icon="fa-angle-double-left" (click)="moveAllLeft(targetlist)"></button>
                </div>
            </div>
            <div class="ui-picklist-listwrapper ui-picklist-target-wrapper">
                <div class="ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr" *ngIf="targetHeader">{{targetHeader}}</div>
                <ul #targetlist class="ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom" [attr.style]="targetStyle"
                    (mouseover)="onMouseover($event)" (mouseout)="onMouseout($event)" (click)="onClick($event)">
                    <template ngFor [ngForOf]="target" [ngForTemplate]="itemTemplate"></template>
                </ul>
            </div>
            <div class="ui-picklist-target-controls ui-picklist-buttons">
                <div class="ui-picklist-buttons-cell">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp(targetlist)"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop(targetlist)"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown(targetlist)"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom(targetlist)"></button>
                </div>
            </div>
        </div>
    `,
    directives: [Button]
})
export class PickList implements OnDestroy {

    @Input() source: any[];
    
    @Input() target: any[];
    
    @Input() sourceHeader: string;
        
    @Input() targetHeader: string;
    
    @Input() responsive: boolean;
    
    @Input() style: string;
        
    @Input() styleClass: string;
    
    @Input() sourceStyle: string;
    
    @Input() targetStyle: string;

    @ContentChild(TemplateRef) itemTemplate: TemplateRef;
                            
    constructor(private el: ElementRef, private renderer: Renderer) {}
    
    onMouseover(event) {
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            DomUtils.addClass(item, 'ui-state-hover');
        }
    }
    
    onMouseout(event) {
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            DomUtils.removeClass(item, 'ui-state-hover');
        }
    }
    
    onClick(event) {
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.onItemClick(event, item);
        }
    }
    
    findListItem(element) {
        if(element.nodeName == 'LI') {
            return element;
        }
        else {
            let parent = element.parentElement;
            while(parent.nodeName != 'LI') {
                parent = parent.parentElement;
            }
            return parent;
        }
    }
    
    onItemClick(event, item) {
        let metaKey = (event.metaKey||event.ctrlKey);
        
        if(DomUtils.hasClass(item, 'ui-state-highlight')) {
            if(metaKey) {
                DomUtils.removeClass(item, 'ui-state-highlight');
            }
        }
        else {
            if(!metaKey) {
                let siblings = DomUtils.siblings(item);
                for(let i = 0; i < siblings.length; i++) {
                    let sibling = siblings[i];
                    if(DomUtils.hasClass(sibling, 'ui-state-highlight')) {
                        DomUtils.removeClass(sibling, 'ui-state-highlight');
                    }
                }
            }
            
            DomUtils.removeClass(item, 'ui-state-hover');
            DomUtils.addClass(item, 'ui-state-highlight');
        }
    }
    
    moveUp(listElement, list) {
        let selectedElements = this.getSelectedListElements(listElement);
        for(let i = 0; i < selectedElements.length; i++) {
            let selectedElement = selectedElements[i];
            let selectedElementIndex: number = DomUtils.index(selectedElement);

            if(selectedElementIndex != 0) {
                let movedItem = list[selectedElementIndex];
                let temp = list[selectedElementIndex-1];
                list[selectedElementIndex-1] = movedItem;
                list[selectedElementIndex] = temp;
                DomUtils.scrollInView(listElement, this.getListElements(listElement)[selectedElementIndex - 1]);
            }
            else {
                break;
            }
        }
    }
    
    moveTop(listElement, list) {
        let selectedElements = this.getSelectedListElements(listElement);
        for(let i = 0; i < selectedElements.length; i++) {
            let selectedElement = selectedElements[i];
            let selectedElementIndex: number = DomUtils.index(selectedElement);

            if(selectedElementIndex != 0) {
                let movedItem = list.splice(selectedElementIndex,1)[0];
                list.unshift(movedItem);
                listElement.scrollTop = 0;
            }
            else {
                break;
            }
        }
    }
    
    moveDown(listElement, list) {
        let selectedElements = this.getSelectedListElements(listElement);
        for(let i = selectedElements.length - 1; i >= 0; i--) {
            let selectedElement = selectedElements[i];
            let selectedElementIndex: number = DomUtils.index(selectedElement);

            if(selectedElementIndex != (list.length - 1)) {
                let movedItem = list[selectedElementIndex];
                let temp = list[selectedElementIndex+1];
                list[selectedElementIndex+1] = movedItem;
                list[selectedElementIndex] = temp;
                DomUtils.scrollInView(listElement, this.getListElements(listElement)[selectedElementIndex + 1]);
            }
            else {
                break;
            }
        }
    }
    
    moveBottom(listElement, list) {
        let selectedElements = this.getSelectedListElements(listElement);
        for(let i = selectedElements.length - 1; i >= 0; i--) {
            let selectedElement = selectedElements[i];
            let selectedElementIndex: number = DomUtils.index(selectedElement);

            if(selectedElementIndex != (list.length - 1)) {
                let movedItem = list.splice(selectedElementIndex,1)[0];
                list.push(movedItem);
                listElement.scrollTop = listElement.scrollHeight;
            }
            else {
                break;
            }
        }
    }
    
    moveRight(sourceListElement) {
        let selectedElements = this.getSelectedListElements(sourceListElement);
        let i = selectedElements.length;
        while(i--) {
            this.target.push(this.source.splice(DomUtils.index(selectedElements[i]),1)[0]);
        }
    }
    
    moveAllRight() {
        for(let i = 0; i < this.source.length; i++) {
            this.target.push(this.source[i]);
        }
        this.source.splice(0, this.source.length);
    }
    
    moveLeft(targetListElement) {
        let selectedElements = this.getSelectedListElements(targetListElement);
        let i = selectedElements.length;
        while(i--) {
            this.source.push(this.target.splice(DomUtils.index(selectedElements[i]),1)[0]);
        }
    }
    
    moveAllLeft() {
        for(let i = 0; i < this.target.length; i++) {
            this.source.push(this.target[i]);
        }
        this.target.splice(0, this.target.length);
    }
    
    getListElements(listElement) {
        return listElement.children;
    }
    
    getSelectedListElements(listElement) {
        return DomUtils.find(listElement, 'li.ui-state-highlight');
    }
    
    ngOnDestroy() {

    }
}