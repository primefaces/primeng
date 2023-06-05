import { Component, Input } from '@angular/core';

@Component({
    selector: 'avatarprops-doc',
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
                        <td>label</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines the text to display.</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines the icon to display.</td>
                    </tr>
                    <tr>
                        <td>image</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines the image to display.</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Size of the element, valid options are "large" and "xlarge".</td>
                    </tr>
                    <tr>
                        <td>shape</td>
                        <td>string</td>
                        <td>square</td>
                        <td>Shape of the element, valid options are "square" and "circle".</td>
                    </tr>
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
                </tbody>
            </table>
        </div>
    </section>`
})
export class AvatarPropsDoc {
    @Input() id: string;

    @Input() title: string;
}
