import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <h3>Screen Reader</h3>
            <p>
                Menu component uses the <i>menu</i> role and the value to describe the menu can either be provided with <i>aria-labelledby</i> or <i>aria-label</i> props. Each list item has a <i>presentation</i> role whereas anchor elements have a
                <i>menuitem</i> role with <i>aria-label</i> referring to the label of the item and <i>aria-disabled</i> defined if the item is disabled. A submenu within a Menu uses the <i>group</i> role with an <i>aria-labelledby</i> defined as the
                id of the submenu root menuitem label.
            </p>
            <p>In popup mode, the component implicitly manages the <i>aria-expanded</i>, <i>aria-haspopup</i> and <i>aria-controls</i> attributes of the target element to define the relation between the target and the popup.</p>
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
                            <td><i>tab</i></td>
                            <td>Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence.</td>
                        </tr>
                        <tr>
                            <td><i>shift</i> + <i>tab</i></td>
                            <td>Add focus to the last item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence.</td>
                        </tr>
                        <tr>
                            <td><i>enter</i></td>
                            <td>Activates the focused menuitem. If menu is in overlay mode, popup gets closes and focus moves to target.</td>
                        </tr>
                        <tr>
                            <td><i>space</i></td>
                            <td>Activates the focused menuitem. If menu is in overlay mode, popup gets closes and focus moves to target.</td>
                        </tr>
                        <tr>
                            <td><i>escape</i></td>
                            <td>If menu is in overlay mode, popup gets closes and focus moves to target.</td>
                        </tr>
                        <tr>
                            <td><i>down arrow</i></td>
                            <td>Moves focus to the next menuitem.</td>
                        </tr>
                        <tr>
                            <td><i>up arrow</i></td>
                            <td>Moves focus to the previous menuitem.</td>
                        </tr>
                        <tr>
                            <td><i>home</i></td>
                            <td>Moves focus to the first menuitem.</td>
                        </tr>
                        <tr>
                            <td><i>end</i></td>
                            <td>Moves focus to the last menuitem.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    </div>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
