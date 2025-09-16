import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, ToggleButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-togglebutton [(ngModel)]="checked" onLabel="On" offLabel="Off" fluid />
        </div>
        <app-code [code]="code" selector="toggle-button-fluid-demo"></app-code>
    `
})
export class FluidDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-togglebutton [(ngModel)]="checked" onLabel="On" offLabel="Off" fluid />`,

        html: `<div class="card flex justify-center">
    <p-togglebutton [(ngModel)]="checked" onLabel="On" offLabel="Off" fluid />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButton } from 'primeng/togglebutton';

@Component({
    selector: 'toggle-button-fluid-demo',
    templateUrl: './toggle-button-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleButton]
})
export class ToggleButtonFluidDemo {
    checked: boolean = false;
}`
    };
}
