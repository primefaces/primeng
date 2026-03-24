import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ChevronUp } from '@primeicons/angular/chevron-up';
import { ChevronDown } from '@primeicons/angular/chevron-down';

@Component({
    selector: 'carousel-orientation-doc',
    standalone: true,
    imports: [CarouselModule, AppCode, AppDemoWrapper, AppDocSectionText, ChevronUp, ChevronDown],
    template: `
        <app-docsectiontext>
            <p>Set <i>orientation</i> to <i>vertical</i> for a vertical carousel layout.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="mt-8 mb-16">
                <p-carousel class="max-w-sm mx-auto flex flex-col gap-8 items-center" orientation="vertical" [slidesPerPage]="1.3">
                    <button
                        pCarouselPrev
                        class="w-10 h-10 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                    >
                        <svg data-p-icon="chevron-up" class="text-lg"></svg>
                    </button>
                    <p-carousel-content style="height: 240px; width: 100%">
                        @for (item of items; track item) {
                            <p-carousel-item>
                                <div class="h-full text-5xl font-semibold bg-surface-50 dark:bg-surface-950 text-surface-950 dark:text-surface-0 flex flex-col items-center justify-center gap-6 rounded-xl border border-surface">
                                    <span>{{ item }}</span>
                                </div>
                            </p-carousel-item>
                        }
                    </p-carousel-content>
                    <button
                        pCarouselNext
                        class="w-10 h-10 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                    >
                        <svg data-p-icon="chevron-down" class="text-lg"></svg>
                    </button>
                </p-carousel>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class CarouselOrientationDoc {
    items = [1, 2, 3, 4, 5];
}
