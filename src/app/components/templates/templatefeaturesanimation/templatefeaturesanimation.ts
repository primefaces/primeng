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
    NgZone,
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
import { TemplateFeaturesAnimationInline, TemplateFeaturesAnimationInlineModule } from './templatefeaturesanimationinline';

@Component({
    selector: 'template-features-animation',
    template: `
        <div class="template-features-animation-wrapper">
            <ng-container *ngIf="!!title">
                <div class="template-features-animation-title">
                    <h2>{{ title }}</h2>
                </div>
            </ng-container>
            <div class="template-features-animation">
                <div class="template-features-animation-left">
                    <div
                        *ngFor="let data of featuresData; let i = index"
                        (mouseenter)="enterCardArea(data.id)"
                        (mouseleave)="leaveCardArea(data.id)"
                        [ngClass]="{
                            'template-features-animation-left-card': true,
                            'template-features-animation-left-card-active': selectedID === data.id
                        }"
                        (click)="handleClick(data.id)"
                    >
                        <div class="template-features-animation-left-card-order">
                            <div>{{ (i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) }}</div>
                            <div>{{ (i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) }}</div>
                            <div>{{ (i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) }}</div>
                        </div>
                        <div class="template-features-animation-left-card-content">
                            <h5>{{ data.title }}</h5>
                            <p>{{ data.description }}</p>
                        </div>
                    </div>
                </div>
                <div class="template-features-animation-right">
                    <ng-container *ngIf="featuresData[selectedID - 1]?.type === 'inline-animation'; else featureImage">
                        <template-features-animation-inline
                            [inlineFeaturesData]="featuresData[selectedID - 1]?.inlineFeaturesData"
                            [parentHandleClick]="handleClick"
                            [parentHandleHover]="handleHover"
                            [parentID]="selectedID"
                            [inlineSeconds]="animationSeconds / featuresData[selectedID - 1]?.inlineFeaturesData.length"
                        ></template-features-animation-inline>
                    </ng-container>
                    <ng-template #featureImage>
                        <img [src]="featuresData[selectedID - 1]?.src" alt="Animation Feature Image" />
                    </ng-template>
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

    constructor(private cd: ChangeDetectorRef, private zone: NgZone) {}

    startInterval() {
        this.intervalId = setInterval(() => {
            this.selectedID++;
            if (this.selectedID > this.featuresData.length) {
                this.selectedID = 1;
            }
            console.log('checked');
            this.cd.markForCheck();
        }, 5000);
    }

    enterCardArea() {
        clearInterval(this.intervalId);
    }

    leaveCardArea() {
        this.startInterval();
    }

    ngOnInit() {
        // this.startInterval();
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    handleClick(id) {
        this.selectedID = id;
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon, TemplateFeaturesAnimationInlineModule],
    exports: [TemplateFeaturesAnimation, SharedModule],
    declarations: [TemplateFeaturesAnimation]
})
export class TemplateFeaturesAnimationModule {}
