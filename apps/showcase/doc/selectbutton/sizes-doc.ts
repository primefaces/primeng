import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, SelectButton, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>SelectButton provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center gap-4">
                <p-selectbutton [(ngModel)]="value1" [options]="options" size="small" />
                <p-selectbutton [(ngModel)]="value2" [options]="options" />
                <p-selectbutton [(ngModel)]="value3" [options]="options" size="large" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
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
