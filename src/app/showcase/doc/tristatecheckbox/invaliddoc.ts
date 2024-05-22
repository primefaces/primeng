import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex flex-column gap-3 align-items-center">
            <p-triStateCheckbox [(ngModel)]="value" inputId="tricheckbox" class="ng-dirty ng-invalid" />
            <label for="tricheckbox">{{ value === null ? 'null' : value }}</label>
        </div>
        <app-code [code]="code" selector="tri-state-checkbox-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value: boolean | null = null;

    code: Code = {
        basic: `<p-triStateCheckbox 
    [(ngModel)]="value" 
    inputId="tricheckbox" 
    class="ng-dirty ng-invalid" />
<label for="tricheckbox">
    {{ value === null ? 'null' : value }}
</label>`,

        html: `<div class="card flex flex-column gap-3 align-items-center">
    <p-triStateCheckbox 
        [(ngModel)]="value"
        inputId="tricheckbox" 
        class="ng-dirty ng-invalid" />
    <label for="tricheckbox">
        {{ value === null ? 'null' : value }}
    </label>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'tri-state-checkbox-invalid-demo',
    templateUrl: './tri-state-checkbox-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, TriStateCheckboxModule]
})
export class TriStateCheckboxInvalidDemo {
    value: boolean | null = null;
}`
    };
}
