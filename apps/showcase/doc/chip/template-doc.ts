import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ChipModule } from 'primeng/chip';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, ChipModule],
    template: `
        <app-docsectiontext>
            <p>Content can easily be customized with the dynamic content instead of using the built-in modes.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-chip class="!py-0 !pl-0 !pr-4">
                <span class="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">P</span>
                <span class="ml-2 font-medium">PRIME</span>
            </p-chip>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDoc {}
