import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Label of the tag is defined with the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tag value="New"></p-tag>
        </div>
        <app-code [code]="code" selector="tag-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-tag value="New"></p-tag>`,
        html: `
<div class="card flex justify-content-center">
    <p-tag value="New"></p-tag>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'tag-basic-demo',
    templateUrl: './tag-basic-demo.html'
})
export class TagBasicDemo {}`
    };
}
