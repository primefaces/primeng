import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';

@Component({
    selector: 'filled-doc',
    standalone: true,
    imports: [FormsModule, PasswordModule, AppCode, AppDocSectionText, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-password [(ngModel)]="value" [feedback]="false" variant="filled" autocomplete="off" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class FilledDoc {
    value!: string;
}
