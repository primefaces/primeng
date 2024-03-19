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
    selector: 'template-license',
    template: `
        <div class="template-license-wrapper">
            <div class="template-license">
                <div class="template-license-cards">
                    <ng-container *ngFor="let licenseData of license?.licenseDetails">
                        <div class="template-license-card">
                            <span>{{ licenseData?.title }}</span>
                            <h2>{{ licenseData?.price }}</h2>
                            <div class="template-license-card-included">
                                <ng-container *ngFor="let txt of licenseData?.included; let j = index">
                                    <p>{{ txt }}</p>
                                </ng-container>
                            </div>
                            <a href="https://www.primefaces.org/layouts/licenses" target="_blank">
                                <button>License Details</button>
                            </a>
                        </div>
                    </ng-container>
                </div>
                <p class="template-license-description">{{ license?.description }}</p>
                <p class="template-license-visit">
                    Visit the 
                    <a [href]="license?.documentLink" target="_blank"> official documentation </a>
                     for more information.
                </p>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateLicense {
    @Input() license;

    ngOnInit(){
        console.log(this.license)
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
    exports: [TemplateLicense, SharedModule],
    declarations: [TemplateLicense]
})
export class TemplateLicenseModule {}
