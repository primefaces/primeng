import {Component} from 'angular2/core';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Button</span>
                <span class="defaultText dispTable">Button is an extension to standard input element with icons and theming.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <button type="text" pButton (click)="count()" [icon]="'fa-check'">Click</button>

            <br /><br />
            Number of clicks: {{clicks}}
        </div>

        <div class="ContentSideSections Source">
            <p-tabView effect="fade">
                <p-tabPanel header="Documentation">
                    <h3>Getting Started</h3>
                    <p>Button is applied to a button element with pButton directive.</p>
                    
<pre>
&lt;button type="button" pButton&gt;Click&lt;/button/&gt;
</pre>

                    <h3>Events</h3>
                    <p>Events are defined using standard notation.</p>
                    
<pre>
&lt;button type="button" pButton (click)="onclick()"&gt;Click&lt;/button/&gt;
</pre>

<pre>
export class Model {

    onclick() {

    }

}
</pre>

                    <h3>Icons</h3>
                    <p>Icon on a button is defined with icon attribute and position is customized using iconPos attribute. Default
                    icon position is left.</p>
<pre>
&lt;button type="button" pButton icon="fa-check'" iconPos="left"&gt;Click&lt;/button/&gt;
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
                                    <td>icon</td>
                                    <td>string</td>
                                    <td>null</td>
                                    <td>Name of the icon.</td>
                                </tr>
                                <tr>
                                    <td>iconPos</td>
                                    <td>string</td>
                                    <td>left</td>
                                    <td>Position of the icon, valid values are "left" and "right".</td>
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
                                    <td>pui-button</td>
                                    <td>Button element</td>
                                </tr>
                                <tr>
                                    <td>pui-button-icon</td>
                                    <td>Icon element</td>
                                </tr>
                                <tr>
                                    <td>pui-button-text</td>
                                    <td>Label element of the button</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Dependencies</h3>
                    <p>jQuery, jQuery UI WidgetFactory API, PrimeUI Button.</p>
                </p-tabPanel>
                <p-tabPanel header="Source">
                <h3>Template</h3>
<pre>
&lt;button type="text" pButton (click)="count()" [icon]="'fa-check'"&gt;Click&lt;/button&gt;

Number of clicks: <span>{</span><span>{</span>clicks<span>}</span><span>}</span>
</pre>

                <h3>ButtonDemoComponent</h3>
<pre>
export class ButtonDemoComponent {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}
</pre>
                </ p-tabPanel>
             </p-tabView >
        </div>
    `,
    directives: [Button,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class ButtonDemoComponent {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}