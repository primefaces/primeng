import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-radiobutton [(ngModel)]="value" [value]="1" [disabled]="true" />
            <p-radiobutton [(ngModel)]="value" [value]="2" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="radio-button-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    value: number = 2;

    code: Code = {
        basic: `<p-radiobutton [(ngModel)]="value" [value]="1" [disabled]="true" />
<p-radiobutton [(ngModel)]="value" [value]="2" [disabled]="true" />`,

        html: `<div class="card flex justify-center gap-2">
    <p-radiobutton [(ngModel)]="value" [value]="1" [disabled]="true" />
    <p-radiobutton [(ngModel)]="value" [value]="2" [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'radio-button-disabled-demo',
    templateUrl: './radio-button-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, RadioButton]
})
export class RadioButtonDisabledDemo { }`
    };
}
