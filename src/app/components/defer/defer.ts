import {NgModule,Directive,ElementRef,AfterViewInit,OnDestroy,TemplateRef,EmbeddedViewRef,
        ViewContainerRef,Renderer2,EventEmitter,Output,ContentChild, NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pDefer]'
})
export class DeferredLoader implements AfterViewInit,OnDestroy {
        
    @Output() onLoad: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(TemplateRef) template: TemplateRef<any>;
        
    documentScrollListener: VoidFunction;

    view: EmbeddedViewRef<any> | null = null;

    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        public viewContainer: ViewContainerRef,
        private ngZone: NgZone
    ) {}
    
    ngAfterViewInit() {
        if (this.shouldLoad()) {
            this.load();
        }

        if (!this.isLoaded()) {
            this.ngZone.runOutsideAngular(() => {
                this.documentScrollListener = this.renderer.listen('window', 'scroll', () => {
                    if (this.shouldLoad()) {
                        this.ngZone.run(() => {
                            this.load();
                        });
                        this.documentScrollListener();
                        this.documentScrollListener = null;
                    }
                });
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
        if (this.onLoad.observers.length > 0) {
            this.onLoad.emit();
        }
    }

    isLoaded() {
        return this.view !== null;
    }

    ngOnDestroy() {
        if (this.isLoaded()) {
            // `createEmbeddedView` calls `attachToAppRef` which attaches the embedded view
            // to the component tree, this will create a memory leak if we don't call `destroy()`,
            // since we have to remove the embedded view from the component tree.
            this.view.destroy();
            this.view = null;
        }
        
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