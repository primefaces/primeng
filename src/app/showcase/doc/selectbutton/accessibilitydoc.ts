import { Component } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                The container element that wraps the buttons has a <i>group</i> role whereas each button element uses <i>button</i> role and <i>aria-pressed</i> is updated depending on selection state. Value to describe an option is automatically set
                using the <i>ariaLabel</i> property that refers to the label of an option so it is still suggested to define a label even the option display consists of presentational content like icons only.
            </p>
        </app-docsectiontext>

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
                        <td>Moves focus to the buttons.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>space</i>
                        </td>
                        <td>Toggles the checked state of a button.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {

}
