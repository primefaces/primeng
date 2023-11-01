import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: `
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    Value to describe the component can either be provided with <i>ariaLabelledBy</i> or <i>ariaLabel</i> props. The multiselect component has a <i>combobox</i> role in addition to <i>aria-haspopup</i> and
                    <i>aria-expanded</i> attributes. The relation between the combobox and the popup is created with <i>aria-controls</i> attribute that refers to the id of the popup listbox.
                </p>
                <p>The popup listbox uses <i>listbox</i> as the role with <i>aria-multiselectable</i> enabled. Each list item has an <i>option</i> role along with <i>aria-label</i>, <i>aria-selected</i> and <i>aria-disabled</i> attributes.</p>

                <p>
                    Checkbox component at the header uses a hidden native checkbox element internally that is only visible to screen readers. Value to read is defined with the <i>selectAll</i> and <i>unselectAll</i> keys of the <i>aria</i> property
                    from the <a href="/configuration/#locale">locale</a> API.
                </p>

                <p>If filtering is enabled, <i>filterInputProps</i> can be defined to give <i>aria-*</i> props to the input element.</p>

                <p>Close button uses <i>close</i> key of the <i>aria</i> property from the <a href="/configuration/#locale">locale</a> API as the <i>aria-label</i> by default, this can be overriden with the <i>closeButtonProps</i>.</p>
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
                            <td>Moves focus to the multiselect element.</td>
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
                            <td>Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.</td>
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
                            <td>Toggles the selection state of the focused option.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>space</i>
                            </td>
                            <td>Toggles the selection state of the focused option.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>escape</i>
                            </td>
                            <td>Closes the popup, moves focus to the multiselect element.</td>
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
                            <td>
                                <i>any printable character</i>
                            </td>
                            <td>Moves focus to the option whose label starts with the characters being typed if dropdown is not editable.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Toggle All Checkbox Keyboard Support</h3>
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
                                <i>space</i>
                            </td>
                            <td>Toggles the checked state.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>escape</i>
                            </td>
                            <td>Closes the popup.</td>
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
                            <td>Closes the popup and moves focus to the multiselect element.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>escape</i>
                            </td>
                            <td>Closes the popup and moves focus to the multiselect element.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Close Button Keyboard Support</h3>
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
                            <td>Closes the popup and moves focus to the multiselect element.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>space</i>
                            </td>
                            <td>Closes the popup and moves focus to the multiselect element.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>escape</i>
                            </td>
                            <td>Closes the popup and moves focus to the multiselect element.</td>
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
        basic: `<span id="dd1">Options</span>
<p-multiSelect ariaLabelledBy="dd1"></p-multiSelect>

<p-multiSelect ariaLabel="Options"></p-multiSelect>`
    };
}
