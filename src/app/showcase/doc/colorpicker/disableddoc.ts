import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'colorpicker-disabled-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-colorPicker [(ngModel)]="color" [disabled]="true"></p-colorPicker>
        </div>
        <app-code [code]="code" selector="colorpicker-disabled-demo"></app-code>
    </div>`
})
export class DisabledDoc {
    @Input() id: string;

    @Input() title: string;

    color: string;

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
    selector: 'colorpicker-disabled-demo',
    templateUrl: './colorpicker-disabled-demo.html',
    styleUrls: ['./colorpicker-disabled-demo.scss']
})
export class ColorpickerDisabledDemo {
    color: string;
}`
    };
}
