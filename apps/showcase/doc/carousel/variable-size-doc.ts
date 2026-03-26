import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';

@Component({
    selector: 'variable-size-doc',
    standalone: true,
    imports: [CarouselModule, AppCode, AppDemoWrapper, AppDocSectionText, ChevronLeft, ChevronRight],
    template: `
        <app-docsectiontext>
            <p>Enable <i>autoSize</i> to allow items with variable widths.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="mt-8 mb-16">
                <p-carousel class="max-w-xl mx-auto" align="center" [autoSize]="true">
                    <p-carousel-content class="h-35">
                        @for (item of items; track item.width; let i = $index) {
                            <p-carousel-item [style.width]="item.width">
                                <div class="h-full text-4xl font-semibold bg-surface-50 dark:bg-surface-950 text-surface-950 dark:text-surface-0 flex flex-col items-center justify-center gap-6 rounded-lg border border-surface">
                                    <span>{{ i + 1 }}</span>
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
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class VariableSizeDoc {
    items = [{ width: '120px' }, { width: '80px' }, { width: '200px' }, { width: '160px' }, { width: '220px' }, { width: '180px' }, { width: '280px' }, { width: '100px' }];
}
