import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';

@Component({
    selector: 'template-features',
    template: `
        <div class="template-features">
            <ng-container *ngIf="displayType === 'horizontal'; else vertical">
                <div class="px-6 py-6 sm:px-10 sm:py-10 lg:py-20 rounded-3xl bg-surface-0 dark:bg-surface-900">
                    <div class="flex flex-wrap justify-center gap-6 mx-auto w-full max-w-5xl">
                        <ng-container *ngFor="let feature of featuresData">
                            <div class="p-5 rounded-2xl border border-surface flex-1 min-w-80 max-w-96 animate-duration-500">
                                <div class="flex w-full mb-5 bg-surface-100 dark:bg-surface-800 overflow-hidden rounded-lg">
                                    <img class="w-full" [src]="isDarkMode ? feature.darkSrc || feature.src : feature.src" [alt]="feature.title" />
                                </div>
                                <div>
                                    <h5 class="text-surface-900 dark:text-surface-0 font-semibold mb-2 text-lg">{{ feature.title }}</h5>
                                    <p class="m-0 text-muted-color">
                                        {{ feature.description }}
                                    </p>
                                </div>
                            </div>
                        </ng-container>
                    </div>
                </div>
            </ng-container>
            <ng-template #vertical>
                <div class="px-6 py-6 sm:px-10 sm:py-10 lg:py-20 rounded-3xl bg-surface-0 dark:bg-surface-900">
                    <div class="mx-auto max-w-3xl flex sm:flex-row flex-col items-start gap-6">
                        <div
                            *ngFor="let _ of [].constructor(2); let i = index"
                            class="flex flex-col gap-6 flex-1"
                            [ngClass]="{
                                'sm:pt-32': i === 1
                            }"
                        >
                            <ng-container *ngFor="let data of i === 0 ? firstColumnData : secondColumnData; let j = index">
                                <div class="w-full p-4 md:p-5 rounded-2xl border border-surface animate-duration-500">
                                    <div class="w-full bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden flex">
                                        <img class="w-full h-auto rounded-lg" [src]="isDarkMode ? data.darkSrc || data.src : data.src" [alt]="data.title" />
                                    </div>
                                    <h2 class="mt-5 mb-0 text-lg text-surface-900 dark:text-surface-0 font-semibold">{{ data.title }}</h2>
                                    <p class="mt-2 mb-0 text-muted-color">{{ data.description }}</p>
                                </div>
                            </ng-container>
                        </div>
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

    get isDarkMode(): boolean {
        return this.configService.appState().darkTheme;
    }

    constructor(private configService: AppConfigService) {}

    ngOnInit() {
        if (this.featuresData) {
            this.firstColumnData = this.featuresData.slice(0, Math.ceil(this.featuresData.length / 2));
            this.secondColumnData = this.featuresData.slice(Math.ceil(this.featuresData.length / 2));
        }
    }
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [TemplateFeatures, SharedModule],
    declarations: [TemplateFeatures]
})
export class TemplateFeaturesModule {}
