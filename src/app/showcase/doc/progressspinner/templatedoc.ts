import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>ProgressSpinner can be customized with styling property like <i>styleClass</i>, <i>strokeWidth</i> and <i>fill</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-progressSpinner styleClass="w-4rem h-4rem" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></p-progressSpinner>
        </div>
        <app-code [code]="code" selector="progress-spinner-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-progressSpinner styleClass="w-4rem h-4rem" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></p-progressSpinner>`,
        html: `
<div class="card">
    <p-progressSpinner styleClass="w-4rem h-4rem" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></p-progressSpinner>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'progress-spinner-template-demo',
    templateUrl: './progress-spinner-template-demo.html'
})
export class ProgressSpinnerTemplateDemo {}`
    };
}
