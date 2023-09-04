import { Component, Input } from '@angular/core';

@Component({
    selector: 'avatarstyle-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Following is the list of structural style classes, for theming classes visit <a routerLink="/theming"> theming</a> page.</p>
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
                        <td>p-avatar</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-avatar-image</td>
                        <td>Container element in image mode.</td>
                    </tr>
                    <tr>
                        <td>p-avatar-circle</td>
                        <td>Container element with a circle shape.</td>
                    </tr>
                    <tr>
                        <td>p-avatar-text</td>
                        <td>Text of the Avatar.</td>
                    </tr>
                    <tr>
                        <td>p-avatar-icon</td>
                        <td>Icon of the Avatar.</td>
                    </tr>
                    <tr>
                        <td>p-avatar-lg</td>
                        <td>Container element with a large size.</td>
                    </tr>
                    <tr>
                        <td>p-avatar-xl</td>
                        <td>Container element with an xlarge size.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class AvatarStyleDoc {
    @Input() id: string;

    @Input() title: string;
}
