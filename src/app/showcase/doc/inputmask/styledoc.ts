import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Styling is same as <a href="#" [routerLink]="['/inputtext']">inputtext component</a>, for theming classes visit <a href="#" [routerLink]="['/theming']">theming page</a>.</p>
        </app-docsectiontext>
    </section>`
})
export class StyleDoc {
    @Input() id: string;

    @Input() title: string;
}
