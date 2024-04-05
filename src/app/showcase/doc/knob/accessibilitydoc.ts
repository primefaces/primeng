import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                Knob element component uses <i>slider</i> role in addition to the <i>aria-valuemin</i>, <i>aria-valuemax</i> and <i>aria-valuenow</i> attributes. Value to describe the component can be defined using <i>ariaLabelledBy</i> and
                <i>ariaLabel</i> props.
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
                        <td>Moves focus to the slider.</td>
                    </tr>
                    <tr>
                        <td>
                            <span class="inline-flex flex-column">
                                <i class="mb-1">left arrow</i>
                                <i>down arrow</i>
                            </span>
                        </td>
                        <td>Decrements the value.</td>
                    </tr>
                    <tr>
                        <td>
                            <span class="inline-flex flex-column">
                                <i class="mb-1">right arrow</i>
                                <i>up arrow</i>
                            </span>
                        </td>
                        <td>Increments the value.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>home</i>
                        </td>
                        <td>Set the minimum value.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>end</i>
                        </td>
                        <td>Set the maximum value.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>page up</i>
                        </td>
                        <td>Increments the value by 10 steps.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>page down</i>
                        </td>
                        <td>Decrements the value by 10 steps.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        basic: `<span id="label_number">Number</span>
<p-knob ariaLabelledBy="label_number"/>

<p-knob ariaLabel="Number"/>`
    };
}
