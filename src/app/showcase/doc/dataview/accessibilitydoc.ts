import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    The container element that wraps the layout options buttons has a <i>group</i> role whereas each button element uses <i>button</i> role and <i>aria-pressed</i> is updated depending on selection state. Values to describe the
                    buttons are derived from the <i>aria.listView</i> and <i>aria.gridView</i> properties of the <a href="/configuration/#locale" class="">locale</a> API respectively.
                </p>
                <p>Refer to <a href="/paginator" class="">paginator</a> accessibility documentation for the paginator of the component.</p>
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
                                <td>Moves focus to the buttons.</td>
                            </tr>
                            <tr>
                                <td><i>space</i></td>
                                <td>Toggles the checked state of a button.</td>
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
