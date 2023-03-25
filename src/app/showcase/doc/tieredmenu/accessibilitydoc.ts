import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    TieredMenu component uses the <i>menubar</i> role with <i>aria-orientation</i> set to "vertical" and the value to describe the menu can either be provided with <i>aria-labelledby</i> or <i>aria-label</i> props. Each list item has
                    a <i>presentation</i> role whereas anchor elements have a <i>menuitem</i> role with <i>aria-label</i> referring to the label of the item and <i>aria-disabled</i> defined if the item is disabled. A submenu within a TieredMenu uses
                    the <i>menu</i> role with an <i>aria-labelledby</i> defined as the id of the submenu root menuitem label. In addition, menuitems that open a submenu have <i>aria-haspopup</i>, <i>aria-expanded</i> and <i>aria-controls</i> to
                    define the relation between the item and the submenu.
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
                                <td>If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays.</td>
                            </tr>
                            <tr>
                                <td><i>space</i></td>
                                <td>If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays.</td>
                            </tr>
                            <tr>
                                <td><i>escape</i></td>
                                <td>If focus is inside a popup submenu, closes the submenu and moves focus to the root item of the closed submenu.</td>
                            </tr>
                            <tr>
                                <td><i>down arrow</i></td>
                                <td>Moves focus to the next menuitem within the submenu.</td>
                            </tr>
                            <tr>
                                <td><i>up arrow</i></td>
                                <td>Moves focus to the previous menuitem within the submenu.</td>
                            </tr>
                            <tr>
                                <td><i>right arrow</i></td>
                                <td>Opens a submenu if there is one available and moves focus to the first item.</td>
                            </tr>
                            <tr>
                                <td><i>left arrow</i></td>
                                <td>Closes a submenu and moves focus to the root item of the closed submenu.</td>
                            </tr>
                            <tr>
                                <td><i>home</i></td>
                                <td>Moves focus to the first menuitem within the submenu.</td>
                            </tr>
                            <tr>
                                <td><i>end</i></td>
                                <td>Moves focus to the last menuitem within the submenu.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </app-docsectiontext>
        </div>
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
