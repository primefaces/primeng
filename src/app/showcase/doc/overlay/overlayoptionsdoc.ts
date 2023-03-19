import { Component, Input } from '@angular/core';

@Component({
    selector: 'options-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
    </section>`
})
export class OptionsDoc {
    @Input() id: string;

    @Input() title: string;
}
