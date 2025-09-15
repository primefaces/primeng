import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'color-picker-basic-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, ColorPickerModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>ColorPicker is used as a controlled input with <i>ngModel</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-colorpicker [(ngModel)]="color" />
        </div>
        <app-code [code]="code" selector="color-picker-basic-demo"></app-code>
    `
})
export class BasicDoc {
    color: string | undefined;

    code: Code = {
        basic: `<p-colorpicker [(ngModel)]="color" />`,

        html: `<div class="card flex justify-center">
    <p-colorpicker [(ngModel)]="color" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
    selector: 'color-picker-basic-demo',
    templateUrl: './color-picker-basic-demo.html',
    standalone: true,
    imports: [FormsModule, ColorPicker]
})
export class ColorPickerBasicDemo {
    color: string | undefined;
}`
    };
}
