import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'color-picker-format-demo',
    template: `
        <app-docsectiontext>
            <p>Default color format to use in value binding is <i>hex</i> and other possible values can be <i>rgb</i> and <i>hsb</i> using the <i>format</i> property.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4">
            <div class="flex-1 flex flex-col items-center">
                <label for="cp-hex" class="font-bold block mb-2"> HEX </label>
                <p-colorpicker [(ngModel)]="color" inputId="cp-hex" />
                <span>{{ color }}</span>
            </div>
            <div class="flex-1 flex flex-col items-center">
                <label for="cp-rgb" class="font-bold block mb-2"> RGB </label>
                <p-colorpicker [(ngModel)]="colorRGB" format="rgb" inputId="cp-rgb" />
                <span>{{ 'r:' + colorRGB.r + ' g:' + colorRGB.g + ' b:' + colorRGB.b }}</span>
            </div>
            <div class="flex-1 flex flex-col items-center">
                <label for="cp-hsb" class="font-bold block mb-2"> HSB </label>
                <p-colorpicker [(ngModel)]="colorHSB" format="hsb" inputId="cp-hsb" />
                <span>{{ 'h:' + colorHSB.h + ' s:' + colorHSB.s + ' b:' + colorHSB.b }}</span>
            </div>
        </div>
        <app-code [code]="code" selector="color-picker-format-demo"></app-code>
    `
})
export class FormatDoc {
    color: string = '#6466f1';

    colorRGB: any = { r: 100, g: 102, b: 241 };

    colorHSB: any = { h: 239, s: 59, b: 95 };

    code: Code = {
        basic: `<p-colorpicker [(ngModel)]="color" inputId="cp-hex" />

<p-colorpicker [(ngModel)]="colorRGB" format="rgb" inputId="cp-rgb" />

<p-colorpicker [(ngModel)]="colorHSB" format="hsb" inputId="cp-hsb" />`,

        html: `<div class="card flex flex-wrap gap-4">
    <div class="flex-1 flex flex-col items-center">
        <label for="cp-hex" class="font-bold block mb-2"> HEX </label>
        <p-colorpicker [(ngModel)]="color" inputId="cp-hex" />
        <span>{{ color }}</span>
    </div>
    <div class="flex-1 flex flex-col items-center">
        <label for="cp-rgb" class="font-bold block mb-2"> RGB </label>
        <p-colorpicker [(ngModel)]="colorRGB" format="rgb" inputId="cp-rgb" />
        <span>{{ 'r:' + colorRGB.r + ' g:' + colorRGB.g + ' b:' + colorRGB.b }}</span>
    </div>
    <div class="flex-1 flex flex-col items-center">
        <label for="cp-hsb" class="font-bold block mb-2"> HSB </label>
        <p-colorpicker [(ngModel)]="colorHSB" format="hsb" inputId="cp-hsb" />
        <span>{{ 'h:' + colorHSB.h + ' s:' + colorHSB.s + ' b:' + colorHSB.b }}</span>
    </div>
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
export class ColorPickerFormatDemo {
    color: string = '#6466f1';

    colorRGB: any = { r: 100, g: 102, b: 241 };

    colorHSB: any = { h: 239, s: 59, b: 95 };
}`
    };
}
