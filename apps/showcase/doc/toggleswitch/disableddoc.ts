import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'disabled-doc',
    standalone: true,
    imports: [FormsModule, ToggleSwitchModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toggleswitch [(ngModel)]="checked" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="toggle-switch-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-toggleswitch [(ngModel)]="checked" [disabled]="true" />`,

        html: `<div class="card flex justify-center">
    <p-toggleswitch [(ngModel)]="checked" [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'toggle-switch-disabled-demo',
    templateUrl: './toggle-switch-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleSwitch]
})
export class ToggleSwitchDisabledDemo {
    checked: boolean = false;
}`
    };
}
