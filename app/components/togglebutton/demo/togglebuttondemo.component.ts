import {Component} from 'angular2/core';
import {TogglebuttonComponent} from '../togglebutton.component';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Togglebutton</span>
                <span class="defaultText dispTable">ToggleButton is used to select a boolean value using a button.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3>Basic</h3>
            <p-togglebutton> </p-togglebutton>
            <br/>
            <h3>Icons {{checked1}}</h3>
            <p-togglebutton onLabel="I confirm" offLabel="I reject" onIcon="fa-check-square" offIcon="fa-square" [(checked)]="checked1" (onChange) = "handleChange($event)"> </p-togglebutton>
        </div>
    `,
    directives: [TogglebuttonComponent]
})
export class TogglebuttonDemoComponent {
    checked1: boolean = false;

    handleChange() {
        console.log(event);
    }
}