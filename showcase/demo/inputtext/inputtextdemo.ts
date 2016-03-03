import {Component} from 'angular2/core';
import {InputText} from '../../../components/inputtext/inputtext';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
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

            <button type="button" (click)="toggleDisabled()" pButton>Toggle</button>
        </div>

        <div class="ContentSideSections Source">
            <p-tabView effect="fade">
                <p-tabPanel header="Documentation">
                    <h3>Import</h3>
<pre>
<code class="language-typescript" pCode>
import {InputText} from 'primeng/primeng';
</code>
</pre>

                    <h3>Getting Started</h3>
                    <p>InputText is applied to an input field with pInputText directive.</p>
                    
<pre>
<code class="language-markup" pCode>
&lt;input type="text" pInputText /&gt;
</code>
</pre>

                    <h3>Model Binding</h3>
                    <p>A model can be bound using ngModel regularly.</p>
<pre>
<code class="language-markup" pCode>
&lt;input type="text" pInputText [(ngModel)]="property"/&gt;
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
                                    <td>ui-inputtext</td>
                                    <td>Input element</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Dependencies</h3>
                    <p>Native directive that only requires the CSS of PrimeUI Inputtext.</p>
                </p-tabPanel>
                <p-tabPanel header="Source">
<pre>
<code class="language-markup" pCode>
&lt;h3 class="first"&gt;Basic&lt;/h3&gt;
&lt;input id="in" type="text" size="30" pInputText [(ngModel)]="text" /&gt; &amp;nbsp; <span>{</span><span>{</span>text<span>}</span><span>}</span>

&lt;h3&gt;Disabled&lt;/h3&gt;
&lt;input id="in" type="text" size="30" pInputText [disabled]="disabled" /&gt;

&lt;button type="button" (click)="toggleDisabled()" pButton&gt;Toggle&lt;/button&gt;
</code>
</pre>

<pre>
<code class="language-typescript" pCode>
export class InputTextDemo {

    text: string;

    disabled: boolean = true;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }
}
</code>
</pre>
                </p-tabPanel>
            </p-tabView>
        </div>
    `,
    directives: [InputText,Button,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class InputTextDemo {

    text: string;

    disabled: boolean = true;

    toggleDisabled() {
        this.disabled = !this.disabled;
    }
}