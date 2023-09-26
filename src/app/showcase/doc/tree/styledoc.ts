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
                        <td>p-tree</td>
                        <td>Main container element</td>
                    </tr>
                    <tr>
                        <td>p-tree-horizontal</td>
                        <td>Main container element in horizontal mode</td>
                    </tr>
                    <tr>
                        <td>p-tree-container</td>
                        <td>Container of nodes</td>
                    </tr>
                    <tr>
                        <td>p-treenode</td>
                        <td>A treenode element</td>
                    </tr>
                    <tr>
                        <td>p-treenode-content</td>
                        <td>Content of a treenode</td>
                    </tr>
                    <tr>
                        <td>p-treenode-toggler</td>
                        <td>Toggle icon</td>
                    </tr>
                    <tr>
                        <td>p-treenode-icon</td>
                        <td>Icon of a treenode</td>
                    </tr>
                    <tr>
                        <td>p-treenode-label</td>
                        <td>Label of a treenode</td>
                    </tr>
                    <tr>
                        <td>p-treenode-children</td>
                        <td>Container element for node children</td>
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
