import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>A model can be bound using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex flex-col gap-4 items-center">
            <p-triStateCheckbox [(ngModel)]="value" inputId="tricheckbox" />
            <label for="tricheckbox">{{ value === null ? 'null' : value }}</label>
        </div>
        <app-code [code]="code" selector="tri-state-checkbox-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value: boolean | null = null;

    code: Code = {
        basic: `<p-triStateCheckbox [(ngModel)]="value" inputId="tricheckbox" />`,

        html: `<div class="card flex flex-col gap-4 items-center">
    <p-triStateCheckbox [(ngModel)]="value" inputId="tricheckbox" />
    <label for="tricheckbox">{{ value === null ? 'null' : value }}</label>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'tri-state-checkbox-basic-demo',
    templateUrl: './tri-state-checkbox-basic-demo.html',
    standalone: true,
    imports: [FormsModule, TriStateCheckboxModule]
})
export class TriStateCheckboxBasicDemo {
    value: boolean | null = null;
}`
    };
}
