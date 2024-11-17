import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-togglebutton [(ngModel)]="checked" onIcon="pi pi-check" offIcon="pi pi-times" class="ng-invalid ng-dirty" styleClass="w-full sm:w-40" aria-label="Confirmation" />
        </div>
        <app-code [code]="code" selector="toggle-button-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-togglebutton [(ngModel)]="checked" onIcon="pi pi-check" offIcon="pi pi-times" class="ng-invalid ng-dirty" styleClass="w-full sm:w-40" aria-label="Confirmation" />`,

        html: `<div class="card flex justify-center">
    <p-togglebutton [(ngModel)]="checked" onIcon="pi pi-check" offIcon="pi pi-times" class="ng-invalid ng-dirty" styleClass="w-full sm:w-40" aria-label="Confirmation" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    selector: 'toggle-button-invalid-demo',
    templateUrl: './toggle-button-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleButtonModule]
})
export class ToggleButtonInvalidDemo {
    checked: boolean = false;
}`
    };
}
