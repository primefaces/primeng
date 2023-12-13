import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toggleButton disabled="true" onIcon="pi pi-check" offIcon="pi pi-times" [(ngModel)]="checked" onLabel="Yes" offLabel="No" styleClass="w-full sm:w-10rem" aria-label="Confirmation"></p-toggleButton>
        </div>
        <app-code [code]="code" selector="toggle-button-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-toggleButton disabled="true" onIcon="pi pi-check" offIcon="pi pi-times" [(ngModel)]="checked" onLabel="Yes" offLabel="No" styleClass="w-full sm:w-10rem" aria-label="Confirmation"></p-toggleButton>`,

        html: `<div class="card flex justify-content-center">
<p-toggleButton disabled="true" onIcon="pi pi-check" offIcon="pi pi-times" [(ngModel)]="checked" onLabel="Yes" offLabel="No" styleClass="w-full sm:w-10rem" aria-label="Confirmation"></p-toggleButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'toggle-button-disabled-demo',
    templateUrl: './toggle-button-disabled-demo.html'
})
export class ToggleButtonDisabledDemo {
    checked: boolean = false;
}`
    };
}
