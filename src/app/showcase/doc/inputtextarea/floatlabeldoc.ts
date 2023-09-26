import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'floatlabel-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <span class="p-float-label">
                <textarea id="float-input" rows="5" cols="30" pInputTextarea></textarea>
                <label for="float-input">Summary</label>
            </span>
        </div>
        <app-code [code]="code" selector="input-textarea-floatlabel-demo"></app-code>
    </section>`
})
export class FloatlabelDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<span class="p-float-label">
    <textarea id="float-input" rows="5" cols="30" pInputTextarea></textarea>
    <label for="float-input">Summary</label>
</span>`,

        html: `
<div class="card flex justify-content-center">
    <span class="p-float-label">
        <textarea id="float-input" rows="5" cols="30" pInputTextarea></textarea>
        <label for="float-input">Summary</label>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: ': 'input-textarea-floatlabel-demo',
    templateUrl: './: 'input-textarea-floatlabel-demo.html'
})
export class InputTextareaFloatlabelDemo {
}`
    };
}
