import { Component, Input } from '@angular/core';

@Component({
    selector: 'calendar-local-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Locale for different languages and formats is defined globally, refer to the <a href="/configuration/#locale">PrimeNG Locale</a> configuration for more information.</p>
        </app-docsectiontext>
    </section>`
})
export class LocaleDoc {
    @Input() id: string;

    @Input() title: string;
}
