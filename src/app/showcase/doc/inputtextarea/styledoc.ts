import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Element</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>p-inputtextarea</td>
                        <td>Textarea element</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class StyleDoc {
    @Input() id: string;

    @Input() title: string;
}
