import { Component, Input } from '@angular/core';

@Component({
    selector: 'options-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
    </div>`
})
export class OptionsDoc {
    @Input() id: string;

    @Input() title: string;
}
