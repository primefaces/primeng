import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'overview-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Colors are exported as CSS variables and used with the standard <i>var</i> syntax such as <i>var(--text-color)</i>. Following is the list of general variables used in a theme.</p>
        </app-docsectiontext>
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
                        <td>--text-color</td>
                        <td>Font text color.</td>
                    </tr>
                    <tr>
                        <td>--text-secondary-color</td>
                        <td>Muted font text color with a secondary level.</td>
                    </tr>
                    <tr>
                        <td>--primary-color</td>
                        <td>Primary color of the theme.</td>
                    </tr>
                    <tr>
                        <td>--primary-color-text</td>
                        <td>Text color when background is primary color.</td>
                    </tr>
                    <tr>
                        <td>--font-family</td>
                        <td>Font family of the theme.</td>
                    </tr>
                    <tr>
                        <td>--inline-spacing</td>
                        <td>Spacing between to adjacent items.</td>
                    </tr>
                    <tr>
                        <td>--border-radius</td>
                        <td>Common border radius of elements.</td>
                    </tr>
                    <tr>
                        <td>--focus-ring</td>
                        <td>Box shadow of a focused element.</td>
                    </tr>
                    <tr>
                        <td>--mask-bg</td>
                        <td>Background of an overlay mask.</td>
                    </tr>
                    <tr>
                        <td>--highlight-bg</td>
                        <td>Background of a highlighted element.</td>
                    </tr>
                    <tr>
                        <td>--highlight-text-color</td>
                        <td>Text color of a highlighted element.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card flex justify-content-center gap-3 text-center">
            <div [ngStyle]="{ backgroundColor: 'var(--highlight-bg)', color: 'var(--highlight-text-color)', borderRadius: 'var(--border-radius)', padding: '3rem' }">Highlighted Item</div>
            <div [ngStyle]="{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)', borderRadius: 'var(--border-radius)', padding: '3rem' }">Primary Color</div>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class OverviewDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `<div [ngStyle]="{backgroundColor:'var(--highlight-bg)', color: 'var(--highlight-text-color)', borderRadius: 'var(--border-radius)', padding: '3rem'}">Highlighted Item</div>
<div [ngStyle]="{backgroundColor:'var(--primary-color)', color: 'var(--primary-color-text)', borderRadius: 'var(--border-radius)', padding: '3rem'}">Primary Color</div>`
    };
}
