import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'tag-template-demo',
    standalone: true,
    imports: [AppCode, AppDocSectionText, TagModule],
    template: `
        <app-docsectiontext>
            <p>Children of the component are passed as the content for templating.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-tag [style]="{ border: '2px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)' }">
                <div class="flex items-center gap-2 px-1">
                    <img alt="Country" src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" class="flag flag-it" style="width: 18px" />
                    <span class="text-base">Italy</span>
                </div>
            </p-tag>
        </div>
        <app-code selector="tag-template-demo"></app-code>
    `
})
export class TemplateDoc {}
