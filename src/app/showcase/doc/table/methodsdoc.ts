import { Component, Input } from '@angular/core';

@Component({
    selector: 'methods-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>reset</td>
                        <td>-</td>
                        <td>Resets sort, filter and paginator state.</td>
                    </tr>
                    <tr>
                        <td>clearState</td>
                        <td>-</td>
                        <td>Clears table state.</td>
                    </tr>
                    <tr>
                        <td>exportCSV</td>
                        <td>config?.selectionOnly: Exports only the selection.</td>
                        <td>Exports the data in csv format.</td>
                    </tr>
                    <tr>
                        <td>resetScrollTop</td>
                        <td>-</td>
                        <td>Resets the scrollable table scroll position to the beginning.</td>
                    </tr>
                    <tr>
                        <td>scrollToVirtualIndex</td>
                        <td>index</td>
                        <td>Scrolls to the row with the given index when virtual scrolling is enabled.</td>
                    </tr>
                    <tr>
                        <td>scrollTo</td>
                        <td>
                            options.left: Specifies the number of pixels along the X axis<br />
                            options.top: Specifies the number of pixels along the Y axis<br />
                            options.behavior: Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto).
                        </td>
                        <td>Scrolls to a position of a scrollable table viewport.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class MethodsDoc {
    @Input() id: string;

    @Input() title: string;
}
