import { Component, Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'custom-doc',
    standalone: true,
    imports: [ProgressSpinnerModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>ProgressSpinner can be customized with styling property like <i>strokeWidth</i> and <i>fill</i>.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-progress-spinner strokeWidth="8" fill="transparent" animationDuration=".5s" [style]="{ width: '50px', height: '50px' }" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class CustomDoc {
    @Input() id: string;

    @Input() title: string;
}
