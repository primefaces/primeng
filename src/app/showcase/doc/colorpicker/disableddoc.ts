import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'color-picker-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-colorPicker [(ngModel)]="color" [disabled]="true"/>
        </div>
        <app-code [code]="code" selector="color-picker-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    color: string | undefined;

    code: Code = {
        basic: `<p-colorPicker [(ngModel)]="color" [disabled]="true"/>`,

        html: `<div class="card flex justify-content-center">
    <p-colorPicker [(ngModel)]="color" [disabled]="true"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
    selector: 'color-picker-format-demo',
    templateUrl: './color-picker-format-demo.html',
    standalone: true,
    imports: [FormsModule, ColorPickerModule]
})
export class ColorPickerDisabledDemo {
    color: string | undefined;
}`
    };
}
