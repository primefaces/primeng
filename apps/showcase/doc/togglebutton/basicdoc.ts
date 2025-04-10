import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way binding to a boolean property is defined using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-togglebutton [(ngModel)]="checked" onLabel="On" offLabel="Off" styleClass="w-24" />
        </div>
        <app-code [code]="code" selector="toggle-button-basic-demo"></app-code>
    `
})
export class BasicDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-togglebutton [(ngModel)]="checked" onLabel="On" offLabel="Off" styleClass="w-24" />`,

        html: `<div class="card flex justify-center">
    <p-togglebutton [(ngModel)]="checked" onLabel="On" offLabel="Off" styleClass="w-24" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButton } from 'primeng/togglebutton';

@Component({
    selector: 'toggle-button-basic-demo',
    templateUrl: './toggle-button-basic-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleButton]
})
export class ToggleButtonBasicDemo {
    checked: boolean = false;
}`
    };
}
