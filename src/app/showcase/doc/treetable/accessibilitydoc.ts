import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <app-docsectiontext [title]="title" [id]="id">
            <h3>Screen Reader</h3>
            <p>
                TreeTable uses a <i>treegrid</i> element whose attributes can be extended with the <i>tableProps</i> option. This property allows passing aria roles and attributes like <i>aria-label</i> and <i>aria-describedby</i> to define the table
                for readers. Default role of the table is <i>table</i>. Header, body and footer elements use <i>rowgroup</i>, rows use <i>row</i> role, header cells have <i>columnheader</i> and body cells use <i>cell</i> roles. Sortable headers
                utilizer <i>aria-sort</i> attribute either set to "ascending" or "descending".
            </p>
            <p>Row elements manage <i>aria-expanded</i> for state along with <i>aria-posinset</i>, <i>aria-setsize</i> and <i>aria-level</i> attribute to define the hierachy.</p>
            <p>When selection is enabled, <i>aria-selected</i> is set to true on a row. In checkbox mode, the built-in checkbox component use <i>checkbox</i> role with <i>aria-checked</i> state attribute.</p>
            <p>Editable cells use custom templating so you need to manage aria roles and attributes manually if required.</p>
            <p>Paginator is a standalone component used inside the TreeTable, refer to the <a href="/paginator/">paginator</a> for more information about the accessibility features.</p>
            <h3>Sortable Headers Keyboard Support</h3>
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
                            <td>Moves through the headers.</td>
                        </tr>
                        <tr>
                            <td><i>enter</i></td>
                            <td>Sorts the column.</td>
                        </tr>
                        <tr>
                            <td><i>space</i></td>
                            <td>Sorts the column.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
                            <td>
                                Moves focus to the first selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the next focusable element in the
                                page tab sequence.
                            </td>
                        </tr>
                        <tr>
                            <td><i>shift</i> + <i>tab</i></td>
                            <td>
                                Moves focus to the last selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the previous focusable element in
                                the page tab sequence.
                            </td>
                        </tr>
                        <tr>
                            <td><i>enter</i></td>
                            <td>Selects the focused treenode.</td>
                        </tr>
                        <tr>
                            <td><i>space</i></td>
                            <td>Selects the focused treenode.</td>
                        </tr>
                        <tr>
                            <td><i>down arrow</i></td>
                            <td>Moves focus to the next treenode.</td>
                        </tr>
                        <tr>
                            <td><i>up arrow</i></td>
                            <td>Moves focus to the previous treenode.</td>
                        </tr>
                        <tr>
                            <td><i>right arrow</i></td>
                            <td>If node is closed, opens the node otherwise moves focus to the first child node.</td>
                        </tr>
                        <tr>
                            <td><i>left arrow</i></td>
                            <td>If node is open, closes the node otherwise moves focus to the parent node.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
