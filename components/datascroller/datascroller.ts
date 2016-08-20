import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,DoCheck,Input,Output,Renderer,EventEmitter,ContentChild,IterableDiffers,TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header} from '../common/shared';
import {Footer} from '../common/shared';
import {SharedModule} from '../common/shared';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-dataScroller',
    template: `
    <div [ngClass]="{'ui-datascroller ui-widget': true, 'ui-datascroller-inline': inline}" [ngStyle]="style" [class]="styleClass">
        <div class="ui-datascroller-header ui-widget-header ui-corner-top" *ngIf="header">
            <ng-content select="header"></ng-content>
        </div>
        <div class="ui-datascroller-content ui-widget-content" [ngStyle]="{'max-height': scrollHeight}">
            <ul class="ui-datascroller-list">
                <li *ngFor="let item of dataToRender">
                    <template [pTemplateWrapper]="itemTemplate" [item]="item"></template>
                </li>
            </ul>
        </div>
        <div class="ui-datascroller-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
            <ng-content select="footer"></ng-content>
        </div>
    </div>
    `,
    providers: [DomHandler]
})
export class DataScroller implements AfterViewInit,DoCheck,OnDestroy {

    @Input() value: any[];

    @Input() rows: number;

    @Input() lazy: boolean;
    
    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() buffer: number = 0.9;
    
    @Input() inline: boolean;
    
    @Input() scrollHeight: any;
        
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
    
    @Input() loader: any;

    protected dataToRender: any[] = [];

    protected first: number = 0;
    
    differ: any;
    
    scrollFunction: any;
    
    contentElement: any;

    constructor(protected el: ElementRef, differs: IterableDiffers, protected renderer: Renderer, protected domHandler: DomHandler) {
        this.differ = differs.find([]).create(null);
    }

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
    
    ngDoCheck() {
        let changes = this.differ.diff(this.value);

        if(changes) {
            if(this.lazy)
                this.dataToRender = this.value;
            else
                this.load();
        }
    }
    
    load() {
        if(this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
        else {
            for(let i = this.first; i < (this.first + this.rows); i++) {
                if(i >= this.value.length) {
                    break;
                }

                this.dataToRender.push(this.value[i]);
            }
        }
        this.first = this.first + this.rows;
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
            this.contentElement = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-datascroller-content');
            
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
            this.scrollFunction = this.renderer.listenGlobal('window', 'scroll', () => {
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

