import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'indeterminate-doc',
    standalone: true,
    imports: [ProgressBarModule, AppCode, AppDemoWrapper, AppDocSectionText],
    providers: [MessageService],
    template: `
        <app-docsectiontext>
            <p>For progresses with no value to track, set the <i>mode</i> property to <i>indeterminate</i>.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-progressbar mode="indeterminate" [style]="{ height: '6px' }" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class IndeterminateDoc {}
