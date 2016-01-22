import {Component} from 'angular2/core';
import {RadioButtonComponent} from '../radiobutton.component';
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
                    <div class="pui-grid-col-1"><p-radio #op1 name="test" value="Option 1" (click)="selectedOption=op1.value"></p-radio></div>
                    <div class="pui-grid-col-11"><label for="rd1_1" class="ui-widget">Option 1</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio #op2 name="test" value="Option 2" (click)="selectedOption=op2.value"></p-radio></div>
                    <div class="pui-grid-col-11"><label for="rd1_2" class="ui-widget">Option 2</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio #op3 name="test" value="Option 3" (click)="selectedOption=op3.value"></p-radio></div>
                    <div class="pui-grid-col-11"><label for="rd1_3" class="ui-widget">Option 3</label></div>
                </div>
                <br/>
                Selected Option = {{selectedOption}}
            </div>
        </div>
    `,
    styles: [`
        .pui-grid label {
            display: inline-block;
            margin: 3px 0;
        }
    `],
    directives: [RadioButtonComponent, ButtonDirective]
})
export class RadioButtonDemoComponent {

    selectedOption: string;
}