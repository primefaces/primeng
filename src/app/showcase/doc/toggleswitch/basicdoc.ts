import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using <i>ngModel</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toggleSwitch [(ngModel)]="checked" />
        </div>
        <app-code [code]="code" selector="toggle-switch-basic-demo"></app-code>
    `
})
export class BasicDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-toggleSwitch [(ngModel)]="checked" />`,

        html: `<div class="card flex justify-center">
    <p-toggleSwitch [(ngModel)]="checked" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'toggle-switch-basic-demo',
    templateUrl: './toggle-switch-basic-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleSwitchModule]
})
export class ToggleSwitchBasicDemo {
    checked: boolean = false;
}`
    };
}
