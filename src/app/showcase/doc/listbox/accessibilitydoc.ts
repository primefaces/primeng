import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                Value to describe the component can be provided <i>ariaLabelledBy</i> or <i>ariaLabel</i> props. The list element has a <i>listbox</i> role with the <i>aria-multiselectable</i> attribute that sets to true when multiple selection is
                enabled. Each list item has an <i>option</i> role with <i>aria-selected</i> and <i>aria-disabled</i> as their attributes.
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
                        <td>Moves focus to the first selected option, if there is none then first option receives the focus.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>up arrow</i>
                        </td>
                        <td>Moves focus to the previous option.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>down arrow</i>
                        </td>
                        <td>Moves focus to the next option.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>enter</i>
                        </td>
                        <td>Toggles the selected state of the focused option.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>space</i>
                        </td>
                        <td>Toggles the selected state of the focused option.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>home</i>
                        </td>
                        <td>Moves focus to the first option.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>end</i>
                        </td>
                        <td>Moves focus to the last option.</td>
                    </tr>
                    <tr>
                        <td><i>shift</i> + <i>down arrow</i></td>
                        <td>Moves focus to the next option and toggles the selection state.</td>
                    </tr>
                    <tr>
                        <td><i>shift</i> + <i>up arrow</i></td>
                        <td>Moves focus to the previous option and toggles the selection state.</td>
                    </tr>
                    <tr>
                        <td><i>shift</i> + <i>space</i></td>
                        <td>Selects the items between the most recently selected option and the focused option.</td>
                    </tr>
                    <tr>
                        <td><i>control</i> + <i>shift</i> + <i>home</i></td>
                        <td>Selects the focused options and all the options up to the first one.</td>
                    </tr>
                    <tr>
                        <td><i>control</i> + <i>shift</i> + <i>end</i></td>
                        <td>Selects the focused options and all the options down to the last one.</td>
                    </tr>
                    <tr>
                        <td><i>control</i> + <i>a</i></td>
                        <td>Selects all options.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        basic: `<span id="lb">Options</span>
<p-listbox ariaLabelledBy="lb"></p-listbox>

<p-listbox ariaLabel="City"></p-listbox>`
    };
}
