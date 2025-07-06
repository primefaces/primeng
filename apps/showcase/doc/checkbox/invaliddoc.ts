import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-invalid-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-checkbox [(ngModel)]="checked" [binary]="true" [invalid]="!checked" />
        </div>
        <app-code [code]="code" selector="checkbox-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-checkbox [(ngModel)]="checked" [binary]="true" [invalid]="!checked" />`,

        html: `<div class="card flex justify-center">
    <p-checkbox [(ngModel)]="checked" [binary]="true" [invalid]="!checked" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-invalid-demo',
    templateUrl: './checkbox-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, Checkbox]
})
export class CheckboxInvalidDemo {
    checked: boolean = false;
}`
    };
}
