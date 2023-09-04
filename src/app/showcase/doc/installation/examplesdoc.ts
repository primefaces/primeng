import { Component, Input } from '@angular/core';

@Component({
    selector: 'examples-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>An example start with Angular CLI is available at <a href="https://github.com/primefaces/primeng-quickstart-cli">github</a>.</p>
        </app-docsectiontext>
    </section>`
})
export class ExamplesDoc {
    @Input() id: string;

    @Input() title: string;
}
