import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                Value to describe the component can either be provided via <i>label</i> tag combined with <i>inputId</i> prop or using <i>ariaLabelledBy</i>, <i>ariaLabel</i> props. The input element uses <i>spinbutton</i> role in addition to the
                <i>aria-valuemin</i>, <i>aria-valuemax</i> and <i>aria-valuenow</i> attributes.
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
                        <td>Moves focus to the input.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>up arrow</i>
                        </td>
                        <td>Increments the value.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>down arrow</i>
                        </td>
                        <td>Decrements the value.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>home</i>
                        </td>
                        <td>Set the minimum value if provided.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>end</i>
                        </td>
                        <td>Set the maximum value if provided.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {

    code: Code = {
        basic: `<label for="price">Price</label>
<p-inputNumber inputId="price"></p-inputNumber>

<span id="label_number">Number</span>
<p-inputNumber ariaLabelledBy="label_number"></p-inputNumber>

<p-inputNumber ariaLabel="Number"></p-inputNumber>`
    };
}
