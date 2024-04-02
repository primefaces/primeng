import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                Value to describe the component can either be provided with <i>ariaLabelledBy</i> or <i>ariaLabel</i> props. The dropdown element has a <i>combobox</i> role in addition to <i>aria-haspopup</i> and <i>aria-expanded</i> attributes. If
                the editable option is enabled <i>aria-autocomplete</i> is also added. The relation between the combobox and the popup is created with <i>aria-controls</i> and <i>aria-activedescendant</i> attribute is used to instruct screen reader
                which option to read during keyboard navigation within the popup list.
            </p>
            <p>
                The popup list has an id that refers to the <i>aria-controls</i> attribute of the <i>combobox</i> element and uses <i>listbox</i> as the role. Each list item has an <i>option</i> role, an id to match the
                <i>aria-activedescendant</i> of the input element along with <i>aria-label</i>, <i>aria-selected</i> and <i>aria-disabled</i> attributes.
            </p>

            <p>If filtering is enabled, <i>filterInputProps</i> can be defined to give <i>aria-*</i> props to the filter input element.</p>
        </app-docsectiontext>

        <app-code [code]="code" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>

        <h3>Closed State Keyboard Support</h3>
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
                        <td>Moves focus to the dropdown element.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>space</i>
                        </td>
                        <td>Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>down arrow</i>
                        </td>
                        <td>Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>up arrow</i>
                        </td>
                        <td>Opens the popup and moves visual focus to the selected option, if there is none then last option receives the focus.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>Popup Keyboard Support</h3>
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
                        <td>Moves focus to the next focusable element in the popup, if there is none then first focusable element receives the focus.</td>
                    </tr>
                    <tr>
                        <td><i>shift</i> + <i>tab</i></td>
                        <td>Moves focus to the previous focusable element in the popup, if there is none then last focusable element receives the focus.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>enter</i>
                        </td>
                        <td>Selects the focused option and closes the popup.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>space</i>
                        </td>
                        <td>Selects the focused option and closes the popup.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>escape</i>
                        </td>
                        <td>Closes the popup, moves focus to the dropdown element.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>down arrow</i>
                        </td>
                        <td>Moves focus to the next option, if there is none then visual focus does not change.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>up arrow</i>
                        </td>
                        <td>Moves focus to the previous option, if there is none then visual focus does not change.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>right arrow</i>
                        </td>
                        <td>If the dropdown is editable, removes the visual focus from the current option and moves input cursor to one character left.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>left arrow</i>
                        </td>
                        <td>If the dropdown is editable, removes the visual focus from the current option and moves input cursor to one character right.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>home</i>
                        </td>
                        <td>If the dropdown is editable, moves input cursor at the end, if not then moves focus to the first option.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>end</i>
                        </td>
                        <td>If the dropdown is editable, moves input cursor at the beginning, if not then moves focus to the last option.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>any printable character</i>
                        </td>
                        <td>Moves focus to the option whose label starts with the characters being typed if dropdown is not editable.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>Filter Input Keyboard Support</h3>
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
                            <i>enter</i>
                        </td>
                        <td>Closes the popup and moves focus to the dropdown element.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>escape</i>
                        </td>
                        <td>Closes the popup and moves focus to the dropdown element.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        basic: `<span id="dd1">Options</span>
<p-dropdown ariaLabelledBy="dd1"></p-dropdown>

<p-dropdown ariaLabel="Options"></p-dropdown>`
    };
}
