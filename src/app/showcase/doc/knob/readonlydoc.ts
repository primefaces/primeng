import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'readonly-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>readonly</i> present, value cannot be edited.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-knob [(ngModel)]="value" [readonly]="true"/>
        </div>
        <app-code [code]="code" selector="knob-readonly-demo"></app-code>
    `
})
export class ReadonlyDoc {
    value: number = 50;

    code: Code = {
        basic: `<p-knob [(ngModel)]="value" [readonly]="true"/>`,

        html: `<div class="card flex justify-content-center">
    <p-knob [(ngModel)]="value" [readonly]="true"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';

@Component({
    selector: 'knob-readonly-demo',
    templateUrl: './knob-readonly-demo.html',
    standalone: true,
    imports: [FormsModule, KnobModule]
})
export class KnobReadonlyDemo {
    value: number = 50;
}`
    };
}
