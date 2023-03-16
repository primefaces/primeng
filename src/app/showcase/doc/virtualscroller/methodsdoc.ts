import { Component, Input } from '@angular/core';

@Component({
    selector: 'methods-doc',
    template: ` <div>
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
                        <td>scrollToIndex</td>
                        <td>
                            index: Index of the item.<br />
                            mode: Scroll mode e.g. 'auto' or 'smooth'
                        </td>
                        <td>Scrolls to the item with the given index.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class MethodsDoc {
    @Input() id: string;

    @Input() title: string;
}
