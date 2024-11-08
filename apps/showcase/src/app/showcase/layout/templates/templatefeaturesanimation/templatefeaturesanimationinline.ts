import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, NgModule, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';

@Component({
    selector: 'template-features-animation-inline',
    template: `
        <div class="w-full py-8 rounded-xl bg-surface-50 dark:bg-surface-800 relative flex flex-col items-center justify-center">
            <div class="hidden sm:flex items-center gap-0.5 xl:gap-1 rounded-full border border-surface p-1 w-[90%] bg-surface-0 dark:bg-surface-900">
                <button
                    *ngFor="let data of inlineFeaturesData; let i = index"
                    (mouseenter)="enterCardArea(data.id)"
                    (mouseleave)="leaveCardArea(data.id)"
                    (click)="handleBtnClick(data.id)"
                    [ngClass]="{
                        'flex-1 py-1 px-1 lg:px-2 rounded-full text-surface-900 dark:text-surface-0 border-none outline-none text-xs font-medium transition-all hover:bg-surface-200 dark:hover:bg-surface-700 cursor-pointer': true,
                        'bg-surface-200 dark:bg-surface-700': data.id === selectedID,
                        'bg-transparent': data.id !== selectedID
                    }"
                >
                    {{ data.title }}
                </button>
            </div>
            <div class="w-[90%] h-fit overflow-hidden relative flex mt-5 rounded-lg shadow-[0px_0px_48px_0px_rgba(0,0,0,0.08)]">
                <img class="max-h-96 w-full h-auto object-cover object-top flex" [src]="inlineFeaturesData[selectedID - 1]?.src" alt="Animation Inline Feature Image" />
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateFeaturesAnimationInline {
    @Input() inlineFeaturesData;

    @Input() parentHandleClick;

    @Input() parentHandleHover;

    @Input() parentID;

    @Input() inlineSeconds;

    selectedID = 1;

    hoveredID = '';

    intervalId;

    observer = null;

    timeout = null;

    options;

    constructor(
        private cd: ChangeDetectorRef,
        public el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: any
    ) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.observer = new IntersectionObserver(([entry]) => {
                clearTimeout(this.timeout);

                if (entry.isIntersecting) {
                    this.startInterval();
                    this.timeout = setTimeout(() => {
                        this.observer.unobserve(this.el.nativeElement);
                    }, 350);
                }
            }, this.options);

            this.observer.observe(this.el.nativeElement);
        }
    }
    handleClick(id) {
        this.selectedID = id;
    }

    handleBtnClick = (id) => {
        this.handleClick(id);
        this.parentHandleClick(id);
    };

    startInterval() {
        this.intervalId = setInterval(() => {
            this.selectedID++;
            if (this.selectedID > this.inlineFeaturesData.length) {
                this.selectedID = 1;
            }
            this.cd.markForCheck();
        }, this.inlineSeconds);
    }

    enterCardArea() {
        clearInterval(this.intervalId);
    }

    leaveCardArea() {
        this.startInterval();
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        if (this.el.nativeElement) {
            this.observer?.unobserve(this.el.nativeElement);
        }
    }
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [TemplateFeaturesAnimationInline, SharedModule],
    declarations: [TemplateFeaturesAnimationInline]
})
export class TemplateFeaturesAnimationInlineModule {}
