import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'filled-doc',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex flex-column gap-3 align-items-center">
            <p-triStateCheckbox [(ngModel)]="value" inputId="tricheckbox" />
            <label for="tricheckbox">{{ value === null ? 'null' : value }}</label>
        </div>
        <app-code [code]="code" selector="tri-state-checkbox-filled-demo"></app-code>
    `
})
export class FilledDoc {
    value: boolean | null = null;

    code: Code = {
        basic: `<p-triStateCheckbox [(ngModel)]="value" inputId="tricheckbox" />`,

        html: `<div class="card flex flex-column gap-3 align-items-center">
    <p-triStateCheckbox [(ngModel)]="value" inputId="tricheckbox" />
    <label for="tricheckbox">{{ value === null ? 'null' : value }}</label>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'tri-state-checkbox-filled-demo',
    templateUrl: './tri-state-checkbox-filled-demo.html',
    standalone: true,
    imports: [FormsModule, TriStateCheckboxModule]
})
export class TriStateCheckboxFilledDemo {
    value: boolean | null = null;
}`
    };
}
