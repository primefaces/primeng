import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chip-template-demo',
    template: `
        <app-docsectiontext>
            <p>Content can easily be customized with the dynamic content instead of using the built-in modes.</p>
        </app-docsectiontext>
        <div class="card flex align-items-center">
            <p-chip>
                <div class="p-2">Content</div>
            </p-chip>
        </div>
        <app-code [code]="code" selector="chip-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-chip>
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
