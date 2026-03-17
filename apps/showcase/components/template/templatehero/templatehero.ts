import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { TemplateHeroLight } from './templateherolight';
import { TemplateHeroRectangle } from './templateherorectangle';

@Component({
    selector: 'template-hero',
    standalone: true,
    imports: [CommonModule, TemplateHeroLight, TemplateHeroRectangle],
    template: `
        <div class="w-full h-196 md:h-112 xl:h-[31.719rem] bg-primary rounded-3xl overflow-hidden relative">
            @if (!!templateHeroData?.pattern) {
                <img [class]="templateHeroData?.patternClass" width="1344" [src]="templateHeroData.pattern" alt="Template Hero Pattern" priority />
            }
            @if (!!templateHeroData?.light) {
                <template-hero-light></template-hero-light>
            }
            @if (!!templateHeroData?.rectangle) {
                <template-hero-rectangle></template-hero-rectangle>
            }
            <div class="absolute left-1/2 top-20 -translate-x-1/2 md:translate-x-0 md:top-1/2 md:-translate-y-1/2 md:left-10 lg:left-20 xl:left-36 z-20 w-[92%] max-w-md md:w-91 lg:w-98 xl:w-101.5 rounded-3xl p-6 lg:px-8 lg:py-6">
                <div
                    class="absolute top-0 left-0 w-full h-full backdrop-blur-[2px] rounded-3xl border border-[rgba(255,255,255,0.24)] [background:linear-gradient(180deg,rgba(170,140,255,0.00)_0%,var(--p-primary-400)/0.8_100%),rgba(255,255,255,0.10)] shadow-[0px_2px_4px_0px_rgba(255,255,255,0.24)_inset,0px_48px_80px_0px_rgba(0,0,0,0.08),0px_-5px_13px_-2px_rgba(255,255,255,0.55)_inset]"
                ></div>
                <div class="z-10 relative">
                    <div class="flex gap-4 items-center">
                        <div class="h-7 lg:h-9 [&>svg]:h-full [&>svg]:w-auto select-none">
                            <ng-container *ngComponentOutlet="templateLogo"></ng-container>
                        </div>
                        @if (templateHeroData.isMultipurpose) {
                            <div class="bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-surface-0 px-2 py-1 font-medium leading-6 rounded-md text-sm leading-normal">Multipurpose</div>
                        }
                    </div>
                    <p class="text-primary-contrast mt-4 mb-0 lg:text-sm text-xs">{{ templateHeroData?.description }}</p>
                    <div class="flex items-center gap-4 mt-7">
                        <a
                            [href]="templateHeroData?.liveHref"
                            target="_blank"
                            class="flex-1 py-3.5 border border-primary-contrast hover:bg-primary-contrast/10 text-primary-contrast rounded-full text-center font-semibold transition-all leading-none text-sm"
                        >
                            Live Demo
                        </a>
                        <a
                            [href]="templateHeroData?.storeHref ?? 'https://primeui.store'"
                            target="_blank"
                            class="flex-1 rounded-full border text-center font-semibold w-full bg-primary-600 border-primary-600 hover:bg-primary-700 text-surface-0 py-3.5 transition-all leading-none text-sm"
                        >
                            {{ templateHeroData?.free ? 'Source Code' : 'Buy Now' }}
                        </a>
                    </div>
                    <div class="flex items-center gap-4 mt-5">
                        <a [href]="templateHeroData?.supportHref ?? 'https://github.com/orgs/primefaces/discussions/categories/primeng-templates'" target="_blank" class="flex items-center gap-2 text-primary-contrast lg:text-sm text-xs">
                            <i class="pi pi-github " style="font-size: 0.875rem;"></i>
                            <span class="hover:underline">{{ templateHeroData?.free ? 'Open Issues' : 'Community' }}</span>
                        </a>
                        @if (templateHeroData?.docHref) {
                            <a class="flex items-center gap-2 text-primary-contrast lg:text-sm text-xs" [href]="templateHeroData?.docHref" target="_blank">
                                <i class="pi pi-book " style="font-size: 0.875rem;"></i>
                                <span class="hover:underline">Documentation</span>
                            </a>
                        }
                    </div>
                </div>
            </div>
            @if (!!templateHeroData?.dashboard1) {
                <img
                    class="select-none flex z-20 absolute top-98 left-52 md:top-7 md:left-147 lg:left-175 xl:left-210 w-[33.141rem] shadow-[0px_0px_43.64997px_0px_rgba(0,0,0,0.12)] rounded-xs"
                    eager
                    [src]="templateHeroData?.dashboard1"
                    alt="Template Dashboard Image 1"
                />
            }
            @if (!!templateHeroData?.dashboard2) {
                <img
                    class="select-none flex z-10 absolute top-98 left-6 md:top-7 md:left-112 lg:left-126 xl:left-147 w-[33.141rem] shadow-[0px_0px_43.64997px_0px_rgba(0,0,0,0.12)] rounded-xs"
                    eager
                    [src]="templateHeroData?.dashboard2"
                    alt="Template Dashboard Image 2"
                />
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrl: '../../../pages/templates/learnmore/learnmore.scss'
})
export class TemplateHero {
    @Input() templateHeroData;
    @Input() templateLogo;
}
