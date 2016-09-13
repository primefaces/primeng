import {NgModule,Component,ElementRef,AfterContentInit,Input,Output,EventEmitter,ContentChild,
trigger,state,transition,style,animate} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header} from '../common/shared';

@Component({
    selector: 'p-accordion',
    template: `
        <div [ngClass]="'ui-accordion ui-widget ui-helper-reset'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
})
export class Accordion {
    
    @Input() multiple: boolean;
    
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onOpen: EventEmitter<any> = new EventEmitter();

    @Input() style: any;
    
    @Input() styleClass: string;
    
    public tabs: AccordionTab[] = [];

    constructor(protected el: ElementRef) {}

    addTab(tab: AccordionTab) {
        this.tabs.push(tab);
    }    
}

@Component({
    selector: 'p-accordionTab',
    template: `
        <div class="ui-accordion-header ui-state-default ui-corner-all" [ngClass]="{'ui-state-active': selected,'ui-state-hover':hover&&!disabled,'ui-state-disabled':disabled}">
            <span class="fa fa-fw" [ngClass]="{'fa-caret-down': selected, 'fa-caret-right': !selected}"></span>
            <a href="#" *ngIf="!headerFacet" role="tab" [attr.aria-expanded]="selected" [attr.aria-selected]="selected" (keydown)="onHeaderKeydown($event)"
                (click)="toggle($event)" (mouseenter)="hover = true" (mouseleave)="hover=false">{{header}}</a>
            <a href="#" *ngIf="headerFacet" role="tab" [attr.aria-expanded]="selected" [attr.aria-selected]="selected" (keydown)="onHeaderKeydown($event)"
                (click)="toggle($event)" (mouseenter)="hover = true" (mouseleave)="hover=false">
                <ng-content select="header"></ng-content>
            </a>
        </div>
        <div class="ui-accordion-content-wrapper" [@tabContent]="selected ? 'visible' : 'hidden'" 
            [ngClass]="{'ui-accordion-content-wrapper-overflown': !selected||animating}" role="tabpanel" [attr.aria-hidden]="!selected">
            <div class="ui-accordion-content ui-widget-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    animations: [
        trigger('tabContent', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AccordionTab {

    @Input() header: string;

    @Input() selected: boolean;

    @Input() disabled: boolean;

    @ContentChild(Header) headerFacet;
    
    protected animating: boolean;

    constructor(protected accordion: Accordion) {
        this.accordion.addTab(this);
    }

    toggle(event) {
        if(this.disabled) {
            return;
        }
        
        this.animating = true;
        let index = this.findTabIndex();

        if(this.selected) {
            this.selected = !this.selected;
            this.accordion.onClose.emit({originalEvent: event, index: index});
        }
        else {
            if(!this.accordion.multiple) {
                for(var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                }
            }

            this.selected = true;
            this.accordion.onOpen.emit({originalEvent: event, index: index});
        }
        
        //TODO: Use onDone of animate callback instead with RC6
        setTimeout(() => {
            this.animating = false;
        }, 400);

        event.preventDefault();
    }

    findTabIndex() {
        let index = -1;
        for(var i = 0; i < this.accordion.tabs.length; i++) {
            if(this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    }
    
    onHeaderKeydown(event) {
        if(event.keyCode == 13 || event.keyCode == 32) {
            this.toggle(event);
            event.preventDefault();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Accordion,AccordionTab],
    declarations: [Accordion,AccordionTab]
})
export class AccordionModule { }