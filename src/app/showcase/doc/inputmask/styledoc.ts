import { Component } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: `
        <app-docsectiontext>
            <p>Styling is same as <a href="#" [routerLink]="['/inputtext']">inputtext component</a>, for theming classes visit <a href="#" [routerLink]="['/theming']">theming page</a>.</p>
        </app-docsectiontext>
    `
})
export class StyleDoc {}
