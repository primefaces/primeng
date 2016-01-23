import {Component} from 'angular2/core';
import {RadioButtonComponent} from '../radiobutton.component';
import {ButtonDirective} from '../../button/button.directive';
import {GridDemoComponent} from '../../grid/demo/griddemo.component';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">RadioButton</span>
                <span class="defaultText dispTable">RadioButton is an extension to standard radio button element with skinning capabilities.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Basic</h3>
            <div class="pui-grid pui-grid-responsive" style="width:250px;margin-bottom:10px">
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group1" value="Option 1" [(model)]="val1"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 1</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group1" value="Option 2" [(model)]="val1"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 2</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group1" value="Option 3" [(model)]="val1"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 3</label></div>
                </div>
            </div>
            Value 1 = {{val1}}

            <h3>Preselection</h3>
            <div class="pui-grid pui-grid-responsive" style="width:250px;margin-bottom:10px">
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group1" value="Option 1" [(model)]="val2"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 1</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group2" value="Option 2" [(model)]="val2"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 2</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-radio name="group2" value="Option 3" [(model)]="val2"></p-radio></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 3</label></div>
                </div>
            </div>
            Value 2 = {{val2}}
        </div>
    `,
    styles: [`
        .pui-grid .pui-grid-col-1,
        .pui-grid .pui-grid-col-11 {
            padding: 4px 10px;
        }

        .pui-grid label {
            display: inline-block;
            margin: 3px 0px 0px 4px;
        }
    `],
    directives: [RadioButtonComponent, ButtonDirective]
})
export class RadioButtonDemoComponent {

    val1: string;

    val2: string = 'Option 2';
}