import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toggleSwitch [(ngModel)]="checked" class="ng-dirty ng-invalid" />
        </div>
        <app-code [code]="code" selector="toggle-switch-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-toggleSwitch [(ngModel)]="checked" class="ng-dirty ng-invalid" />`,

        html: `<div class="card flex justify-center">
    <p-toggleSwitch [(ngModel)]="checked" class="ng-dirty ng-invalid" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'toggle-switch-invalid-demo',
    templateUrl: './toggle-switch-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleSwitchModule]
})
export class ToggleSwitchInvalidDemo {
    checked: boolean = false;
}`
    };
}
