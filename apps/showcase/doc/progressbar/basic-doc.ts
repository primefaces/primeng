import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [ProgressBarModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>ProgressBar is used with the <i>value</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-progressbar [value]="50" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {}
