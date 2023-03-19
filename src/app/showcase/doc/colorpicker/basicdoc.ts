import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'colorpicker-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>ColorPicker uses ngModel directive to bind a value.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-colorPicker [(ngModel)]="color"></p-colorPicker>
        </div>
        <app-code [code]="code" selector="colorpicker-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    color: string;

    code: Code = {
        basic: `
<p-colorPicker [(ngModel)]="color"></p-colorPicker>`,

        html: `
<div class="card flex justify-content-center">
    <p-colorPicker [(ngModel)]="color"></p-colorPicker>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'colorpicker-basic-demo',
    templateUrl: './colorpicker-basic-demo.html',
    styleUrls: ['./colorpicker-basic-demo.scss']
})
export class ColorpickerBasicDemo {
    color: string;
}`
    };
}
