import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'color-picker-basic-demo',
    template: `
        <app-docsectiontext>
            <p>ColorPicker is used as a controlled input with <i>ngModel</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-colorPicker [(ngModel)]="color"></p-colorPicker>
        </div>
        <app-code [code]="code" selector="color-picker-basic-demo"></app-code>
    `
})
export class BasicDoc {
    color: string | undefined;

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
    selector: 'color-picker-basic-demo',
    templateUrl: './color-picker-basic-demo.html'
})
export class ColorPickerBasicDemo {
    color: string | undefined;
}`
    };
}
