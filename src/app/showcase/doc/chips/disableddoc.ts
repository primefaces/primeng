import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'chips-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="values" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="chips-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    values: string[] | undefined;

    code: Code = {
        basic: `<p-chips [(ngModel)]="values" [disabled]="true" />`,

        html: `<div class="card p-fluid">
    <p-chips [(ngModel)]="values" [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

@Component({
    selector: 'chips-disabled-demo',
    templateUrl: './chips-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, ChipsModule]
})
export class ChipsDisabledDemo {
    values: string[] | undefined;
}`
    };
}
