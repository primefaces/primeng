import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'invalid-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <input pInputText [(ngModel)]="value1" [invalid]="!value1" placeholder="Name" />
            <input pInputText [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Name" />
        </div>
        <app-code [code]="code" selector="input-text-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value1: string | undefined;

    value2: string | undefined;

    code: Code = {
        basic: `<input pInputText [(ngModel)]="value1" [invalid]="!value1" placeholder="Name" />
<input pInputText [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Name" />`,

        html: `<div class="card flex flex-wrap justify-center gap-4">
    <input pInputText [(ngModel)]="value1" [invalid]="!value1" placeholder="Name" />
    <input pInputText [(ngModel)]="value2" [invalid]="!value2" variant="filled" placeholder="Name" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-text-invalid-demo',
    templateUrl: './input-text-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule]
})
export class InputTextInvalidDemo {
    value1: string | undefined;

    value2: string | undefined;
}`
    };
}
