import {NgModule,Component,Input,AfterViewInit,OnDestroy,EventEmitter,ElementRef,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {BlockableUI} from '../common/blockableui';

@Component({
    selector: 'p-blockUI',
    template: `
        <div #mask class="ui-blockui ui-widget-overlay" [ngClass]="{'ui-blockui-document':!target}" [ngStyle]="{display: blocked ? 'block' : 'none'}">
            <ng-content></ng-content>
        </div>
    `,
    providers: [DomHandler]
})
export class BlockUI implements AfterViewInit,OnDestroy {

    @Input() target: any;
    
    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;
    
    @ViewChild('mask') mask: ElementRef;
    
    _blocked: boolean;
        
    constructor(public el: ElementRef,public domHandler: DomHandler) {}
    
    @Input() get blocked(): boolean {
        return this._blocked;
    }
    
    set blocked(val: boolean) {
        this._blocked = val;
        
        if (this.mask.nativeElement) {
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
        
    block() {
        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            let style = this.target.style||{};
            style.position = 'relative';
            this.target.style = style;
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