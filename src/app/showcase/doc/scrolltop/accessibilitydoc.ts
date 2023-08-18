import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <h3>Screen Reader</h3>
            <p>
                ScrollTop uses a button element with an <i>aria-label</i> that refers to the <i>aria.scrollTop</i> property of the <a href="/configuration/#locale">locale</a> API by default, you may use your own aria roles and attributes as any valid
                attribute is passed to the button element implicitly.
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
                        <td><i>enter</i></td>
                        <td>Scrolls to top.</td>
                    </tr>
                    <tr>
                        <td><i>space</i></td>
                        <td>Scrolls to top.</td>
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
