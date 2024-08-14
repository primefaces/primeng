import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'preselection-doc',
    template: `
        <app-docsectiontext>
            <p>Enabling <i>ngModel</i> property displays the component as active initially.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toggleSwitch [(ngModel)]="checked" />
        </div>
        <app-code [code]="code" selector="toggle-switch-preselection-demo"></app-code>
    `
})
export class PreselectionDoc {
    checked: boolean = true;

    code: Code = {
        basic: `<p-toggleSwitch [(ngModel)]="checked" />`,

        html: `<div class="card flex justify-content-center">
    <p-toggleSwitch [(ngModel)]="checked" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'toggle-switch-preselection-demo',
    templateUrl: './toggle-switch-preselection-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleSwitchModule]
})
export class ToggleSwitchPreselectionDemo {
    checked: boolean = true;
}`
    };
}
