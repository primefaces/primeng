import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'preselection-doc',
    template: `
        <app-docsectiontext>
            <p>Enabling <i>ngModel</i> property displays the component as active initially.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked" />
        </div>
        <app-code [code]="code" selector="input-switch-preselection-demo"></app-code>
    `
})
export class PreselectionDoc {
    checked: boolean = true;

    code: Code = {
        basic: `<p-inputSwitch [(ngModel)]="checked"/>`,

        html: `<div class="card flex justify-content-center">
    <p-inputSwitch [(ngModel)]="checked"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-switch-preselection-demo',
    templateUrl: './input-switch-preselection-demo.html',
    standalone: true,
    imports: [FormsModule, InputSwitchModule]
})
export class InputSwitchPreselectionDemo {
    checked: boolean = true;
}`
    };
}
