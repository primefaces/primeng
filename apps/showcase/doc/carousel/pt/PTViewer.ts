import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';

@Component({
    selector: 'carousel-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, CarouselModule, ChevronLeft, ChevronRight],
    template: `
        <app-docptviewer [docs]="docs">
            <p-carousel class="max-w-xl mx-auto" align="center">
                <p-carousel-content style="height: 240px">
                    @for (item of items; track item) {
                        <p-carousel-item>
                            <div class="h-full text-5xl font-semibold bg-surface-50 dark:bg-surface-950 text-surface-950 dark:text-surface-0 flex flex-col items-center justify-center gap-6 rounded-xl border border-surface">
                                <span>{{ item }}</span>
                            </div>
                        </p-carousel-item>
                    }
                </p-carousel-content>
                <div class="flex mt-4 gap-4">
                    <p-carousel-indicators></p-carousel-indicators>
                    <div class="flex items-center justify-end gap-2 flex-1">
                        <button
                            pCarouselPrev
                            class="w-9 h-9 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <svg data-p-icon="chevron-left" class="text-lg"></svg>
                        </button>
                        <button
                            pCarouselNext
                            class="w-9 h-9 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity"
                        >
                            <svg data-p-icon="chevron-right" class="text-lg"></svg>
                        </button>
                    </div>
                </div>
            </p-carousel>
        </app-docptviewer>
    `
})
export class PTViewer {
    items = [1, 2, 3, 4, 5];

    docs = [
        {
            data: getPTOptions('Carousel'),
            key: 'Carousel'
        },
        {
            data: getPTOptions('CarouselContent'),
            key: 'CarouselContent'
        },
        {
            data: getPTOptions('CarouselItem'),
            key: 'CarouselItem'
        },
        {
            data: getPTOptions('CarouselIndicators'),
            key: 'CarouselIndicators'
        },
        {
            data: getPTOptions('CarouselNext'),
            key: 'CarouselNext'
        },
        {
            data: getPTOptions('CarouselPrev'),
            key: 'CarouselPrev'
        },
        {
            data: getPTOptions('CarouselIndicator'),
            key: 'CarouselIndicator'
        }
    ];
}
