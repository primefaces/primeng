import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'locale-doc',
    standalone: true,
    imports: [FormsModule, PasswordModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Labels are translated at component level by <i>promptLabel</i>, <i>weakLabel</i>, <i>mediumLabel</i> and <i>strongLabel</i> properties. In order to apply global translations for all Password components in the application, refer to the
                <a href="/configuration/#locale">locale</a>
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-password [(ngModel)]="value" promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password" autocomplete="off" />
        </div>
        <app-code></app-code>
    `
})
export class LocaleDoc {
    value!: string;
}
