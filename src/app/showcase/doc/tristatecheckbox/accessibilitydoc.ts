import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: `
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    TriStateCheckbox component uses an element with <i>checkbox</i> role. Value to describe the component can either be provided with <i>ariaLabelledBy</i> or <i>ariaLabel</i> props. Component adds an element with
                    <i>aria-live</i> attribute that is only visible to screen readers to read the value displayed. Values to read are defined with the <i>trueLabel</i>, <i>falseLabel</i> and <i>nullLabel</i> keys of the <i>aria</i> property from the
                    <a href="/configuration/#locale">locale</a> API. This is an example of a custom accessibility implementation as there is no one to one mapping between the component design and the WCAG specification.
                </p>
            </app-docsectiontext>

            <app-code [code]="code" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>

            <h3>Keyboard Support</h3>
            <div class="doc-tablewrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Function</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <i>tab</i>
                            </td>
                            <td>Moves focus to the checkbox.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>space</i>
                            </td>
                            <td>Toggles between the values.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>enter</i>
                            </td>
                            <td>Toggles between the values.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `<span id="chkbox1">Remember Me</span>
<p-triStateCheckbox ariaLabelledBy="chkbox1"></p-triStateCheckbox>

<p-triStateCheckbox ariaLabel="Remember Me"></p-triStateCheckbox>`
    };
}
