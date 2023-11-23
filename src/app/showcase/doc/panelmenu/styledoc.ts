import { Component } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` 
        <app-docsectiontext>
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
                        <td>p-panelmenu</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-panelmenu-header</td>
                        <td>Accordion header of root submenu.</td>
                    </tr>
                    <tr>
                        <td>p-panelmenu-content</td>
                        <td>Accordion content of root submenu.</td>
                    </tr>
                    <tr>
                        <td>p-menu-list</td>
                        <td>List element.</td>
                    </tr>
                    <tr>
                        <td>p-menuitem</td>
                        <td>Menuitem element.</td>
                    </tr>
                    <tr>
                        <td>p-menuitem-text</td>
                        <td>Label of a menuitem.</td>
                    </tr>
                    <tr>
                        <td>p-menuitem-icon</td>
                        <td>Icon of a menuitem.</td>
                    </tr>
                    <tr>
                        <td>p-panelmenu-icon</td>
                        <td>Arrow icon of an accordion header.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {

}
