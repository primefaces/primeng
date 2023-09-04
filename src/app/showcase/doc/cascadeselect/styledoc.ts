import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['/theming']">theming</a> page.</p>
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
                            <td>p-cascadeselect</td>
                            <td>Container element.</td>
                        </tr>
                        <tr>
                            <td>p-cascadeselect-label</td>
                            <td>Element to display label of selected option.</td>
                        </tr>
                        <tr>
                            <td>p-cascadeselect-trigger</td>
                            <td>Icon element.</td>
                        </tr>
                        <tr>
                            <td>p-cascadeselect-panel</td>
                            <td>Icon element.</td>
                        </tr>
                        <tr>
                            <td>p-cascadeselect-items-wrapper</td>
                            <td>Wrapper element of items list.</td>
                        </tr>
                        <tr>
                            <td>p-cascadeselect-items</td>
                            <td>List element of items.</td>
                        </tr>
                        <tr>
                            <td>p-cascadeselect-item</td>
                            <td>An item in the list.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    </section>`
})
export class StyleDoc {
    @Input() id: string;

    @Input() title: string;
}
