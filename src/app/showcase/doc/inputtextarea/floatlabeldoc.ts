import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputtextarea-floatlabel-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <span class="p-float-label">
                <textarea id="float-input" rows="5" cols="30" pInputTextarea></textarea>
                <label for="float-input">Summary</label>
            </span>
        </div>
        <app-code [code]="code" selector="inputtextarea-floatlabel-demo"></app-code>
    </div>`
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
    selector: 'inputtextarea-floatlabel-demo',
    templateUrl: './inputtextarea-floatlabel-demo.html',
    styleUrls: ['./inputtextarea-floatlabel-demo.scss']
})

export class InputtextareaFloatlabelDemo {
}`
    };
}
