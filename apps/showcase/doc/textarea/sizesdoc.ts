import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Textarea provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <textarea pTextarea [(ngModel)]="value1" pSize="small" placeholder="Small" rows="3"></textarea>
            <textarea pTextarea [(ngModel)]="value2" placeholder="Normal" rows="3"></textarea>
            <textarea pTextarea [(ngModel)]="value3" pSize="large" placeholder="Large" rows="3"></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-basic-demo"></app-code>
    `
})
export class SizesDoc {
    value1!: string;

    value2!: string;

    value3!: string;

    code: Code = {
        basic: `<textarea pTextarea [(ngModel)]="value1" pSize="small" placeholder="Small" rows="3"></textarea>
<textarea pTextarea [(ngModel)]="value2" placeholder="Normal" rows="3"></textarea>
<textarea pTextarea [(ngModel)]="value3" pSize="large" placeholder="Large" rows="3"></textarea>`,

        html: `<div class="card flex flex-col items-center gap-4">
    <textarea pTextarea [(ngModel)]="value1" pSize="small" placeholder="Small" rows="3"></textarea>
    <textarea pTextarea [(ngModel)]="value2" placeholder="Normal" rows="3"></textarea>
    <textarea pTextarea [(ngModel)]="value3" pSize="large" placeholder="Large" rows="3"></textarea>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-textarea-sizes-demo',
    templateUrl: './input-textarea-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, TextareaModule]
})

export class InputTextareaSizesDemo {
    value1!: string;

    value2!: string;

    value3!: string;
}`
    };
}
