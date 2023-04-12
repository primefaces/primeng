import { NgModule, Directive, ElementRef, AfterViewInit, OnDestroy, TemplateRef, EmbeddedViewRef, ViewContainerRef, Renderer2, EventEmitter, Output, ContentChild, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomHandler } from 'primeng/dom';

@Directive({
    selector: '[pDefer]',
    host: {
        class: 'p-element'
    }
})
export class DeferredLoader implements AfterViewInit, OnDestroy {
    @Output() onLoad: EventEmitter<any> = new EventEmitter();

    @ContentChild(TemplateRef) template: TemplateRef<any>;

    documentScrollListener: Function;

    view: EmbeddedViewRef<any>;

    window: Window;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, public el: ElementRef, public renderer: Renderer2, public viewContainer: ViewContainerRef, private cd: ChangeDetectorRef) {
        this.window = this.document.defaultView as Window;
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.shouldLoad()) {
                this.load();
            }

            if (!this.isLoaded()) {
                this.documentScrollListener = this.renderer.listen(this.window, 'scroll', () => {
                    if (this.shouldLoad()) {
                        this.load();
                        this.documentScrollListener();
                        this.documentScrollListener = null;
                    }
                });
            }
        }
    }

    shouldLoad(): boolean {
        if (this.isLoaded()) {
            return false;
        } else {
            let rect = this.el.nativeElement.getBoundingClientRect();
            let docElement = this.document.documentElement;
            let winHeight = docElement.clientHeight;

            return winHeight >= rect.top;
        }
    }

    load(): void {
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
        this.cd.detectChanges();
    }

    isLoaded() {
        return this.view != null && isPlatformBrowser(this.platformId);
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
export class DeferModule {}
