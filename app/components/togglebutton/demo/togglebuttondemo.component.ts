import {Component} from 'angular2/core';
import {ToggleButtonComponent} from '../togglebutton.component';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Togglebutton</span>
                <span class="defaultText dispTable">ToggleButton is used to select a boolean value using a button.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Basic - ({{checked1}})</h3>
            <p-togglebutton [(checked)]="checked1"></p-togglebutton>

            <h3>Customized - ({{checked2}})</h3>
            <p-togglebutton onLabel="I confirm" offLabel="I reject" onIcon="fa-check-square" offIcon="fa-square" [(checked)]="checked2"></p-togglebutton>
        </div>
    `,
    directives: [ToggleButtonComponent]
})
export class ToggleButtonDemoComponent {
    
    checked1: boolean = false;

    checked2: boolean = true;
}