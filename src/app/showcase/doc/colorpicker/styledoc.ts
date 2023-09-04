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
                        <td>p-colorpicker</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-colorpicker-overlay</td>
                        <td>Container element in overlay mode.</td>
                    </tr>
                    <tr>
                        <td>p-colorpicker-preview</td>
                        <td>Preview input in overlay mode.</td>
                    </tr>
                    <tr>
                        <td>p-colorpicker-panel</td>
                        <td>Panel element of the colorpicker.</td>
                    </tr>
                    <tr>
                        <td>p-colorpicker-content</td>
                        <td>Wrapper that contains color and hue sections.</td>
                    </tr>
                    <tr>
                        <td>p-colorpicker-color-selector</td>
                        <td>Color selector container.</td>
                    </tr>
                    <tr>
                        <td>p-colorpicker-color</td>
                        <td>Color element.</td>
                    </tr>
                    <tr>
                        <td>p-colorpicker-color-handle</td>
                        <td>Handle of the color element.</td>
                    </tr>
                    <tr>
                        <td>p-colorpicker-hue</td>
                        <td>Hue slider.</td>
                    </tr>
                    <tr>
                        <td>p-colorpicker-hue-handle</td>
                        <td>Handle of the hue slider.</td>
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
