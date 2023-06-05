import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>target</td>
                        <td>string</td>
                        <td>window</td>
                        <td>Target of the ScrollTop, valid values are "window" and "parent".</td>
                    </tr>
                    <tr>
                        <td>threshold</td>
                        <td>number</td>
                        <td>400</td>
                        <td>Defines the threshold value of the vertical scroll position of the target to toggle the visibility.</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon to display.</td>
                    </tr>
                    <tr>
                        <td>behavior</td>
                        <td>string</td>
                        <td>smooth</td>
                        <td>Defines the scrolling behavi, "smooth" adds an animation and "auto" scrolls with a jump.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the component.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class PropsDoc {
    @Input() id: string;

    @Input() title: string;
}
