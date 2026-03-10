import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [ProgressBarModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p><i>content</i> template allows displaying custom content inside the progressbar.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-progressbar [value]="50">
                <ng-template #content let-value>
                    <span>{{ value }}/100</span>
                </ng-template>
            </p-progressbar>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDoc {}
