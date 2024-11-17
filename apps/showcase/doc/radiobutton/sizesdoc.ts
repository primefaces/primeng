import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>RadioButton provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                    <p-radiobutton [(ngModel)]="size" inputId="size_small" name="size" value="Small" size="small" />
                    <label for="size_small" class="text-sm">Small</label>
                </div>
                <div class="flex items-center gap-2">
                    <p-radiobutton [(ngModel)]="size" inputId="size_normal" name="size" value="Normal" />
                    <label for="size_normal">Normal</label>
                </div>
                <div class="flex items-center gap-2">
                    <p-radiobutton [(ngModel)]="size" inputId="size_large" name="size" value="Large" size="large" />
                    <label for="size_large" class="text-lg">Large</label>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="radio-button-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    size: any = false;

    code: Code = {
        basic: `<div class="flex flex-wrap gap-4">
    <div class="flex items-center gap-2">
        <p-radiobutton [(ngModel)]="size" inputId="size_small" name="size" value="Small" size="small" />
        <label for="size_small" class="text-sm">Small</label>
    </div>
    <div class="flex items-center gap-2">
        <p-radiobutton [(ngModel)]="size" inputId="size_normal" name="size" value="Normal" />
        <label for="size_normal">Normal</label>
    </div>
    <div class="flex items-center gap-2">
        <p-radiobutton [(ngModel)]="size" inputId="size_large" name="size" value="Large" size="large" />
        <label for="size_large" class="text-lg">Large</label>
    </div>
</div>`,

        html: `<div class="card flex justify-center">
    <div class="flex flex-wrap gap-4">
        <div class="flex items-center gap-2">
            <p-radiobutton [(ngModel)]="size" inputId="size_small" name="size" value="Small" size="small" />
            <label for="size_small" class="text-sm">Small</label>
        </div>
        <div class="flex items-center gap-2">
            <p-radiobutton [(ngModel)]="size" inputId="size_normal" name="size" value="Normal" />
            <label for="size_normal">Normal</label>
        </div>
        <div class="flex items-center gap-2">
            <p-radiobutton [(ngModel)]="size" inputId="size_large" name="size" value="Large" size="large" />
            <label for="size_large" class="text-lg">Large</label>
        </div>
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'radio-button-sizes-demo',
    templateUrl: './radio-button-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, RadioButton]
})
export class RadioButtonSizesDemo {
    size: any = false;
}`
    };
}
