import {NgModule,Component,ElementRef,AfterContentInit,OnDestroy,Input,Output,EventEmitter,ContentChildren,QueryList} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {Header} from '../common/shared';
import {BlockableUI} from '../common/blockableui';

@Component({
    selector: 'p-accordion',
    template: `
        <div [ngClass]="'ui-accordion ui-widget ui-helper-reset'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
})
export class Accordion implements BlockableUI {
    
    @Input() multiple: boolean;
    
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onOpen: EventEmitter<any> = new EventEmitter();

    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() lazy: boolean;
    
    private _activeIndex: any;
    
    public tabs: AccordionTab[] = [];

    constructor(public el: ElementRef) {}

    addTab(tab: AccordionTab) {
        this.tabs.push(tab);
    }   
    
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    } 
    
    @Input() get activeIndex(): any {
        return this._activeIndex;
    }

    set activeIndex(val: any) {
        this._activeIndex = val;
        
        if(this.tabs && this.tabs.length && this._activeIndex != null) {
            for(let i = 0; i < this.tabs.length; i++) {
                let selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                let changed = selected !== this.tabs[i].selected;
                
                if(changed) {
                    this.tabs[i].animating = true;
                }
                
                this.tabs[i].selected = selected;
                this.tabs[i].selectedChange.emit(selected);
            }
        }
    }
}

@Component({
    selector: 'p-accordionTab',
    template: `
        <div class="ui-accordion-header ui-state-default ui-corner-all" [ngClass]="{'ui-state-active': selected,'ui-state-disabled':disabled}"
            (click)="toggle($event)">
            <span class="fa fa-fw" [ngClass]="{'fa-caret-down': selected, 'fa-caret-right': !selected}"></span>
            <a href="#" *ngIf="!hasHeaderFacet" role="tab" [attr.aria-expanded]="selected" [attr.aria-selected]="selected">{{header}}</a>
            <a href="#" *ngIf="hasHeaderFacet" role="tab" [attr.aria-expanded]="selected" [attr.aria-selected]="selected">
                <ng-content select="p-header"></ng-content>
            </a>
        </div>
        <div class="ui-accordion-content-wrapper" [@tabContent]="selected ? 'visible' : 'hidden'" (@tabContent.done)="onToggleDone($event)"
            [ngClass]="{'ui-accordion-content-wrapper-overflown': !selected||animating}" role="tabpanel" [attr.aria-hidden]="!selected">
            <div class="ui-accordion-content ui-widget-content" *ngIf="lazy ? selected : true">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    animations: [
        trigger('tabContent', [
            state('hidden', style({
                height: '0'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AccordionTab implements OnDestroy {

    @Input() header: string;

    @Input() selected: boolean;

    @Input() disabled: boolean;
    
    @Output() selectedChange: EventEmitter<any> = new EventEmitter();

    @ContentChildren(Header) headerFacet: QueryList<AccordionTab>;
    
    public animating: boolean;
    
    constructor(public accordion: Accordion) {
        this.accordion.addTab(this);
    }

    toggle(event) {
        if(this.disabled || this.animating) {
            return false;
        }
        
        this.animating = true;
        let index = this.findTabIndex();

        if(this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({originalEvent: event, index: index});
        }
        else {
            if(!this.accordion.multiple) {
                for(var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                    this.accordion.tabs[i].selectedChange.emit(false);
                }
            }

            this.selected = true;
            this.accordion.onOpen.emit({originalEvent: event, index: index});
        }
        
        this.selectedChange.emit(this.selected);
        
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
    
    get lazy(): boolean {
        return this.accordion.lazy;
    }
    
    get hasHeaderFacet(): boolean {
        return this.headerFacet && this.headerFacet.length > 0;
    }
    
    onToggleDone(event: Event) {
        this.animating = false;
    }
    
    ngOnDestroy() {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Accordion,AccordionTab],
    declarations: [Accordion,AccordionTab]
})
export class AccordionModule { }
