import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'tag-template-demo',
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
        <app-code [code]="code" selector="tag-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-tag [style]="{ border: '2px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)'}">
    <div class="flex items-center gap-2 px-1">
        <img alt="Country" src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" class="flag flag-it" style="width: 18px" />
        <span class="text-base">
            Italy
        </span>
    </div>
</p-tag>`,
        html: `<div class="card flex justify-center">
    <p-tag [style]="{ border: '2px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)'}">
        <div class="flex items-center gap-2 px-1">
            <img alt="Country" src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" class="flag flag-it" style="width: 18px" />
            <span class="text-base">
                Italy
            </span>
        </div>
    </p-tag>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'tag-template-demo',
    templateUrl: './tag-template-demo.html',
    standalone: true,
    imports: [Tag]
})
export class TagTemplateDemo {}`
    };
}
