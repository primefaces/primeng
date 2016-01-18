import {Component} from 'angular2/core';
import {SpinnerDirective} from '../spinner.directive';
import {ButtonDirective} from '../../button/button.directive';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Spinner</span>
                <span class="defaultText dispTable">Spinner is an input component to provide a numerical input.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Basic</h3>
            <input id="in" type="text" size="30" pSpinner [(ngModel)]="text" [disabled]="disabled"/>

            <button type="text" (click)="toggleDisabled()" pButton>Toggle</button>
        </div>
    `,
    directives: [SpinnerDirective, ButtonDirective]
})
export class SpinnerDemoComponent {

    disabled: boolean = false;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }
}