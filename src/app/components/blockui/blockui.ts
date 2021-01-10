import {NgModule,Component,Input,AfterViewInit,OnDestroy,ElementRef,ViewChild,ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ContentChildren, QueryList, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';
import {PrimeTemplate} from 'primeng/api';

@Component({
    selector: 'p-blockUI',
    template: `
        <div #mask [class]="styleClass" [ngClass]="{'p-blockui-document':!target, 'p-blockui p-component-overlay': true}" [ngStyle]="{display: blocked ? 'flex' : 'none'}">
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./blockui.css']
})
export class BlockUI implements AfterViewInit,OnDestroy {

    @Input() target: any;
    
    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;
    
    @Input() styleClass: string;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('mask') mask: ElementRef;
    
    _blocked: boolean;

    contentTemplate: TemplateRef<any>;
        
    constructor(public el: ElementRef, public cd: ChangeDetectorRef) {}
    
    @Input() get blocked(): boolean {
        return this._blocked;
    }
    
    set blocked(val: boolean) {
        this._blocked = val;
        
        if (this.mask && this.mask.nativeElement) {
            if (this._blocked)
                this.block();
            else
                this.unblock();
        }
    }
    
    ngAfterViewInit() {
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                break;
                
                default:
                    this.contentTemplate = item.template;
                break;
            }
        });
    }
        
    block() {
        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            this.target.getBlockableElement().style.position = 'relative';
        }
        else {
            document.body.appendChild(this.mask.nativeElement);
        }
        
        if (this.autoZIndex) {
            this.mask.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    
    unblock() {
        this.el.nativeElement.appendChild(this.mask.nativeElement);
    }
    
    ngOnDestroy() {
        this.unblock();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [BlockUI],
    declarations: [BlockUI]
})
export class BlockUIModule { }