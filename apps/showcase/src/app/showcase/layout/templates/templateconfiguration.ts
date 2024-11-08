import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';

@Component({
    selector: 'template-configuration',
    template: `
        <div class="px-6 py-6 sm:px-10 sm:py-5 lg:py-20 lg:px-8 rounded-3xl bg-surface-0 dark:bg-surface-900">
            <div class="p-6 md:p-8 rounded-2xl lg:rounded-3xl border border-surface max-w-3xl w-full mx-auto animate-duration-500">
                <div class="rounded-lg lg:rounded-xl border border-surface overflow-hidden">
                    <div class="py-1 px-6 h-14 flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full" [style.backgroundColor]="'#ED6B5D'"></div>
                        <div class="w-3 h-3 rounded-full" [style.backgroundColor]="'#F4BE50'"></div>
                        <div class="w-3 h-3 rounded-full" [style.backgroundColor]="'#61C554'"></div>
                    </div>
                    <div class="p-6 bg-surface-900 dark:bg-surface-800 flex flex-col gap-4 relative">
                        <p class="m-0 text-surface-0 text-xs sm:text-sm">&gt; npm install -g angular-cli</p>
                        <p class="m-0 text-surface-0 text-xs sm:text-sm">&gt; ng new my-apollo-app</p>
                        <p class="m-0 text-surface-0 text-xs sm:text-sm">&gt; cd my-apollo-app</p>
                        <p class="m-0 text-surface-0 text-xs sm:text-sm">&gt; ng serve</p>
                        <img class="w-28 lg:w-32 h-28 lg:h-32 absolute right-6 bottom-4" src="https://primefaces.org/cdn/primeng/images/templates/angular-3d-logo.png" alt="Angular 3D Logo" />
                    </div>
                </div>
                <h3 class="text-lg lg:text-2xl text-surface-900 dark:text-surface-0 font-bold">{{ title }}</h3>
                <p class="text-sm lg:text-base text-surface-600 dark:text-surface-400 mt-3 mb-0">{{ description }}</p>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateConfiguration {
    @Input() title;
    @Input() description;
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [TemplateConfiguration, SharedModule],
    declarations: [TemplateConfiguration]
})
export class TemplateConfigurationModule {}
