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
                        <td>preview</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Controls the preview functionality.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Inline style of the element.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the element.</td>
                    </tr>
                    <tr>
                        <td>imageStyle</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Inline style of the image element.</td>
                    </tr>
                    <tr>
                        <td>imageClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the image element.</td>
                    </tr>
                    <tr>
                        <td>src</td>
                        <td>string | SafeUrl</td>
                        <td>null</td>
                        <td>src attribute of the image element.</td>
                    </tr>
                    <tr>
                        <td>alt</td>
                        <td>string</td>
                        <td>null</td>
                        <td>alt attribute of the image element.</td>
                    </tr>
                    <tr>
                        <td>width</td>
                        <td>string</td>
                        <td>null</td>
                        <td>width attribute of the image element.</td>
                    </tr>
                    <tr>
                        <td>height</td>
                        <td>string</td>
                        <td>null</td>
                        <td>height attribute of the image element.</td>
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
