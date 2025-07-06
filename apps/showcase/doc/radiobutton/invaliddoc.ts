import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-radiobutton [(ngModel)]="value" [invalid]="!value" />
        </div>
        <app-code [code]="code" selector="radio-button-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value: boolean = false;

    code: Code = {
        basic: `<p-radiobutton [(ngModel)]="value" [invalid]="!value"  />`,

        html: `<div class="card flex justify-center">
    <p-radiobutton [(ngModel)]="value" [invalid]="!value"  />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'radio-button-invalid-demo',
    templateUrl: './radio-button-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, RadioButton]
})
export class RadioButtonInvalidDemo {
    value : boolean = false;
}`
    };
}
