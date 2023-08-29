import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <h3>Screen Reader</h3>
            <p>
                Accordion header elements have a <i>button</i> role and use <i>aria-controls</i> to define the id of the content section along with <i>aria-expanded</i> for the visibility state. The value to read a header element defaults to the
                value of the <i>header</i> property and can be customized by defining an <i>aria-label</i> or <i>aria-labelledby</i> property. Each header has a <i>heading</i> role, for which the level is customized by <i>headerAriaLevel</i> and has
                a default level of 2 as per W3C specifications.
            </p>
            <p>The content uses <i>region</i> role, defines an id that matches the <i>aria-controls</i> of the header and <i>aria-labelledby</i> referring to the id of the header.</p>
            <h3>Header Keyboard Support</h3>
        </app-docsectiontext>
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
                        <td>Moves focus to the next the focusable element in the page tab sequence.</td>
                    </tr>
                    <tr>
                        <td><i>shift</i> + <i>tab</i></td>
                        <td>Moves focus to the previous the focusable element in the page tab sequence.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>enter</i>
                        </td>
                        <td>Toggles the visibility of the content.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>space</i>
                        </td>
                        <td>Toggles the visibility of the content.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>down arrow</i>
                        </td>
                        <td>Moves focus to the next header.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>up arrow</i>
                        </td>
                        <td>Moves focus to the previous header.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>home</i>
                        </td>
                        <td>Moves focus to the first header.</td>
                    </tr>
                    <tr>
                        <td>
                            <i>end</i>
                        </td>
                        <td>Moves focus to the last header.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
