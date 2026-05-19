import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, InputTextModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputText provides <i>small</i> and <i>large</i> sizes as alternatives to the standard.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4 ">
            <input pInputText [(ngModel)]="value1" type="text" pSize="small" placeholder="Small" class="h-8" />
            <input pInputText [(ngModel)]="value2" type="text" placeholder="Normal" class="h-10" />
            <input pInputText [(ngModel)]="value3" type="text" pSize="large" placeholder="Large" class="h-11" />
        </div>
        <app-code></app-code>
    `
})
export class SizesDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}
