import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'color-picker-disabled-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, ColorPickerModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-colorpicker [(ngModel)]="color" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="color-picker-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    color: string | undefined;

    code: Code = {
        basic: `<p-colorpicker [(ngModel)]="color" [disabled]="true" />`,

        html: `<div class="card flex justify-center">
    <p-colorpicker [(ngModel)]="color" [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
    selector: 'color-picker-format-demo',
    templateUrl: './color-picker-format-demo.html',
    standalone: true,
    imports: [FormsModule, ColorPicker]
})
export class ColorPickerDisabledDemo {
    color: string | undefined;
}`
    };
}
