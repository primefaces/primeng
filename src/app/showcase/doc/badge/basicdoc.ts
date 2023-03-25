import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'badge-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Content of the badge is specified using the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-badge [value]="2"></p-badge>
        </div>
        <app-code [code]="code" selector="badge-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-badge [value]="2"></p-badge>`,
        html: `
<div class="card flex justify-content-center">
    <p-badge [value]="2"></p-badge>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'badge-basic-demo',
    templateUrl: './badge-basic-demo.html'
})
export class BadgeBasicDemo {}`
    };
}
