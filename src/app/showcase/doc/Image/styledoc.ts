import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-3">
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
                        <td>p-image</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-image-preview-container</td>
                        <td>Container element with preview enabled.</td>
                    </tr>
                    <tr>
                        <td>p-image-preview-indicator</td>
                        <td>Mask layer over the image when hovered.</td>
                    </tr>
                    <tr>
                        <td>p-image-preview-icon</td>
                        <td>Icon of the preview indicator.</td>
                    </tr>
                    <tr>
                        <td>p-image-mask</td>
                        <td>Preview overlay container.</td>
                    </tr>
                    <tr>
                        <td>p-image-toolbar</td>
                        <td>Transformation options container.</td>
                    </tr>
                    <tr>
                        <td>p-image-action</td>
                        <td>An element inside the toolbar.</td>
                    </tr>
                    <tr>
                        <td>p-image-preview</td>
                        <td>Image element inside the preview overlay.</td>
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
