import { Component, Input } from '@angular/core';

@Component({
    selector: 'calendar-local-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Locale for different languages and formats is defined globally, refer to the <a [routerLink]="'/locale'">PrimeNG Locale</a> configuration for more information.</p>
        </app-docsectiontext>
    </section>`
})
export class LocaleDoc {
    @Input() id: string;

    @Input() title: string;
}
