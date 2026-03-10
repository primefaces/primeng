import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, TagModule],
    template: `
        <app-docsectiontext>
            <p>Label of the tag is defined with the <i>value</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-tag value="New" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {}
