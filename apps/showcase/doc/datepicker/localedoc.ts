import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'datepicker-local-demo',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Locale for different languages and formats is defined globally, refer to the
                <a href="/configuration/#locale">PrimeNG Locale</a> configuration for more information.
            </p>
        </app-docsectiontext>
    `
})
export class LocaleDoc {}
