import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Label is a string template that can be customized with the <i>valueTemplate</i> property having 60 as the placeholder .</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-knob [(ngModel)]="value" valueTemplate="{value}%"/>
        </div>
        <app-code [code]="code" selector="knob-template-demo"></app-code>
    `
})
export class TemplateDoc {
    value: number = 60;

    code: Code = {
        basic: `<p-knob [(ngModel)]="value" valueTemplate="{value}%"/>`,

        html: `<div class="card flex justify-content-center">
    <p-knob [(ngModel)]="value" valueTemplate="{value}%"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';

@Component({
    selector: 'knob-template-demo',
    templateUrl: './knob-template-demo.html',
    standalone: true,
    imports: [FormsModule, KnobModule]
})
export class KnobTemplateDemo {
    value: number = 60;
}`
    };
}
