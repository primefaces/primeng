import { NgClass, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { TemplateFeaturesAnimationInline } from './templatefeaturesanimationinline';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
    selector: 'template-features-animation',
    standalone: true,
    imports: [NgClass, AnimateOnScrollModule, TemplateFeaturesAnimationInline],
    template: `
        <div class="template-features px-5 py-5 sm:px-9 sm:py-5 lg:py-18 lg:px-7 rounded-2xl lg:rounded-3xl bg-surface-0 dark:bg-surface-900">
            @if (!!title) {
                <h2 class="text-center text-surface-900 dark:text-surface-0 text-2xl lg:text-4xl font-semibold lg:pt-0 pt-5 mb-11">
                    {{ title }}
                </h2>
            }
            <div pAnimateOnScroll enterClass="animate-fadein" class="flex flex-col-reverse lg:flex-row items-start gap-9 w-full max-w-xl lg:max-w-5xl mx-auto p-3 lg:p-6 rounded-3xl border border-surface animate-duration-500">
                <div class="flex flex-col gap-4 flex-1">
                    @for (data of featuresData; track $index; let i = $index) {
                        <div
                            (mouseenter)="enterCardArea(data.id)"
                            (mouseleave)="leaveCardArea(data.id)"
                            class="template-features-animation-card group template-features-animation-left-card p-4 flex items-start gap-2 md:gap-4 xl:gap-6 cursor-pointer rounded-xl transition-all hover:!bg-primary-50 dark:hover:!bg-primary/15"
                            [ngClass]="{
                                'template-features-animation-card-active rounded-xl bg-primary-50 dark:bg-primary/15 transition-all': selectedID === data.id
                            }"
                            (click)="handleClick(data.id)"
                        >
                            <div class="template-features-animation-card-order w-14 h-full -mt-1 relative transition-all">
                                <div class="text-[2.188rem] font-bold absolute top-0 left-0 text-primary-400 [-webkit-text-stroke:1.2px_var(--p-primary-400)]">
                                    {{ (i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) }}
                                </div>
                                <div
                                    class="text-[2.188rem] font-bold absolute top-0 left-0 transition-all dark:text-surface-900 group-hover:text-surface-50 dark:group-hover:text-surface-900"
                                    [ngClass]="selectedID === data.id ? 'text-surface-50' : 'text-surface-0'"
                                >
                                    {{ (i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) }}
                                </div>
                                <div class="text-[2.188rem] font-bold absolute top-0 left-0 text-transparent">
                                    {{ (i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) }}
                                </div>
                            </div>
                            <div class="flex-1">
                                <h5 class="lg:text-lg font-semibold m-0">{{ data.title }}</h5>
                                <p class="text-xs lg:text-sm text-muted-color mt-1 mb-0 [&>a]:text-primary" [innerHTML]="getSanitizedDescription(data.description)"></p>
                            </div>
                        </div>
                    }
                </div>
                <div class="flex-1 w-full lg:w-fit rounded-2xl bg-surface-100 dark:bg-surface-800 overflow-hidden flex sm:min-w-[26.25rem]">
                    @if (featuresData[selectedID - 1]?.type === 'inline-animation') {
                        <template-features-animation-inline
                            [inlineFeaturesData]="featuresData[selectedID - 1]?.inlineFeaturesData"
                            [parentHandleClick]="handleClick"
                            [parentHandleHover]="handleHover"
                            [parentID]="selectedID"
                            [inlineSeconds]="animationSeconds / featuresData[selectedID - 1]?.inlineFeaturesData.length"
                        ></template-features-animation-inline>
                    } @else {
                        <img class="w-full h-auto object-cover flex" [src]="featuresData[selectedID - 1]?.src" alt="Animation Feature Image" />
                    }
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateFeaturesAnimation {
    @Input() featuresData;

    @Input() title;

    animationSeconds = 5000;

    selectedID = 1;

    hoveredID = null;

    intervalId = null;

    observer = null;

    timeout = null;

    options;

    constructor(
        private cd: ChangeDetectorRef,
        public el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: any,
        private sanitizer: DomSanitizer
    ) {}

    getSanitizedDescription(description: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(description);
    }

    startInterval() {
        this.intervalId = setInterval(() => {
            this.selectedID++;
            if (this.selectedID > this.featuresData.length) {
                this.selectedID = 1;
            }

            this.cd.markForCheck();
        }, 5000);
    }

    enterCardArea() {
        clearInterval(this.intervalId);
    }

    leaveCardArea() {
        this.startInterval();
    }

    handleClick(id) {
        this.selectedID = id;
    }

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

    ngOnDestroy() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        if (this.el.nativeElement) {
            this.observer?.unobserve(this.el.nativeElement);
        }
    }
}
