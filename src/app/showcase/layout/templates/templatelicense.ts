import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';

@Component({
    selector: 'template-license',
    template: `
        <div class="template-license-wrapper">
            <div class="template-license">
                <div class="template-license-cards">
                    <ng-container *ngFor="let licenseData of license?.licenseDetails">
                        <div class="template-license-card">
                            <span>{{ licenseData?.title }}</span>
                            <div class="template-license-price flex gap-4">
                                <h2 [ngClass]="{ discount: licenseData?.discount_price }">{{ licenseData?.price }}</h2>
                                <h2>{{ licenseData?.discount_price }}</h2>
                            </div>
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
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [TemplateLicense, SharedModule],
    declarations: [TemplateLicense]
})
export class TemplateLicenseModule {}
