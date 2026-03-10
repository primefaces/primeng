import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, CheckboxModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Checkbox provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap justify-center gap-4">
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
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SizesDoc {
    size: any = null;
}
