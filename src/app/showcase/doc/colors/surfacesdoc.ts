import { Component } from '@angular/core';

@Component({
    selector: 'surfaces-doc',
    template: `
        <app-docsectiontext>
            <p>Surface palette is used when designing the layers such as headers, content, footers, overlays and dividers. Surface palette varies between 0 - 900 and named surfaces are also available.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="color-stack">
                <div *ngFor="let shade of shades">
                    <div class="color-box" [ngStyle]="{ backgroundColor: 'var(--surface-' + shade + ')', color: shade < 600 ? 'var(--surface-900)' : 'var(--surface-0)' }">surface-{{ shade }}</div>
                </div>
            </div>
        </div>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Variable</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>--surface-ground</td>
                        <td>Base ground color.</td>
                    </tr>
                    <tr>
                        <td>--surface-section</td>
                        <td>Background color of a section on a ground surface.</td>
                    </tr>
                    <tr>
                        <td>--surface-card</td>
                        <td>Color of a surface used as a card.</td>
                    </tr>
                    <tr>
                        <td>--surface-overlay</td>
                        <td>Color of overlay surfaces.</td>
                    </tr>
                    <tr>
                        <td>--surface-border</td>
                        <td>Color of a divider.</td>
                    </tr>
                    <tr>
                        <td>--surface-hover</td>
                        <td>Color of an element in hover state.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    styles: [
        `
            .color-stack {
                display: flex;
                flex-direction: column;
            }

            .color-box {
                width: 2.5rem;
                display: flex;
                align-items: center;
                padding: 1rem;
                width: 250px;
                font-weight: bold;
            }

            .sample-layout {
                width: 375px;
            }
        `
    ]
})
export class SurfacesDoc {
    colors: string[] = ['blue', 'green', 'yellow', 'cyan', 'pink', 'indigo', 'red', 'teal', 'orange', 'bluegray', 'purple', 'gray', 'primary'];

    shades: number[] = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
}
