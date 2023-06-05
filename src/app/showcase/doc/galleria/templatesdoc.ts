import { Component, Input } from '@angular/core';

@Component({
    selector: 'templates-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"> </app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>header</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>footer</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>item</td>
                        <td>$implicit: item</td>
                    </tr>
                    <tr>
                        <td>caption</td>
                        <td>$implicit: item</td>
                    </tr>
                    <tr>
                        <td>indicator</td>
                        <td>$implicit: index of the item</td>
                    </tr>
                    <tr>
                        <td>thumbnail</td>
                        <td>$implicit: item</td>
                    </tr>
                    <tr>
                        <td>closeicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>itemnexticon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>itempreviousicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>previousthumbnailicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>nextthumbnailicon</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class TemplatesDoc {
    @Input() id: string;

    @Input() title: string;
}
