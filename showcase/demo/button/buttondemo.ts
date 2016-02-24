import {Component} from 'angular2/core';
import {TabView} from '../../../components/tabview/tabview';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
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
                            <h3>Import</h3>
<pre>
<code class="language-typescript" pCode>
import {Button} from 'primeng/primeng';
</code>
</pre>

                    <h3>Getting Started</h3>
                    <p>Button is applied to a button element with pButton directive.</p>
                    
<pre>
<code class="language-markup" pCode>
&lt;button type="button" pButton&gt;Click&lt;/button&gt;
</code>
</pre>

                    <h3>Events</h3>
                    <p>Events are defined using standard notation.</p>
                    
<pre>
<code class="language-markup" pCode>
&lt;button type="button" pButton (click)="onclick()"&gt;Click&lt;/button&gt;
</code>
</pre>

<pre>
<code class="language-typescript" pCode>
export class Model {

    onclick() {

    }

}
</code>
</pre>

                    <h3>Icons</h3>
                    <p>Icon on a button is defined with icon attribute and position is customized using iconPos attribute. Default
                    icon position is left.</p>
<pre>
<code class="language-markup" pCode>
&lt;button type="button" pButton icon="fa-check'" iconPos="left"&gt;Click&lt;/button&gt;
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
                                    <td>ui-button</td>
                                    <td>Button element</td>
                                </tr>
                                <tr>
                                    <td>ui-button-icon</td>
                                    <td>Icon element</td>
                                </tr>
                                <tr>
                                    <td>ui-button-text</td>
                                    <td>Label element of the button</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Dependencies</h3>
                    <p>PrimeUI Button.</p>
                </p-tabPanel>
                <p-tabPanel header="Source">
<pre>
<code class="language-markup" pCode>
&lt;button type="text" pButton (click)="count()" [icon]="'fa-check'"&gt;Click&lt;/button&gt;

Number of clicks: <span>{</span><span>{</span>clicks<span>}</span><span>}</span>
</code>
</pre>

                <h3>ButtonDemo</h3>
<pre>
<code class="language-typescript" pCode>
export class ButtonDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}
</code>
</pre>
                </ p-tabPanel>
             </p-tabView >
        </div>
    `,
    directives: [pCode,Button,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class ButtonDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}