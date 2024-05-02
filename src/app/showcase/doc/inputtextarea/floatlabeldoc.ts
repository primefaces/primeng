import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-floatLabel>
                <textarea id="float-input" rows="5" cols="30" pInputTextarea></textarea>
                <label for="float-input">Summary</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="input-textarea-floatlabel-demo"></app-code>
    `
})
export class FloatlabelDoc {
    code: Code = {
        basic: `<p-floatLabel>
    <textarea 
        id="float-input" 
        rows="5" cols="30" 
        pInputTextarea>
    </textarea>
    <label for="float-input">Summary</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-content-center">
    <p-floatLabel>
        <textarea 
            id="float-input" 
            rows="5"
            cols="30" 
            pInputTextarea>
        </textarea>
        <label for="float-input">Summary</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: ': 'input-textarea-floatlabel-demo',
    templateUrl: './: 'input-textarea-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextareaModule, FloatLabelModule]
})
export class InputTextareaFloatlabelDemo {
}`
    };
}
