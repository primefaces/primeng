import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    Rating component internally uses radio buttons that are only visible to screen readers. The value to read for item is retrieved from the <a href="/configuration/#locale">locale</a> API via <i>star</i> and <i>stars</i> of the
                    <i>aria</i>
                    property.
                </p>
            </app-docsectiontext>

            <h3>Keyboard Support</h3>
            <p>Keyboard interaction is derived from the native browser handling of radio buttons in a group.</p>
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
                            <td>Moves focus to the star representing the value, if there is none then first star receives the focus.</td>
                        </tr>
                        <tr>
                            <td>
                                <span class="inline-flex flex-column">
                                    <i class="mb-1">left arrow</i>
                                    <i>up arrow</i>
                                </span>
                            </td>
                            <td>Moves focus to the previous star, if there is none then last radio button receives the focus.</td>
                        </tr>
                        <tr>
                            <td>
                                <span class="inline-flex flex-column">
                                    <i class="mb-1">right arrow</i>
                                    <i>down arrow</i>
                                </span>
                            </td>
                            <td>Moves focus to the next star, if there is none then first star receives the focus.</td>
                        </tr>
                        <tr>
                            <td>
                                <i>space</i>
                            </td>
                            <td>If the focused star does not represent the value, changes the value to the star value.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
