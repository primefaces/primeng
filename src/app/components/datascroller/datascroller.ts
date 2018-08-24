import {NgModule,Component,ElementRef,OnInit,AfterViewInit,AfterContentInit,DoCheck,OnDestroy,Input,Output,Renderer2,NgZone,ViewChild,EventEmitter,ContentChild,ContentChildren,QueryList,TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header,Footer,PrimeTemplate,SharedModule} from '../common/shared';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-dataScroller',
    template:`
    <div [ngClass]="{'ui-datascroller ui-widget': true, 'ui-datascroller-inline': inline}" [ngStyle]="style" [class]="styleClass">
        <div class="ui-datascroller-header ui-widget-header ui-corner-top" *ngIf="header">
            <ng-content select="p-header"></ng-content>
        </div>
        <div #content class="ui-datascroller-content ui-widget-content" [ngStyle]="{'max-height': scrollHeight}">
            <ul class="ui-datascroller-list">
                <li *ngFor="let item of value | slice:first:(first + (page * rows)); trackBy: trackBy; let i = index">
                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
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
export class DataScroller implements OnInit,AfterViewInit,OnDestroy {

    @Input() value: any[];

    @Input() rows: number;

    @Input() lazy: boolean;
    
    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() buffer: number = 0.9;
    
    @Input() inline: boolean;
    
    @Input() scrollHeight: any;
    
    @Input() loader: any;

    @Input() totalRecords: number;
    
    @Input() trackBy: Function = (index: number, item: any) => item;
                
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('content') contentViewChild: ElementRef;

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();
        
    itemTemplate: TemplateRef<any>;

    dataToRender: any[] = [];

    first: number = 0;
        
    inlineScrollListener: any;

    windowScrollListener: any;

    loaderClickListener: any;

    page: number = 0;

    constructor(public el: ElementRef, public renderer: Renderer2, public domHandler: DomHandler, public zone: NgZone) {}

    ngOnInit() {
        this.load();
    }

    ngAfterViewInit() {
        if(this.loader) {
            this.loaderClickListener = this.renderer.listen(this.loader, 'click', () => {
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
                
    load() {
        if(this.lazy) {
            this.onLazyLoad.emit({
                first: this.page * this.rows,
                rows: this.rows
            });
        }
        
        this.page = this.page + 1;
    }

    shouldLoad() {
        if(this.lazy)
            return (this.rows * this.page < this.totalRecords);
        else
            return this.value && this.value.length && (this.rows * this.page < this.value.length);
    }
     
    reset() {
        this.page = 0;
    }

    isEmpty() {
        return !this.value||(this.value.length == 0);
    }
        
    bindScrollListener() {
        this.zone.runOutsideAngular(() => {
            if(this.inline) {
                this.inlineScrollListener = this.onInlineScroll.bind(this);
                this.contentViewChild.nativeElement.addEventListener('scroll', this.inlineScrollListener);
            }
            else {
                this.windowScrollListener = this.onWindowScroll.bind(this);
                window.addEventListener('scroll', this.windowScrollListener);
            }
        });
    }

    unbindScrollListener() {
        if(this.inlineScrollListener) {
            this.contentViewChild.nativeElement.removeEventListener('scroll', this.inlineScrollListener);
        }

        if(this.windowScrollListener) {
            window.removeEventListener('scroll', this.windowScrollListener);
        }

        if(this.loaderClickListener) {
            this.loaderClickListener();
            this.loaderClickListener = null;
        }
    }

    onInlineScroll() {
        let scrollTop = this.contentViewChild.nativeElement.scrollTop;
        let scrollHeight = this.contentViewChild.nativeElement.scrollHeight;
        let viewportHeight = this.contentViewChild.nativeElement.clientHeight;

        if((scrollTop >= ((scrollHeight * this.buffer) - (viewportHeight)))) {
            if(this.shouldLoad()) {
                this.zone.run(() => {
                    this.load();
                });
            }   
        }
    }

    onWindowScroll() {
        let docBody = document.body;
        let docElement = document.documentElement;
        let scrollTop = (window.pageYOffset||document.documentElement.scrollTop);
        let winHeight = docElement.clientHeight;
        let docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);

        if(scrollTop >= ((docHeight * this.buffer) - winHeight)) {
            if(this.shouldLoad()) {
                this.zone.run(() => {
                    this.load();
                });
            }  
        }
    }
    
    ngOnDestroy() {
        this.unbindScrollListener();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [DataScroller,SharedModule],
    declarations: [DataScroller]
})
export class DataScrollerModule { }

