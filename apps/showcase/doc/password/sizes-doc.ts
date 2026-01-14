import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, PasswordModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Password provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-password [(ngModel)]="value1" type="text" size="small" placeholder="Small" />
            <p-password [(ngModel)]="value2" type="text" placeholder="Normal" />
            <p-password [(ngModel)]="value3" type="text" size="large" placeholder="Large" />
        </div>
        <app-code></app-code>
    `
})
export class SizesDoc {
    value1: string;

    value2: string;

    value3: string;
}
