import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'numberofstars-doc',
    standalone: true,
    imports: [FormsModule, RatingModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Number of stars to display is defined with <i>stars</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-rating [(ngModel)]="value" [stars]="10" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class NumberOfStarsDoc {
    value: number = 5;
}
