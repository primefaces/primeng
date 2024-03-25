import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';

@Component({
    selector: 'template-hero-rectangle',
    template: `
        <svg width="1152" height="457" viewBox="0 0 1152 457" fill="none" xmlns="http://www.w3.org/2000/svg" class="template-hero-rectangle">
            <g style="mix-blend-mode: overlay" filter="url(#filter0_f_956_37561)">
                <path d="M264.08 -96H547.881L952 470H-163L264.08 -96Z" fill="url(#paint0_linear_956_37561)" />
            </g>
            <defs>
                <filter id="filter0_f_956_37561" x="-363" y="-296" width="1515" height="966" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_956_37561" />
                </filter>
                <linearGradient id="paint0_linear_956_37561" x1="394.5" y1="-96" x2="394.5" y2="470" gradientUnits="userSpaceOnUse">
                    <stop stop-color="var(--primary-50)" />
                    <stop offset="1" stop-color="var(--primary-50)" stop-opacity="0" />
                </linearGradient>
            </defs>
        </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrl: '../../../pages/templates/learnmore/learnmore.scss'
})
export class TemplateHeroRectangle {}

@NgModule({
    imports: [CommonModule, SharedModule, NgOptimizedImage],
    exports: [TemplateHeroRectangle, SharedModule],
    declarations: [TemplateHeroRectangle]
})
export class TemplateHeroRectangleModule {}
