import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { SplitterModule } from 'primeng/splitter';

@Component({
    selector: 'vertical-doc',
    standalone: true,
    imports: [AppDocSectionText, SplitterModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>Panels are displayed as stacked by setting the <i>layout</i> to <i>vertical</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-splitter [style]="{ height: '300px' }" class="mb-8" [panelSizes]="[50, 50]" layout="vertical">
                <ng-template #panel>
                    <div class="flex items-center justify-center h-full">Panel 1</div>
                </ng-template>
                <ng-template #panel>
                    <div class="flex items-center justify-center h-full">Panel 2</div>
                </ng-template>
            </p-splitter>
        </div>
        <app-code></app-code>
    `
})
export class VerticalDoc {}
