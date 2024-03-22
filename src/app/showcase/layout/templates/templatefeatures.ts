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

@Component({
    selector: 'template-features',
    template: `
        <div class="template-features">
            <ng-container *ngIf="displayType === 'horizontal'; else vertical">
                <div class="template-features-horizontal-wrapper">
                    <div class="template-features-horizontal">
                        <ng-container *ngFor="let feature of featuresData">
                            <div class="template-features-horizontal-card">
                                <div class="template-features-horizontal-card-top">
                                    <img [src]="darkMode ? feature.darkSrc || feature.src : feature.src" [alt]="feature.title" />
                                </div>
                                <div class="template-features-horizontal-card-bottom">
                                    <h5 class="template-features-horizontal-card-bottom-title">{{ feature.title }}</h5>
                                    <p class="template-features-horizontal-card-bottom-description">{{ feature.description }}</p>
                                </div>
                            </div>
                        </ng-container>
                    </div>
                </div>
            </ng-container>
            <ng-template #vertical>
                <div class="template-features-vertical-wrapper">
                    <div class="template-features-vertical">
                        <ng-container *ngFor="let _ of [].constructor(2); let i = index">
                            <div class="template-features-vertical-col">
                                <ng-container *ngFor="let data of i === 0 ? firstColumnData : secondColumnData; let j = index">
                                    <div class="template-features-vertical-card">
                                        <div class="template-features-vertical-card-image">
                                            <img [src]="darkMode ? data.darkSrc || data.src : data.src" [alt]="data.title" />
                                        </div>
                                        <h2>{{ data.title }}</h2>
                                        <p>{{ data.description }}</p>
                                    </div>
                                </ng-container>
                            </div>
                        </ng-container>
                    </div>
                </div>
            </ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateFeatures {
    @Input() displayType;

    @Input() featuresData;

    firstColumnData;

    secondColumnData;

    ngOnInit() {
        if (this.featuresData) {
            this.firstColumnData = this.featuresData.slice(0, Math.ceil(this.featuresData.length / 2));
            this.secondColumnData = this.featuresData.slice(Math.ceil(this.featuresData.length / 2));
        }
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
    exports: [TemplateFeatures, SharedModule],
    declarations: [TemplateFeatures]
})
export class TemplateFeaturesModule {}
