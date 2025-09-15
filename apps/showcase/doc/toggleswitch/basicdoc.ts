import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FormsModule, ToggleSwitchModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using <i>ngModel</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toggleswitch [(ngModel)]="checked" />
        </div>
        <app-code [code]="code" selector="toggle-switch-basic-demo"></app-code>
    `
})
export class BasicDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-toggleswitch [(ngModel)]="checked" />`,

        html: `<div class="card flex justify-center">
    <p-toggleswitch [(ngModel)]="checked" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'toggle-switch-basic-demo',
    templateUrl: './toggle-switch-basic-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleSwitch]
})
export class ToggleSwitchBasicDemo {
    checked: boolean = false;
}`
    };
}
