import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>ToggleButton provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-togglebutton [(ngModel)]="value1" onLabel="On" offLabel="Off" size="small" styleClass="min-w-16" />
            <p-togglebutton [(ngModel)]="value2" onLabel="On" offLabel="Off" styleClass="min-w-20" />
            <p-togglebutton [(ngModel)]="value3" onLabel="On" offLabel="Off" size="large" styleClass="min-w-24" />
        </div>
        <app-code [code]="code" selector="toggle-button-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value1: boolean = false;

    value2: boolean = false;

    value3: boolean = false;

    code: Code = {
        basic: `<p-togglebutton [(ngModel)]="value1" onLabel="On" offLabel="Off" size="small" styleClass="min-w-16" />
<p-togglebutton [(ngModel)]="value2" onLabel="On" offLabel="Off" styleClass="min-w-20" />
<p-togglebutton [(ngModel)]="value3" onLabel="On" offLabel="Off" size="large" styleClass="min-w-24" />`,

        html: `<div class="card flex flex-col items-center gap-4">
    <p-togglebutton [(ngModel)]="value1" onLabel="On" offLabel="Off" size="small" styleClass="min-w-16" />
    <p-togglebutton [(ngModel)]="value2" onLabel="On" offLabel="Off" styleClass="min-w-20" />
    <p-togglebutton [(ngModel)]="value3" onLabel="On" offLabel="Off" size="large" styleClass="min-w-24" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButton } from 'primeng/togglebutton';

@Component({
    selector: 'toggle-button-sizes-demo',
    templateUrl: './toggle-button-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleButton]
})
export class ToggleButtonSizesDemo {
    value1: boolean = false;

    value2: boolean = false;

    value3: boolean = false;
}`
    };
}
