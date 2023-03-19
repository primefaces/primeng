import { Component, Input } from '@angular/core';

@Component({
    selector: 'navigator-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Navigators are used to move back and forth between the images.</p>
        </app-docsectiontext>
    </section>`
})
export class NavigatorDoc {
    @Input() id: string;

    @Input() title: string;
}
