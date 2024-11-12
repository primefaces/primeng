import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ContentChild, Directive, EmbeddedViewRef, EventEmitter, inject, NgModule, OnDestroy, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Nullable } from 'primeng/ts-helpers';

/**
 * Defer postpones the loading the content that is initially not in the viewport until it becomes visible on scroll.
 * @group Components
 */
@Directive({
    selector: '[pDefer]',
    standalone: true
})
export class Defer extends BaseComponent implements AfterViewInit, OnDestroy {
    /**
     * Callback to invoke when deferred content is loaded.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onLoad: EventEmitter<Event> = new EventEmitter<Event>();

    @ContentChild(TemplateRef) template: TemplateRef<any> | undefined;

    documentScrollListener: Nullable<Function>;

    view: Nullable<EmbeddedViewRef<any>>;

    viewContainer: ViewContainerRef = inject(ViewContainerRef);

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.shouldLoad()) {
                this.load();
            }

            if (!this.isLoaded()) {
                this.documentScrollListener = this.renderer.listen(this.document.defaultView, 'scroll', () => {
                    if (this.shouldLoad()) {
                        this.load();
                        this.documentScrollListener && this.documentScrollListener();
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
        this.view = this.viewContainer.createEmbeddedView(this.template as TemplateRef<any>);
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
    imports: [Defer],
    exports: [Defer]
})
export class DeferModule {}
