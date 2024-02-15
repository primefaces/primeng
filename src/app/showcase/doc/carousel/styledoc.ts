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
                        <td>p-carousel</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-carousel-header</td>
                        <td>Header section.</td>
                    </tr>
                    <tr>
                        <td>p-carousel-footer</td>
                        <td>Footer section.</td>
                    </tr>
                    <tr>
                        <td>p-carousel-content</td>
                        <td>Main content element. It contains the container of the viewport.</td>
                    </tr>
                    <tr>
                        <td>p-carousel-container</td>
                        <td>Container of the viewport. It contains navigation buttons and viewport.</td>
                    </tr>
                    <tr>
                        <td>p-carousel-items-content</td>
                        <td>Viewport.</td>
                    </tr>
                    <tr>
                        <td>p-carousel-dots-container</td>
                        <td>Container of the paginator.</td>
                    </tr>
                    <tr>
                        <td>p-carousel-dot-item</td>
                        <td>Paginator element.</td>
                    </tr>
                    <tr>
                        <td>p-carousel-dot-icon</td>
                        <td>Paginator element icon.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {}
