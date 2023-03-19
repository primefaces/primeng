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
                        <td>legend</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Header text of the fieldset.</td>
                    </tr>
                    <tr>
                        <td>toggleable</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified, content can toggled by clicking the legend.</td>
                    </tr>
                    <tr>
                        <td>collapsed</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines the default visibility state of the content.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the fieldset.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the fieldset.</td>
                    </tr>
                    <tr>
                        <td>transitionOptions</td>
                        <td>string</td>
                        <td>400ms cubic-bezier(0.86, 0, 0.07, 1)</td>
                        <td>Transition options of the animation.</td>
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
