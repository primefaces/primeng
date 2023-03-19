import { Component, Input } from '@angular/core';

@Component({
    selector: 'repository-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Ready to use settings for locales are available at the community supported <a href="https://github.com/primefaces/primelocale">PrimeLocale</a> repository. We'd appreciate if you could contribute to this repository with pull requests
                and share it with the rest of the community.
            </p>
        </app-docsectiontext>
    </section>`
})
export class RepositoryDoc {
    @Input() id: string;

    @Input() title: string;
}
