import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'invalid-doc',
    standalone: true,
    imports: [FormsModule, ToggleSwitchModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toggleswitch [(ngModel)]="checked" [invalid]="!checked" />
        </div>
        <app-code [code]="code" selector="toggle-switch-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-toggleswitch [(ngModel)]="checked" [invalid]="!checked" />`,

        html: `<div class="card flex justify-center">
    <p-toggleswitch [(ngModel)]="checked" [invalid]="!checked" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'toggle-switch-invalid-demo',
    templateUrl: './toggle-switch-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleSwitch]
})
export class ToggleSwitchInvalidDemo {
    checked: boolean = false;
}`
    };
}
