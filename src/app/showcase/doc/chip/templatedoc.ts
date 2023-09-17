import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chip-template-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Content can easily be customized with the dynamic content instead of using the built-in modes.</p>
        </app-docsectiontext>
        <div class="card flex align-items-center">
            <p-chip>
                <div class="p-2">Content</div>
            </p-chip>
        </div>
        <app-code [code]="code" selector="chip-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-chip>
    <div class="p-2">Content</div>
</p-chip>`,
        html: `
<div class="card flex align-items-center">
    <p-chip>
        <div class="p-2">Content</div>
    </p-chip>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'chip-template-demo',
    templateUrl: './chip-template-demo.html'
})
export class ChipTemplateDemo {}`
    };
}
