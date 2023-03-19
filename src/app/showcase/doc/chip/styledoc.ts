import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section>
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
                        <td>p-chip</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-chip-image</td>
                        <td>Container element in image mode.</td>
                    </tr>
                    <tr>
                        <td>p-chip-text</td>
                        <td>Text of the chip.</td>
                    </tr>
                    <tr>
                        <td>pi-chip-remove-icon</td>
                        <td>Remove icon.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class StyleDoc {
    @Input() id: string;

    @Input() title: string;
}
