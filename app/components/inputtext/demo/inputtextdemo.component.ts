import {Component} from 'angular2/core';
import {InputTextDirective} from '../inputtext.directive';
import {ButtonDirective} from '../../button/button.directive';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Inputtext</span>
                <span class="defaultText dispTable">InputText is an extension to standard input element with theming.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Basic</h3>
            <input id="in" type="text" size="30" pInputText [(ngModel)]="text" /> &nbsp; {{text}}

            <h3>Disabled</h3>
            <input id="in" type="text" size="30" pInputText [disabled]="disabled" />

            <button type="text" (click)="toggleDisabled()" pButton>Toggle</button>
        </div>

        <div class="ContentSideSections Source">
            <p-tabView effect="fade">
                <p-tabPanel header="Documentation">
                    <h3>Getting Started</h3>
                    <p>InputText is applied to an input field with pInputText directive.</p>
                    
<pre>
&lt;input type="text" pInputText /&gt;
</pre>

                    <h3>Model Binding</h3>
                    <p>A model can be bound using ngModel regularly.</p>
<pre>
&lt;input type="text" pInputText [(ngModel)]="property"/&gt;
</pre>

                    <h3>Attributes</h3>
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
                                <td>disabled</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>When present, it specifies that the element should be disabled.</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Styling</h3>
                    <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['Theming']">theming page</a>.</p>
                    <table class="doc-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Element</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>pui-inputtext</td>
                                <td>Input element</td>
                            </tr>
                        </tbody>
                    </table>
                </p-tabPanel>
                <p-tabPanel header="Source">
<h3>Template</h3>
<pre>
&lt;h3 class="first"&gt;Basic&lt;/h3&gt;
&lt;input id="in" type="text" size="30" pInputText [(ngModel)]="text" /&gt; &nbsp; \{\{text\}\}

&lt;h3&gt;Disabled&lt;/h3&gt;
&lt;input id="in" type="text" size="30" pInputText [disabled]="disabled" /&gt;

&lt;button type="text" (click)="toggleDisabled()" pButton&gt;Toggle&lt;/button&gt;
</pre>

<h3>InputTextDemoComponent</h3>
<pre>
export class InputTextDemoComponent {

    text: string;

    disabled: boolean = true;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }
}
</pre>
                </p-tabPanel>
            </p-tabView>
        </div>
    `,
    directives: [InputTextDirective, ButtonDirective, TabViewComponent, TabPanelComponent, ROUTER_DIRECTIVES]
})
export class InputTextDemoComponent {

    text: string;

    disabled: boolean = true;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }
}