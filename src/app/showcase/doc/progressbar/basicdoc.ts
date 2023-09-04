import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>ProgressBar is used with the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-progressBar [value]="50"></p-progressBar>
        </div>
        <app-code [code]="code" selector="progress-bar-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-progressBar [value]="50"></p-progressBar>`,
        html: `
<div class="card">
    <p-progressBar [value]="50"></p-progressBar>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'progress-bar-basic-demo',
    templateUrl: './progress-bar-basic-demo.html'
})
export class ProgressBarBasicDemo {}`
    };
}
