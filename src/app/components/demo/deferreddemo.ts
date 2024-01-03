import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgModule, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { SharedModule } from 'primeng/api';

@Component({
    selector: 'p-deferred-demo',
    template: `
        <div *ngIf="!visible; else content" class="demo-section-loading">Loading...</div>
        <ng-template #content>
            <ng-content></ng-content>
        </ng-template>
    `,
    styleUrls: ['./deferreddemo.css'],
    host: {
        class: 'p-element'
    }
})
export class DeferredDemo implements OnInit {
    visible: boolean = false;

    observer = null;

    timeout = null;

    @Input() options: any;

    @Output() load: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public el: ElementRef, @Inject(PLATFORM_ID) private platformId: any) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(([entry]) => {
                clearTimeout(this.timeout);

                if (entry.isIntersecting) {
                    this.timeout = setTimeout(() => {
                        this.visible = true;
                        this.observer.unobserve(this.el.nativeElement);
                        this.load.emit();
                    }, 350);
                }
            }, this.options);

            this.observer.observe(this.el.nativeElement);
        }
    }
    ngOnDestroy() {
        if (!this.visible && this.el.nativeElement) {
            this.observer?.unobserve(this.el.nativeElement);
        }
        clearTimeout(this.timeout);
    }
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [DeferredDemo, SharedModule],
    declarations: [DeferredDemo]
})
export class DeferredDemoModule {}
