import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'chip-template-demo',
    template: `
        <app-docsectiontext>
            <p>Content can easily be customized with the dynamic content instead of using the built-in modes.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chip styleClass="!py-0 !pl-0 !pr-4">
                <span class="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">P</span>
                <span class="ml-2 font-medium">PRIME</span>
            </p-chip>
        </div>
        <app-code [code]="code" selector="chip-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-chip styleClass="!py-0 !pl-0 !pr-4">
    <span class="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">
        P
    </span>
    <span class="ml-2 font-medium">
        PRIME
    </span>
</p-chip>`,
        html: `<div class="card">
    <p-chip styleClass="!py-0 !pl-0 !pr-4">
        <span class="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">
            P
        </span>
        <span class="ml-2 font-medium">
            PRIME
        </span>
    </p-chip>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Chip } from 'primeng/chip';

@Component({
    selector: 'chip-template-demo',
    templateUrl: './chip-template-demo.html',
    standalone: true,
    imports: [Chip]
})
export class ChipTemplateDemo {}`
    };
}
