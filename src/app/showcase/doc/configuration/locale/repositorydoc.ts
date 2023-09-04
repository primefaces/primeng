import { Component, Input, ViewChild } from '@angular/core';
import { AppDocSectionTextComponent } from 'src/app/showcase/layout/doc/docsectiontext/app.docsectiontext.component';

@Component({
    selector: 'repository-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
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

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;
}
