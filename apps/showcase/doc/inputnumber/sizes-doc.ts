import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, InputNumberModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputNumber provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center gap-4">
                <p-inputnumber [(ngModel)]="value1" size="small" placeholder="Small" mode="currency" currency="USD" locale="en-US" />
                <p-inputnumber [(ngModel)]="value2" placeholder="Normal" mode="currency" currency="USD" locale="en-US" />
                <p-inputnumber [(ngModel)]="value3" size="large" placeholder="Large" mode="currency" currency="USD" locale="en-US" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SizesDoc {
    value1!: number;

    value2!: number;

    value3!: number;
}
