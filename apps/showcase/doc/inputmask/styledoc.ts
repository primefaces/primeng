import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'input-mask-style-doc',
    standalone: true,
    imports: [RouterModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Styling is same as <a href="#" [routerLink]="['/inputtext']">inputtext component</a>, for theming classes visit <a href="#" [routerLink]="['/theming']">theming page</a>.</p>
        </app-docsectiontext>
    `
})
export class StyleDoc {}
