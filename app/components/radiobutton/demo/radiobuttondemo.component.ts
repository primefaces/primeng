import {Component} from 'angular2/core';
import {RadioButtonDirective} from '../radiobutton.directive';
import {ButtonDirective} from '../../button/button.directive';
import {GridDemoComponent} from '../../grid/demo/griddemo.component';

@Component({
    template: `
    <style type="text/css">
        .pui-grid label {
            display: inline-block;
            margin: 2px 0;
        }
    </style>

        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">RadioButton</span>
                <span class="defaultText dispTable">RadioButton is an extension to standard radio button element with skinning capabilities.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Basic</h3>
            <div class="pui-grid pui-grid-responsive" style="width:250px">
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><input type="radio" name="rd1" #rd1 value="1" pRadioButton (click)="value = rd1.value"/></div>
                    <div class="pui-grid-col-11"><label for="rd1_1" class="ui-widget">Option 1</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><input type="radio" name="rd1" #rd2 value="2" pRadioButton (click)="value = rd2.value"/></div>
                    <div class="pui-grid-col-11"><label for="rd1_2" class="ui-widget">Option 2</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><input type="radio" name="rd1" #rd3 value="3" pRadioButton (click)="value = rd3.value"/></div>
                    <div class="pui-grid-col-11"><label for="rd1_3" class="ui-widget">Option 3</label></div>
                </div>
                <br/>
                Value = {{value}}
            </div>
            <br/>
            <button type="text" (click)="toggleDisabled()" pButton>Toggle</button>
        </div>
    `,
    directives: [RadioButtonDirective, ButtonDirective]
})
export class RadioButtonDemoComponent {

    value: any ;

    disabled: boolean = false;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }
}