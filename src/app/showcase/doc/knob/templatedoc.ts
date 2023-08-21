import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Label is a string template that can be customized with the <i>valueTemplate</i> property having 60 as the placeholder .</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-knob [(ngModel)]="value" valueTemplate="{value}%"></p-knob>
        </div>
        <app-code [code]="code" selector="knob-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    value: number = 60;

    code: Code = {
        basic: `
<p-knob [(ngModel)]="value" valueTemplate="{value}%"></p-knob>`,

        html: `
<div class="card flex justify-content-center">
    <p-knob [(ngModel)]="value" valueTemplate="{value}%"></p-knob>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'knob-template-demo',
    templateUrl: './knob-template-demo.html'
})
export class KnobTemplateDemo {
    value: number = 60;
}`
    };
}
