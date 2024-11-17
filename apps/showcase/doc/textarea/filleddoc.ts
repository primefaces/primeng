import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'filled-doc',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <textarea [(ngModel)]="value" [variant]="'filled'" rows="5" cols="30" pTextarea></textarea>
        </div>
        <app-code [code]="code" selector="input-textarea-filled-demo"></app-code>
    `
})
export class FilledDoc {
    value!: string;

    code: Code = {
        basic: `<textarea [(ngModel)]="value" variant="filled" rows="5" cols="30" pTextarea></textarea>`,

        html: `<div class="card flex justify-center">
    <textarea [(ngModel)]="value" variant="filled" rows="5" cols="30" pTextarea></textarea>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Textarea } from 'primeng/textearea';;
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-textarea-filled-demo',
    templateUrl: './input-textarea-filled-demo.html',
    standalone: true,
    imports: [FormsModule, Textarea]
})

export class InputTextareaFilledDemo {
    value!: string;
}`
    };
}
