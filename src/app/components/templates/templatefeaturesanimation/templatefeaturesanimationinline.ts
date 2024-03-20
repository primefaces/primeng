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
    selector: 'template-features-animation-inline',
    template: `
        <div class="template-features-animation-right-inline">
            <div class="template-features-animation-right-inline-tabs">
                <button
                    *ngFor="let data of inlineFeaturesData; let i = index"
                    (mouseenter)="enterCardArea(data.id)"
                    (mouseleave)="leaveCardArea(data.id)"
                    [class.template-features-animation-right-inline-tabs-btnActive]="data.id === selectedID"
                    (click)="handleBtnClick(data.id)"
                >
                    {{ data.title }}
                </button>
            </div>
            <div class="template-features-animation-right-inline-image">
                <img [src]="inlineFeaturesData[selectedID - 1]?.src" alt="Animation Inline Feature Image" />
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateFeaturesAnimationInline {
    @Input() inlineFeaturesData;

    @Input() parentHandleClick;

    @Input() parentHandleHover;

    @Input() parentID;

    @Input() inlineSeconds;

    selectedID = 1;

    hoveredID = '';

    intervalId;

    constructor(private cd: ChangeDetectorRef) {}

    handleClick(id) {
        this.selectedID = id;
    }

    handleBtnClick = (id) => {
        this.handleClick(id);
        this.parentHandleClick(id);
    };
    startInterval() {
        this.intervalId = setInterval(() => {
            this.selectedID++;
            if (this.selectedID > this.inlineFeaturesData.length) {
                this.selectedID = 1;
            }
            this.cd.markForCheck();
        }, this.inlineSeconds);
    }
    enterCardArea() {
        clearInterval(this.intervalId);
    }

    leaveCardArea() {
        this.startInterval();
    }

    ngOnInit() {
        this.startInterval();
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
    exports: [TemplateFeaturesAnimationInline, SharedModule],
    declarations: [TemplateFeaturesAnimationInline]
})
export class TemplateFeaturesAnimationInlineModule {}
