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
                    <tr>
                        <td>strokeWidth</td>
                        <td>string</td>
                        <td>2</td>
                        <td>Width of the circle stroke.</td>
                    </tr>
                    <tr>
                        <td>fill</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Color for the background of the circle.</td>
                    </tr>
                    <tr>
                        <td>animationDuration</td>
                        <td>string</td>
                        <td>2s</td>
                        <td>Duration of the rotate animation.</td>
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
