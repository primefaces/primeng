import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'template-license',
    template: `
        <div class="px-6 py-6 sm:px-10 sm:py-10 lg:py-20 lg:px-8 rounded-3xl bg-surface-0 dark:bg-surface-900">
            <div class="template-license max-w-3xl mx-auto">
                <div class="flex flex-wrap items-start justify-center gap-6">
                    <ng-container *ngFor="let licenseData of license?.licenseDetails">
                        <div class="flex-1 border border-surface rounded-xl lg:rounded-2xl p-6 min-w-80">
                            <span class="text-surface-600 dark:text-surface-400 font-semibold">{{ licenseData?.title }}</span>
                            <div class="text-surface-900 dark:text-surface-0 text-4xl font-semibold mt-4 mb-5">
                                <span [ngClass]="{ 'text-muted-color line-through mr-4': licenseData?.discount_price }">{{ licenseData?.price }}</span>
                                <span>{{ licenseData?.discount_price }}</span>
                            </div>
                            <div class="flex flex-col gap-2 mb-5">
                                <ng-container *ngFor="let txt of licenseData?.included; let j = index">
                                    <p class="text-muted-color m-0">{{ txt }}</p>
                                </ng-container>
                            </div>
                            <a href="https://www.primefaces.org/layouts/licenses" target="_blank">
                                <p-button styleClass="w-full">License Details</p-button>
                            </a>
                        </div>
                    </ng-container>
                </div>
                <p class="text-muted-color text-center mt-6 mb-0">{{ license?.description }}</p>
                <p class="text-muted-color text-center mt-6 mb-0">
                    Visit the 
                    <a [href]="license?.documentLink" class="text-primary cursor-pointer transition-all hover:underline" target="_blank"> official documentation </a>
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
    imports: [CommonModule, SharedModule, ButtonModule],
    exports: [TemplateLicense, SharedModule],
    declarations: [TemplateLicense]
})
export class TemplateLicenseModule {}
