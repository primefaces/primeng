import { Component, Input } from '@angular/core';

@Component({
    selector: 'navigator-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Navigators are used to move back and forth between the images.</p>
        </app-docsectiontext>
    </div>`
})
export class NavigatorDoc {
    @Input() id: string;

    @Input() title: string;
}
