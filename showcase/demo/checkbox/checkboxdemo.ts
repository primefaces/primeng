import {Component} from 'angular2/core';
import {Checkbox} from '../../../components/checkbox/checkbox';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

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
            <div class="ui-grid ui-grid-responsive" style="width:250px;margin-bottom:10px">
                <div class="ui-grid-row">
                    <div class="ui-grid-col-1"><p-checkbox name="group1" value="New York" [(model)]="selectedCities"></p-checkbox></div>
                    <div class="ui-grid-col-11"><label class="ui-widget">New York</label></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-1"><p-checkbox name="group1" value="San Francisco" [(model)]="selectedCities"></p-checkbox></div>
                    <div class="ui-grid-col-11"><label class="ui-widget">San Francisco</label></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-1"><p-checkbox name="group1" value="Los Angeles" [(model)]="selectedCities"></p-checkbox></div>
                    <div class="ui-grid-col-11"><label class="ui-widget">Los Angeles</label></div>
                </div>
            </div>

            Selected Cities: <span *ngFor="#city of selectedCities">{{city}} &nbsp;&nbsp;</span>

            <h3>Preselection</h3>
            <div class="ui-grid ui-grid-responsive" style="width:250px;margin-bottom:10px">
                <div class="ui-grid-row">
                    <div class="ui-grid-col-1"><p-checkbox name="group2" value="Technology" [(model)]="selectedCategories"></p-checkbox></div>
                    <div class="ui-grid-col-11"><label class="ui-widget">Technology</label></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-1"><p-checkbox name="group2" value="Finance" [(model)]="selectedCategories"></p-checkbox></div>
                    <div class="ui-grid-col-11"><label class="ui-widget">Finance</label></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-1"><p-checkbox name="group2" value="Sports" [(model)]="selectedCategories"></p-checkbox></div>
                    <div class="ui-grid-col-11"><label class="ui-widget">Sports</label></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-1"><p-checkbox name="group2" value="Entertainment" [(model)]="selectedCategories"></p-checkbox></div>
                    <div class="ui-grid-col-11"><label class="ui-widget">Entertainment</label></div>
                </div>
            </div>

            Selected Categories: <span *ngFor="#cat of selectedCategories">{{cat}} &nbsp;&nbsp;</span>
        </div>

        <div class="ContentSideSections Source">
            <p-tabView effect="fade">
                <p-tabPanel header="Documentation">
                    <h3>Import</h3>
<pre>
<code class="language-typescript" pCode>
import {Checkbox} from 'primeng/primeng';
</code>
</pre>

                    <h3>Getting Started</h3>
                    <p>Checkbox is defined using p-checkbox element and value is an array defined with model property that supports two-way binding.</p>
                    
<pre>
<code class="language-markup" pCode>
&lt;p-checkbox name="groupname" value="val1" [(model)]="selectedValues"&gt;&lt;/p-checkbox&gt;
&lt;p-checkbox name="groupname" value="val2" [(model)]="selectedValues"&gt;&lt;/p-checkbox&gt;
</code>
</pre>

<pre>
<code class="language-typescript" pCode>
export class ModelComponent {

    selectedValues: string[] = [];

}
</code>
</pre>

                    <p>As model is two-way binding enabled, prepopulating the model array with values is enough to display the related
                    checkboxes as checked.</p>
<pre>
<code class="language-typescript" pCode>
export class ModelComponent {

    selectedValues: string[] = ['val1','val2'];

}
</code>
</pre>

                    <h3>Attributes</h3>
                    <div class="doc-tablewrapper">
                        <table class="doc-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>name</td>
                                    <td>string</td>
                                    <td>null</td>
                                    <td>Name of the checkbox group.</td>
                                </tr>
                                <tr>
                                    <td>value</td>
                                    <td>any</td>
                                    <td>null</td>
                                    <td>Value of the checkbox.</td>
                                </tr>
                                <tr>
                                    <td>model</td>
                                    <td>any</td>
                                    <td>null</td>
                                    <td>An array of values to sync with two-way binding.</td>
                                </tr>
                                <tr>
                                    <td>disabled</td>
                                    <td>boolean</td>
                                    <td>false</td>
                                    <td>When present, it specifies that the element should be disabled.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Events</h3>
                    <div class="doc-tablewrapper">
                        <table class="doc-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Parameters</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>onChange</td>
                                    <td>checked: Boolean value to represent new state of checkbox.</td>
                                    <td>Callback to invoke on checkbox click.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Styling</h3>
                    <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['Theming']">theming page</a>.</p>
                    <div class="doc-tablewrapper">
                        <table class="doc-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Element</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ui-chkbox</td>
                                    <td>Container element</td>
                                </tr>
                                <tr>
                                    <td>ui-chkbox-box</td>
                                    <td>Container of icon.</td>
                                </tr>
                                <tr>
                                    <td>ui-chkbox-icon</td>
                                    <td>Icon element.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Dependencies</h3>
                    <p>Prismjs, PrimeUI checkbox widget css.</p>
                </p-tabPanel>
                <p-tabPanel header="Source">
<pre>
<code class="language-markup" pCode>
&lt;h3 class="first"&gt;Basic&lt;/h3&gt;
&lt;div class="ui-grid ui-grid-responsive" style="width:250px;margin-bottom:10px"&gt;
    &lt;div class="ui-grid-row"&gt;
        &lt;div class="ui-grid-col-1"&gt;&lt;p-checkbox name="group1" value="New York" [(model)]="selectedCities"&gt;&lt;/p-checkbox&gt;&lt;/div&gt;
        &lt;div class="ui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;New York&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="ui-grid-row"&gt;
        &lt;div class="ui-grid-col-1"&gt;&lt;p-checkbox name="group1" value="San Francisco" [(model)]="selectedCities"&gt;&lt;/p-checkbox&gt;&lt;/div&gt;
        &lt;div class="ui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;San Francisco&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="ui-grid-row"&gt;
        &lt;div class="ui-grid-col-1"&gt;&lt;p-checkbox name="group1" value="Los Angeles" [(model)]="selectedCities"&gt;&lt;/p-checkbox&gt;&lt;/div&gt;
        &lt;div class="ui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Los Angeles&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

Selected Cities: &lt;span *ngFor="#city of selectedCities"&gt; <span>{</span><span>{</span>cat<span>}</span><span>}</span> &amp;nbsp;&amp;nbsp;&lt;/span&gt;

&lt;h3&gt;Preselection&lt;/h3&gt;
&lt;div class="ui-grid ui-grid-responsive" style="width:250px;margin-bottom:10px"&gt;
    &lt;div class="ui-grid-row"&gt;
        &lt;div class="ui-grid-col-1"&gt;&lt;p-checkbox name="group2" value="Technology" [(model)]="selectedCategories"&gt;&lt;/p-checkbox&gt;&lt;/div&gt;
        &lt;div class="ui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Technology&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="ui-grid-row"&gt;
        &lt;div class="ui-grid-col-1"&gt;&lt;p-checkbox name="group2" value="Finance" [(model)]="selectedCategories"&gt;&lt;/p-checkbox&gt;&lt;/div&gt;
        &lt;div class="ui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Finance&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="ui-grid-row"&gt;
        &lt;div class="ui-grid-col-1"&gt;&lt;p-checkbox name="group2" value="Sports" [(model)]="selectedCategories"&gt;&lt;/p-checkbox&gt;&lt;/div&gt;
        &lt;div class="ui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Sports&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
     &lt;div class="pu i-grid-row"&gt;
         &lt;div class="ui-grid-col-1"&gt;&lt;p-checkbox name="group2" value="Entertainment" [(model)]="selectedCategories"&gt;&lt;/p-checkbox&gt;&lt;/div&gt;
        &lt;div class="ui-grid-col-11"&gt;&lt;label class="ui-widget"&gt;Entertainment&lt;/label&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

Selected Categories: &lt;span *ngFor="#cat of selectedCategories"&gt; <span>{</span><span>{</span>cat<span>}</span><span>}</span> &amp;nbsp;&amp;nbsp;&lt;/span&gt;
</code>
</pre>

<pre>
<code class="language-typescript" pCode>
export class CheckboxDemo {

    selectedCities: string[] = [];

    selectedCategories: string[] = ['Technology', 'Sports'];
}
</code>
</pre>
                </p-tabPanel>
            </p-tabView>
        </div>
    `,
    styles: [`
        .ui-grid .ui-grid-col-1,
        .ui-grid .ui-grid-col-11 {
            padding: 4px 10px;
        }

        .ui-grid label {
            display: inline-block;
            margin: 3px 0px 0px 4px;
        }
    `],
    directives: [Checkbox,TabPanel,TabView,pCode,ROUTER_DIRECTIVES]
})
export class CheckboxDemo {

    selectedCities: string[] = [];

    selectedCategories: string[] = ['Technology', 'Sports'];
}