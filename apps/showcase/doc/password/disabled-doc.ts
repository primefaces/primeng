import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';

@Component({
    selector: 'disabled-doc',
    standalone: true,
    imports: [FormsModule, PasswordModule, AppCode, AppDocSectionText, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-password [(ngModel)]="value" [disabled]="true" placeholder="Disabled" autocomplete="off" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class DisabledDoc {
    value!: string;
}
