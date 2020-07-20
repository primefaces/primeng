import {NgModule,Directive,ElementRef,AfterViewInit,OnDestroy,TemplateRef,EmbeddedViewRef,
        ViewContainerRef,Renderer2,EventEmitter,Output,ContentChild} from '@angular/core';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pDefer]'
})
export class DeferredLoader implements AfterViewInit,OnDestroy {
        
    @Output() onLoad: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(TemplateRef) template: TemplateRef<any>;
        
    documentScrollListener: Function;
    
    view: EmbeddedViewRef<any>;
            
    constructor(public el: ElementRef, public renderer: Renderer2, public viewContainer: ViewContainerRef) {}
    
    ngAfterViewInit() {
        if (this.shouldLoad()) {
            this.load();
        }
        
        if (!this.isLoaded()) {
            this.documentScrollListener = this.renderer.listen('window', 'scroll', () => {
                if (this.shouldLoad()) {
                    this.load();
                    this.documentScrollListener();
                    this.documentScrollListener = null;
                }
            });
        }
    }
    
    shouldLoad(): boolean {
        if (this.isLoaded()) {
            return false;
        }
        else {
            let rect = this.el.nativeElement.getBoundingClientRect();
            let docElement = document.documentElement;
            let winHeight = docElement.clientHeight;
            
            return (winHeight >= rect.top);
        }
    }
    
    load(): void { 
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
    }
    
    isLoaded() {
        return this.view != null;
    }
            
    ngOnDestroy() {
        this.view = null;
        
        if (this.documentScrollListener) {
            this.documentScrollListener();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [DeferredLoader],
    declarations: [DeferredLoader]
})
export class DeferModule { }