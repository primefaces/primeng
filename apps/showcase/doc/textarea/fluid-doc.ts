import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, AppCode, AppDocSectionText, AppDemoWrapper, TextareaModule],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <textarea rows="5" cols="30" pTextarea [(ngModel)]="value" fluid></textarea>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class FluidDoc {
    value!: string;
}
