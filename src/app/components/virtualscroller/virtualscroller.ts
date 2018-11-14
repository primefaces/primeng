import {NgModule,Component,ElementRef,AfterContentInit,Input,Output,ViewChild,EventEmitter,ContentChild,ContentChildren,QueryList,TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header,Footer,PrimeTemplate,SharedModule} from '../common/shared';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
    selector: 'p-virtualScroller',
    template:`
    <div [ngClass]="'ui-datascroller ui-widget'" [ngStyle]="style" [class]="styleClass">
        <div class="ui-datascroller-header ui-widget-header ui-corner-top" *ngIf="header">
            <ng-content select="p-header"></ng-content>
        </div>
        <div #content class="ui-datascroller-content ui-widget-content">
            <ul class="ui-datascroller-list">
                <cdk-virtual-scroll-viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize">
                    <ng-container *cdkVirtualFor="let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; ">
                        <li>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}"></ng-container>
                        </li>
                    </ng-container>
                </cdk-virtual-scroll-viewport>
            </ul>
        </div>
        <div class="ui-datascroller-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
            <ng-content select="p-footer"></ng-content>
        </div>
    </div>
    `
})
export class VirtualScroller implements AfterContentInit {

    @Input() value: any;

    @Input() itemSize: number; 

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() scrollHeight: any;
    
    @Input() trackBy: Function = (index: number, item: any) => item;
                
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('content') contentViewChild: ElementRef;

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();
        
    itemTemplate: TemplateRef<any>;

    constructor(public el: ElementRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }
    
}

@NgModule({
    imports: [CommonModule,ScrollingModule],
    exports: [VirtualScroller,SharedModule,ScrollingModule],
    declarations: [VirtualScroller]
})
export class VirtualScrollerModule { }

