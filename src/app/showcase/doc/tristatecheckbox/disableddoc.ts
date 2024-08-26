import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex flex-col gap-4 items-center">
            <p-triStateCheckbox [(ngModel)]="value" [disabled]="true" />
            <label>{{ value === null ? 'null' : value }}</label>
        </div>
        <app-code [code]="code" selector="tri-state-checkbox-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value!: string;

    code: Code = {
        basic: `<p-triStateCheckbox [(ngModel)]="value" [disabled]="true" />`,

        html: `<div class="card flex flex-col gap-4 items-center">
    <p-triStateCheckbox [(ngModel)]="value" [disabled]="true" />
    <label>{{value === null ? 'null' : value}}</label>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'tri-state-checkbox-disabled-demo',
    templateUrl: './tri-state-checkbox-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, TriStateCheckboxModule]
})
export class TriStateCheckboxDisabledDemo {
    value!: string;
}`
    };
}
