import {Component} from 'angular2/core';
import {ButtonDirective} from '../button.directive';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Button</span>
                <span class="defaultText dispTable">Button is an extension to standard input element with icons and theming.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <button type="text" pButton (click)="count()" [icon]="'fa-check'">Toggle</button>

            <br /><br />
            Number of clicks: {{clicks}}
        </div>
    `,
    directives: [ButtonDirective]
})
export class ButtonDemoComponent {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}