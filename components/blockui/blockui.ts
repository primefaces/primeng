import {NgModule,Component,Input,AfterViewInit,OnDestroy,EventEmitter,ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {BlockableUI} from '../common/api';

@Component({
    selector: 'p-blockUI',
    template: `
        <div class="ui-blockui ui-widget-overlay" [ngClass]="{'ui-blockui-document':!target}" [ngStyle]="{display: blocked ? 'block' : 'none'}"></div>
    `,
    providers: [DomHandler]
})
export class BlockUI implements AfterViewInit,OnDestroy {

    @Input() target: any;
    
    _blocked: boolean;
    
    _mask: HTMLDivElement;
    
    constructor(public el: ElementRef,public domHandler: DomHandler) {}
    
    @Input() get blocked(): boolean {
        return this._blocked;
    }
    
    set blocked(val: boolean) {
        this._blocked = val;
        
        if(this._mask) {
            if(this._blocked)
                this.block();
            else
                this.unblock();
        }
    }
    
    ngAfterViewInit() {
        this._mask = this.el.nativeElement.children[0];
        
        if(this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    }
        
    block() {
        if(this.target) {
            this.target.getBlockableElement().appendChild(this._mask);
            this.target.style.position = 'relative';
        }
        else {
            document.body.appendChild(this._mask);
        }
        
        this._mask.style.zIndex = String(++DomHandler.zindex);
    }
    
    unblock() {
        this.el.nativeElement.appendChild(this._mask);
    }
    
    ngOnDestroy() {
        
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [BlockUI],
    declarations: [BlockUI]
})
export class BlockUIModule { }