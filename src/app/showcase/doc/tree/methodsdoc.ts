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
                        <td>resetFilter</td>
                        <td>-</td>
                        <td>Resets filtering.</td>
                    </tr>
                    <tr>
                        <td>_filter</td>
                        <td>value: string</td>
                        <td>Applies filter by given value.</td>
                    </tr>
                    <tr>
                        <td>scrollToVirtualIndex</td>
                        <td>index</td>
                        <td>Scrolls to the node with the given index when virtual scrolling is enabled.</td>
                    </tr>
                    <tr>
                        <td>scrollTo</td>
                        <td>
                            options.left: Specifies the number of pixels along the X axis<br />
                            options.top: Specifies the number of pixels along the Y axis<br />
                            options.behavior: Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto).
                        </td>
                        <td>Scrolls to a position of a scrollable tree viewport.</td>
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
