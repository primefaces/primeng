import { Component } from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'loading-doc',
    standalone: true,
    imports: [CascadeSelectModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Loading state can be used <i>loading</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-cascadeselect [loading]="true" [style]="{ minWidth: '14rem' }" placeholder="Loading..." />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class LoadingDoc {}
