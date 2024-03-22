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
import { TemplateHeroLightModule } from './templateherolight';
import { TemplateHeroRectangleModule } from './templateherorectangle';

@Component({
    selector: 'template-hero',
    template: `
        <div class="template-hero">
            <ng-container *ngIf="!!selectedTemplate?.pattern">
                <img class="template-hero-pattern" width="1344" height="315" [ngSrc]="selectedTemplate.pattern" alt="Template Hero Pattern" />
            </ng-container>
            <ng-container *ngIf="!!selectedTemplate?.light">
                <template-hero-light></template-hero-light>
            </ng-container>
            <ng-container *ngIf="!!selectedTemplate?.rectangle">
                <template-hero-rectangle></template-hero-rectangle>
            </ng-container>
            <div class="template-hero-card">
                <div class="template-hero-card-logo">{{ selectedTemplate?.logo }}</div>
                <p>{{ selectedTemplate?.description }}</p>
                <div class="template-hero-card-buttons">
                    <a [href]="selectedTemplate?.liveHref" target="_blank" class="template-hero-card-buttons-btn1 p-button"> Live Demo </a>
                    <a [href]="selectedTemplate?.storeHref ?? 'https://www.primefaces.org/store/'" target="_blank" class="template-hero-card-buttons-btn2 p-button">
                        {{ selectedTemplate?.free ? 'Source Code' : 'Buy Now' }}
                    </a>
                </div>
                <div class="template-hero-card-links ">
                    <a [href]="selectedTemplate?.supportHref ?? 'https://github.com/orgs/primefaces/discussions/categories/primereact-templates'" target="_blank">
                        <i class="pi pi-github " style="font-size: 1rem;"></i>
                        <span>{{ selectedTemplate?.free ? 'Open Issues' : 'Get Support' }}</span>
                    </a>
                    <a [href]="selectedTemplate?.docHref" target="_blank">
                        <i class="pi pi-book " style="font-size: 1rem;"></i>
                        <span>Read Doc</span>
                    </a>
                </div>
            </div>
            <ng-container *ngIf="!!selectedTemplate?.dashboard1">
                <img class="template-hero-dashboard1" width="504" height="504" [ngSrc]="selectedTemplate?.dashboard1" alt="Template Dashboard Image 1" />
            </ng-container>
            <ng-container *ngIf="!!selectedTemplate?.dashboard2">
                <img class="template-hero-dashboard2" width="504" height="504" [ngSrc]="selectedTemplate?.dashboard2" alt="Template Dashboard Image 2" />
            </ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrl: '../../../showcase/pages/templates/learnmore/learnmore.scss'
})
export class TemplateHero {
    @Input() selectedTemplate;
}

@NgModule({
    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon, NgOptimizedImage, TemplateHeroLightModule, TemplateHeroRectangleModule],
    exports: [TemplateHero, SharedModule],
    declarations: [TemplateHero]
})
export class TemplateHeroModule {}
