import { Component } from '@angular/core';

@Component({
    selector: 'compatibility-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The compatible versions to choose the correct combination.</p>
            <div class="doc-tablewrapper">
                <table class="doc-table">
                    <tbody>
                        <tr>
                            <td>PrimeNG v18 and newer</td>
                            <td>PrimeFlex v4</td>
                        </tr>
                        <tr>
                            <td>PrimeNG v17 and older</td>
                            <td>PrimeFlex v3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    `
})
export class CompatibilityDoc {}
