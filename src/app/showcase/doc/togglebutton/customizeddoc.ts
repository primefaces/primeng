import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'customized-doc',
    template: `
        <app-docsectiontext>
            <p>Icons and Labels can be customized using <i>onLabel</i>, <i>offLabel</i>, <i>onIcon</i> and <i>offIcon</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toggleButton [(ngModel)]="checked" onLabel="Locked" offLabel="Unlocked" onIcon="pi pi-check" offIcon="pi pi-times" onIcon="pi pi-lock" offIcon="pi pi-lock-open" styleClass="w-36" ariaLabel="Do you confirm" />
        </div>
        <app-code [code]="code" selector="toggle-button-customized-demo"></app-code>
    `
})
export class CustomizedDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-toggleButton 
    [(ngModel)]="checked" 
    onLabel="Locked" 
    offLabel="Unlocked" 
    onIcon="pi pi-check" 
    offIcon="pi pi-times" 
    onIcon="pi pi-lock" 
    offIcon="pi pi-lock-open" 
    styleClass="w-36"
    ariaLabel="Do you confirm" />`,

        html: `<div class="card flex justify-center">
    <p-toggleButton 
        [(ngModel)]="checked" 
        onLabel="Locked"
        offLabel="Unlocked" 
        onIcon="pi pi-check" 
        offIcon="pi pi-times" 
        onIcon="pi pi-lock"
        offIcon="pi pi-lock-open" 
        styleClass="w-36"
        ariaLabel="Do you confirm" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    selector: 'toggle-button-customized-demo',
    templateUrl: './toggle-button-customized-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleButtonModule]
})
export class ToggleButtonCustomizedDemo {
    checked: boolean = false;
}`
    };
}
