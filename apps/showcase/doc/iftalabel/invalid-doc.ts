import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'invalid-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, FormsModule, IftaLabelModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>When the form element is invalid, the label is also highlighted.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-iftalabel>
                    <input pInputText id="username" [(ngModel)]="value" [invalid]="!value" autocomplete="off" />
                    <label for="username">Username</label>
                </p-iftalabel>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class InvalidDoc {
    value: string | undefined;
}
