import {Component} from 'angular2/core';
import {InputTextDirective} from '../inputtext.directive';
import {ButtonDirective} from '../../button/button.directive';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Inputtext</span>
                <span class="defaultText dispTable">InputText is an extension to standard input element with skinning capabilities.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Basic</h3>
            <input id="in" type="text" size="30" pInputText [(ngModel)]="text" [disabled]="disabled"/>

            {{text}}

            <button type="text" (click)="toggleDisabled()" pButton>Toggle</button>
        </div>
    `,
    directives: [InputTextDirective, ButtonDirective]
})
export class InputTextDemoComponent {

    text: string;

    disabled: boolean = false;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }
}