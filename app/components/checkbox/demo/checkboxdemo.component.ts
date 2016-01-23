import {Component} from 'angular2/core';
import {CheckboxComponent} from '../checkbox.component';
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
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Checkbox</span>
                <span class="defaultText dispTable">Checkbox is an extension to standard checkbox element with skinning capabilities.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Basic</h3>
            <div class="pui-grid pui-grid-responsive" style="width:250px">
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group1" value="Option 1" [(model)]="val1" [checked] ="false"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 1</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group1" value="Option 2" [(model)]="val2"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 2</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group1" value="Option 3" [(model)]="val3"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 3</label></div>
                </div>
            </div> 
            <ul>
                <li *ngIf="val1">{{val1}}</li>
                <li *ngIf="val2">{{val2}}</li>
                <li *ngIf="val3">{{val3}}</li>
            </ul>

            <h3>Preselection</h3>
            <div class="pui-grid pui-grid-responsive" style="width:250px">
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group1" value="Option 1" [(model)]="val4"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 1</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group2" value="Option 2" [(model)]="val4"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Option 2</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group2" value="Option 3" [(model)]="val4"></p-checkbox></div>
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
    directives: [CheckboxComponent, ButtonDirective]
})
export class CheckboxDemoComponent {

    val1: any = false;

    val2: any = false;

    val3: any = false;

    val4: string = 'Option 2';
}