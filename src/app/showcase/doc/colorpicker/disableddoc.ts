import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'color-picker-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-colorPicker [(ngModel)]="color" [disabled]="true"></p-colorPicker>
        </div>
        <app-code [code]="code" selector="color-picker-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    color: string | undefined;

    code: Code = {
        basic: `
<p-colorPicker [(ngModel)]="color" [disabled]="true"></p-colorPicker>`,

        html: `
<div class="card flex justify-content-center">
    <p-colorPicker [(ngModel)]="color" [disabled]="true"></p-colorPicker>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'color-picker-disabled-demo',
    templateUrl: './color-picker-disabled-demo.html'
})
export class ColorPickerDisabledDemo {
    color: string | undefined;
}`
    };
}
