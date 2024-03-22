import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    forwardRef,
    signal
} from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'template-hero-light',
    template: `
        <svg width="490" height="143" viewBox="0 0 490 143" fill="none" xmlns="http://www.w3.org/2000/svg" class="template-hero-light">
            <g filter="url(#filter0_f_1970_42395)">
                <g filter="url(#filter1_f_1970_42395)">
                    <rect x="43" y="43" width="404" height="10" rx="5" fill="var(--primary-100)" />
                    <rect x="38.5" y="38.5" width="413" height="19" rx="9.5" stroke="var(--primary-50)" stroke-width="9" />
                </g>
                <g filter="url(#filter2_f_1970_42395)">
                    <rect x="98" y="52" width="294" height="10" rx="5" fill="var(--primary-100)" />
                    <rect x="93.5" y="47.5" width="303" height="19" rx="9.5" stroke="var(--primary-50)" stroke-width="9" />
                </g>
                <g filter="url(#filter3_f_1970_42395)">
                    <rect x="144" y="60" width="202" height="10" rx="5" fill="var(--primary-100)" />
                    <rect x="139.5" y="55.5" width="211" height="19" rx="9.5" stroke="var(--primary-50)" stroke-width="9" />
                </g>
                <g filter="url(#filter4_f_1970_42395)">
                    <rect x="182" y="75" width="126" height="10" rx="5" fill="var(--primary-100)" />
                    <rect x="177.5" y="70.5" width="135" height="19" rx="9.5" stroke="var(--primary-50)" stroke-width="9" />
                </g>
                <g filter="url(#filter5_f_1970_42395)">
                    <rect x="212" y="90" width="66" height="10" rx="5" fill="var(--primary-100)" />
                    <rect x="207.5" y="85.5" width="75" height="19" rx="9.5" stroke="var(--primary-50)" stroke-width="9" />
                </g>
            </g>
            <defs>
                <filter id="filter0_f_1970_42395" x="0" y="0" width="490" height="143" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="17" result="effect1_foregroundBlur_1970_42395" />
                </filter>
                <filter id="filter1_f_1970_42395" x="14" y="14" width="462" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1970_42395" />
                </filter>
                <filter id="filter2_f_1970_42395" x="69" y="23" width="352" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1970_42395" />
                </filter>
                <filter id="filter3_f_1970_42395" x="115" y="31" width="260" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1970_42395" />
                </filter>
                <filter id="filter4_f_1970_42395" x="153" y="46" width="184" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1970_42395" />
                </filter>
                <filter id="filter5_f_1970_42395" x="183" y="61" width="124" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_1970_42395" />
                </filter>
            </defs>
        </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrl: '../../../showcase/pages/templates/learnmore/learnmore.scss'
})
export class TemplateHeroLight {}

@NgModule({
    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon, NgOptimizedImage],
    exports: [TemplateHeroLight, SharedModule],
    declarations: [TemplateHeroLight]
})
export class TemplateHeroLightModule {}
