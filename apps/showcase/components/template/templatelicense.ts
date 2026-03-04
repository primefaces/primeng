import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'template-license',
    standalone: true,
    imports: [NgClass, ButtonModule],
    template: `
        <div class="px-5 py-5 sm:px-9 sm:py-9 lg:py-18 lg:px-7 rounded-3xl bg-surface-0 dark:bg-surface-900">
            <div class="template-license max-w-2xl mx-auto">
                <div class="flex flex-wrap items-start justify-center gap-5">
                    @for (licenseData of license?.licenseDetails; track $index) {
                        <div class="flex-1 border border-surface rounded-xl lg:rounded-2xl p-5 min-w-72">
                            <span class="text-surface-600 dark:text-surface-400 font-semibold text-sm">{{ licenseData?.title }}</span>
                            <div class="text-surface-900 dark:text-surface-0 text-4xl font-semibold mt-4 mb-5">
                                <span [ngClass]="{ 'text-muted-color line-through mr-4': license?.showDiscount }">{{ licenseData?.price }}</span>
                                @if (license?.showDiscount) {
                                    <span>{{ licenseData?.discount_price }}</span>
                                }
                            </div>
                            <div class="flex flex-col gap-2 mb-5">
                                @for (txt of licenseData?.included; track $index) {
                                    <p class="text-muted-color m-0 text-sm">{{ txt }}</p>
                                }
                            </div>
                            <a href="https://www.primefaces.org/layouts/licenses" target="_blank">
                                <p-button styleClass="w-full">License Details</p-button>
                            </a>
                        </div>
                    }
                </div>
                <p class="text-muted-color text-center mt-5 mb-0 text-sm">{{ license?.description }}</p>
                @if (license.documentLink) {
                    <p class="text-muted-color text-center mt-5 mb-0 text-sm">
                        Visit the
                        <a [href]="license?.documentLink" class="text-primary cursor-pointer transition-all hover:underline" target="_blank"> official documentation </a>
                        for more information.
                    </p>
                }
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateLicense {
    @Input() license;
}
