import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['/theming']">theming</a> page.</p>
        </app-docsectiontext>
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
                        <td>p-galleria</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-galleria-header</td>
                        <td>Header section.</td>
                    </tr>
                    <tr>
                        <td>p-galleria-footer</td>
                        <td>Footer section.</td>
                    </tr>
                    <tr>
                        <td>p-galleria-item-wrapper</td>
                        <td>Preview content element. It contains preview and indicator containers.</td>
                    </tr>
                    <tr>
                        <td>p-galleria-item-container</td>
                        <td>Container of the preview content. It contains navigation buttons, preview item and caption content.</td>
                    </tr>
                    <tr>
                        <td>p-galleria-indicators</td>
                        <td>Container of the indicators. It contains indicator items.</td>
                    </tr>
                    <tr>
                        <td>p-galleria-thumbnail-wrapper</td>
                        <td>Thumbnail content element.</td>
                    </tr>
                    <tr>
                        <td>p-galleria-thumbnail-container</td>
                        <td>Container of the thumbnail content. It contains navigation buttons and thumbnail items.</td>
                    </tr>
                    <tr>
                        <td>p-galleria-caption</td>
                        <td>Content of the preview caption.</td>
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
