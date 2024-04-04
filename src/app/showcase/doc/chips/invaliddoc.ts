import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'chips-invalid-demo',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="values" class="ng-invalid ng-dirty" />
        </div>
        <app-code [code]="code" selector="chips-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    values: string[] | undefined;

    code: Code = {
        basic: `<p-chips [(ngModel)]="values" class="ng-invalid ng-dirty" />`,

        html: `<div class="card p-fluid">
    <p-chips [(ngModel)]="values" class="ng-invalid ng-dirty" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

@Component({
    selector: 'chips-invalid-demo',
    templateUrl: './chips-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, ChipsModule]
})
export class ChipsInvalidDemo {
    values: string[] | undefined;
}`
    };
}
