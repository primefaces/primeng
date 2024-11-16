import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'color-picker-inline-demo',
    template: `
        <app-docsectiontext>
            <p>ColorPicker is displayed as a popup by default, add <i>inline</i> property to customize this behavior.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-colorpicker [(ngModel)]="color" [inline]="true" />
        </div>
        <app-code [code]="code" selector="color-picker-inline-demo"></app-code>
    `
})
export class InlineDoc {
    color: string | undefined;

    code: Code = {
        basic: `<p-colorpicker [(ngModel)]="color" [inline]="true" />`,

        html: `<div class="card flex justify-center">
    <p-colorpicker [(ngModel)]="color" [inline]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
    selector: 'color-picker-inline-demo',
    templateUrl: './color-picker-inline-demo.html',
    standalone: true,
    imports: [FormsModule, ColorPicker]
})
export class ColorPickerInlineDemo {
    color: string | undefined;
}`
    };
}
