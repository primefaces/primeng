import {Component} from 'angular2/core';
import {CheckboxComponent} from '../checkbox.component';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Checkbox</span>
                <span class="defaultText dispTable">Checkbox is an extension to standard checkbox element with skinning capabilities.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Basic</h3>
            <div class="pui-grid pui-grid-responsive" style="width:250px;margin-bottom:10px">
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group1" value="New York" [(model)]="selectedCities"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">New York</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group1" value="San Francisco" [(model)]="selectedCities"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">San Francisco</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group1" value="Los Angeles" [(model)]="selectedCities"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Los Angeles</label></div>
                </div>
            </div>

            Selected Cities: <span *ngFor="#city of selectedCities">{{city}} &nbsp;&nbsp;</span>

            <h3>Preselection</h3>
            <div class="pui-grid pui-grid-responsive" style="width:250px;margin-bottom:10px">
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group2" value="Technology" [(model)]="selectedCategories"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Technology</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group2" value="Finance" [(model)]="selectedCategories"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Finance</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group2" value="Sports" [(model)]="selectedCategories"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Sports</label></div>
                </div>
                <div class="pui-grid-row">
                    <div class="pui-grid-col-1"><p-checkbox name="group2" value="Entertainment" [(model)]="selectedCategories"></p-checkbox></div>
                    <div class="pui-grid-col-11"><label class="ui-widget">Entertainment</label></div>
                </div>
            </div>

            Selected Categories: <span *ngFor="#cat of selectedCategories">{{cat}} &nbsp;&nbsp;</span>

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
    directives: [CheckboxComponent]
})
export class CheckboxDemoComponent {

    selectedCities: string[] = [];

    selectedCategories: string[] = ['Technology', 'Sports'];
}