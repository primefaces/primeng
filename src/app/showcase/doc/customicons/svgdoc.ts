import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'svg-doc',
    template: `
        <app-docsectiontext>
            <p>Inline SVGs are embedded inside the dom.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class SVGDoc {
    code: Code = {
        basic: `<p-dropdown>
    <ng-template pTemplate="dropdownicon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g id="chevron-down">
                <path d="M12,15.25a.74.74,0,0,1-.53-.22l-5-5A.75.75,0,0,1,7.53,9L12,13.44,16.47,9A.75.75,0,0,1,17.53,10l-5,5A.74.74,0,0,1,12,15.25Z"/>
            </g>
        </svg>
    </ng-template>
</p-dropdown>`
    };
}
