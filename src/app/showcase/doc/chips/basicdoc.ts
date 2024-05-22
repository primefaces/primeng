import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'chips-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Chips is used as a controlled input with <i>ngModel</i> property where it should be an array.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="values" />
        </div>
        <app-code [code]="code" selector="chips-basic-demo"></app-code>
    `
})
export class BasicDoc {
    values: string[] | undefined;

    code: Code = {
        basic: `<p-chips [(ngModel)]="values" />`,

        html: `<div class="card p-fluid">
    <p-chips [(ngModel)]="values" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

@Component({
    selector: 'chips-basic-demo',
    templateUrl: './chips-basic-demo.html',
    standalone: true,
    imports: [FormsModule, ChipsModule]
})
export class ChipsBasicDemo {
    values: string[] | undefined;
}`
    };
}
