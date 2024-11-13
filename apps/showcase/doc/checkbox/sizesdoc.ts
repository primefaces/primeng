import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-sizes-demo',
    template: `
        <app-docsectiontext>
            <p>Checkbox provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <div class="flex items-center gap-2">
                <p-checkbox [(ngModel)]="size" inputId="size_small" name="size" value="Small" size="small" />
                <label for="size_small" class="text-sm">Small</label>
            </div>
            <div class="flex items-center gap-2">
                <p-checkbox [(ngModel)]="size" inputId="size_normal" name="size" value="Normal" />
                <label for="size_normal">Normal</label>
            </div>
            <div class="flex items-center gap-2">
                <p-checkbox [(ngModel)]="size" inputId="size_large" name="size" value="Large" size="large" />
                <label for="size_large" class="text-lg">Large</label>
            </div>
        </div>
        <app-code [code]="code" selector="checkbox-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    size: any = null;

    code: Code = {
        basic: `<div class="flex items-center gap-2">
    <p-checkbox [(ngModel)]="size" inputId="size_small" name="size" value="Small" size="small" />
    <label for="size_small" class="text-sm">Small</label>
</div>
<div class="flex items-center gap-2">
    <p-checkbox [(ngModel)]="size" inputId="size_normal" name="size" value="Normal" />
    <label for="size_normal">Normal</label>
</div>
<div class="flex items-center gap-2">
    <p-checkbox [(ngModel)]="size" inputId="size_large" name="size" value="Large" size="large" />
    <label for="size_large" class="text-lg">Large</label>
</div>`,

        html: `<div class="card flex flex-wrap justify-center gap-4">
    <div class="flex items-center gap-2">
        <p-checkbox [(ngModel)]="size" inputId="size_small" name="size" value="Small" size="small" />
        <label for="size_small" class="text-sm">Small</label>
    </div>
    <div class="flex items-center gap-2">
        <p-checkbox [(ngModel)]="size" inputId="size_normal" name="size" value="Normal" />
        <label for="size_normal">Normal</label>
    </div>
    <div class="flex items-center gap-2">
        <p-checkbox [(ngModel)]="size" inputId="size_large" name="size" value="Large" size="large" />
        <label for="size_large" class="text-lg">Large</label>
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-sizes-demo',
    templateUrl: './checkbox-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, Checkbox]
})
export class CheckboxSizesDemo {
    size: any = null;
}`
    };
}
