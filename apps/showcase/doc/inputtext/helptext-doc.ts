import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'helptext-doc',
    standalone: true,
    imports: [FormsModule, InputTextModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>An advisory text can be defined with the semantic <i>small</i> tag.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <div class="flex flex-col gap-2">
                    <label for="username" class="text-sm">Username</label>
                    <input pInputText id="username" aria-describedby="username-help" [(ngModel)]="value" />
                    <small id="username-help" class="text-sm">Enter your username to reset your password.</small>
                </div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class HelpTextDoc {
    value: string | undefined;
}
