import {Component} from 'angular2/core';
import {PasswordDirective} from '../password.directive';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Password</span>
                <span class="defaultText dispTable">Password displays strength indicator for password fields.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <input id="default" pPassword type="password"/>
        </div>
    `,
    directives: [PasswordDirective]
})
export class PasswordDemoComponent {

}