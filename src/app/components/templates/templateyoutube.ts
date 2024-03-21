import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { DialogModule } from '../dialog/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'template-youtube',
    template: `
        <div class="template-youtube-wrapper">
            <div class="template-youtube">
                <div class="template-youtube-title">
                    <h2 *ngFor="let data of title; let i = index" [key]="i">{{ data }}</h2>
                </div>
                <div class="template-youtube-description">{{ description }}</div>
                <div class="template-youtube-screen" (click)="setYoutubeVideoVisible(true)">
                    <div class="template-youtube-screen-blur">
                        <div class="template-youtube-screen-play">
                            <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" fill="none">
                                <g filter="url(#filter0_d_918_49700)">
                                    <rect x="50" y="46" width="80" height="80" rx="40" fill="white" />
                                    <rect x="50.5" y="46.5" width="79" height="79" rx="39.5" stroke="#DFE7EF" />
                                    <path
                                        d="M103.062 84.7896C104.085 85.5904 104.085 87.1386 103.062 87.9394L85.3123 101.834C83.9995 102.862 82.0795 101.926 82.0795 100.259L82.0795 72.47C82.0795 70.8028 83.9995 69.8674 85.3123 70.8951L103.062 84.7896Z"
                                        fill="var(--primary-400)"
                                    />
                                </g>
                                <defs>
                                    <filter id="filter0_d_918_49700" x="0" y="0" width="180" height="180" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feflood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="25" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_918_49700" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_918_49700" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <img [src]="imgSrc" alt="Template Youtube Screen" />
                </div>
                <p-dialog header="Video Content" [(visible)]="youtubeVideoVisible" (onHide)="youtubeVideoVisible = false" [style]="{ width: '70vw' }">
                    <div class="template-youtube-video">
                        <iframe [src]="iframeSrc" title="PrimeNG 2023 Roadmap" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </p-dialog>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateYoutube {
    @Input() imgSrc: string;
    title: string[] = ['Integration with', 'Existing Vite Applications'];
    description: string = 'Only the folders that are related to the layout needs to move in to your project. We‘ve already created a short tutorial with details for Sakai Vue. The both templates have the same implementation.';
    youtubeLink: string = 'https://www.youtube.com/embed/Y07edRJd5QM';
    youtubeVideoVisible: boolean = false;
    constructor(private sanitizer: DomSanitizer) {}
    iframeSrc: SafeResourceUrl;
    setYoutubeVideoVisible(visible: boolean) {
        this.youtubeVideoVisible = visible;
    }
    ngOnInit() {
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeLink);
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon, DialogModule],
    exports: [TemplateYoutube, SharedModule],
    declarations: [TemplateYoutube]
})
export class TemplateYoutubeModule {}
