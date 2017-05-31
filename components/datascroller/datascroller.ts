import {NgModule,Component,ElementRef,AfterViewInit,AfterContentInit,OnDestroy,Input,Output,Renderer2,ViewChild,EventEmitter,ContentChild,ContentChildren,QueryList,TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header,Footer,PrimeTemplate,SharedModule} from '../common/shared';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-dataScroller',
    template: `
    <div [ngClass]="{'ui-datascroller ui-widget': true, 'ui-datascroller-inline': inline}" [ngStyle]="style" [class]="styleClass">
        <div class="ui-datascroller-header ui-widget-header ui-corner-top" *ngIf="header">
            <ng-content select="p-header"></ng-content>
        </div>
        <div #content class="ui-datascroller-content ui-widget-content" [ngStyle]="{'max-height': scrollHeight}">
            <ul class="ui-datascroller-list">
                <li *ngFor="let item of dataToRender">
                    <ng-template [pTemplateWrapper]="itemTemplate" [item]="item"></ng-template>
                </li>
            </ul>
        </div>
        <div class="ui-datascroller-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
            <ng-content select="p-footer"></ng-content>
        </div>
    </div>
    `,
    providers: [DomHandler]
})
export class DataScroller implements AfterViewInit,OnDestroy {

    @Input() rows: number;

    @Input() lazy: boolean;
    
    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() buffer: number = 0.9;
    
    @Input() inline: boolean;
    
    @Input() scrollHeight: any;
    
    @Input() loader: any;
    
    @ViewChild('content') contentViewChild: ElementRef;
        
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public _value: any[];
    
    public itemTemplate: TemplateRef<any>;

    public dataToRender: any[] = [];

    public first: number = 0;
    
    scrollFunction: any;
    
    contentElement: HTMLDivElement;

    constructor(public el: ElementRef, public renderer: Renderer2, public domHandler: DomHandler) {}

    ngAfterViewInit() {
        if(this.lazy) {
            this.load();
        }
        
        if(this.loader) {
            this.scrollFunction = this.renderer.listen(this.loader, 'click', () => {
                this.load();
            });
        }
        else {
            this.bindScrollListener();
        }
    }
    
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
    
    @Input() get value(): any[] {
        return this._value;
    }

    set value(val:any[]) {
        this._value = val;
        this.handleDataChange();
    }
    
    handleDataChange() {
        if(this.lazy)
            this.dataToRender = this.value;
        else
            this.load();
    }
        
    load() {
        if(this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
            
            this.first = this.first + this.rows;
        }
        else {
            if(this.value) {
                for(let i = this.first; i < (this.first + this.rows); i++) {
                    if(i >= this.value.length) {
                        break;
                    }

                    this.dataToRender.push(this.value[i]);
                }
                
                this.first = this.first + this.rows;
            }
        }
    }
     
    reset() {
        this.first = 0;
        this.dataToRender = [];
        this.load();
    }

    isEmpty() {
        return !this.dataToRender||(this.dataToRender.length == 0);
    }
    
    createLazyLoadMetadata(): any {
        return {
            first: this.first,
            rows: this.rows
        };
    }
    
    bindScrollListener() {
        if(this.inline) {
            this.contentElement = this.contentViewChild.nativeElement;
            
            this.scrollFunction = this.renderer.listen(this.contentElement, 'scroll', () => {
                let scrollTop = this.contentElement.scrollTop;
                let scrollHeight = this.contentElement.scrollHeight;
                let viewportHeight = this.contentElement.clientHeight;

                if((scrollTop >= ((scrollHeight * this.buffer) - (viewportHeight)))) {
                    this.load();
                }
            });
        }
        else {
            this.scrollFunction = this.renderer.listen('window', 'scroll', () => {
                let docBody = document.body;
                let docElement = document.documentElement;
                let scrollTop = (window.pageYOffset||document.documentElement.scrollTop);
                let winHeight = docElement.clientHeight;
                let docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);
                            
                if(scrollTop >= ((docHeight * this.buffer) - winHeight)) {
                    this.load();
                }
            });
        }
        
    }
    
    ngOnDestroy() {
        //unbind
        if(this.scrollFunction) {
            this.scrollFunction();
            this.contentElement = null;
        }
    }
}

@NgModule({
    imports: [CommonModule,SharedModule],
    exports: [DataScroller,SharedModule],
    declarations: [DataScroller]
})
export class DataScrollerModule { }

