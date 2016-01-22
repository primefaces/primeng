import {Component} from 'angular2/core';
import {InputTextareaDirective} from '../inputtextarea.directive';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">InputTextarea</span>
                <span class="defaultText dispTable">Inputtextarea provides autoComplete, autoResize, remaining characters counter features.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Default</h3>
            <textarea id="basic" rows="5" cols="30" pInputTextarea></textarea>
        </div>
    `,
    directives: [InputTextareaDirective]
})
export class InputTextareaDemoComponent {

}