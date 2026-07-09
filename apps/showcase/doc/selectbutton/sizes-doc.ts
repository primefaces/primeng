import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, SelectButton, AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>SelectButton provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-selectbutton [(ngModel)]="value1" [options]="options" size="small" class="h-8" />
            <p-selectbutton [(ngModel)]="value2" [options]="options" class="h-10" />
            <p-selectbutton [(ngModel)]="value3" [options]="options" size="large" class="h-11" />
        </div>
        <app-code></app-code>
    `
})
export class SizesDoc {
    value1!: string;

    value2: string = 'Beginner';

    value3: string = 'Expert';

    options: any[] = [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Expert', value: 'Expert' }
    ];
}
