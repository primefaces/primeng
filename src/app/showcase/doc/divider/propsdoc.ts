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
                        <td>align</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Alignment of the content, options are "left", "center", "right" for horizontal layout and "top", "center", "bottom" for vertical.</td>
                    </tr>
                    <tr>
                        <td>layout</td>
                        <td>string</td>
                        <td>horizontal</td>
                        <td>Specifies the orientation, valid values are "horizontal" and "vertical".</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>String</td>
                        <td>solid</td>
                        <td>Border style type, default is "solid" and other options are "dashed" and "dotted".</td>
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
