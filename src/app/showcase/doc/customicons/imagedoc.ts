import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'image-doc',
    template: `
        <app-docsectiontext>
            <p>Any type of image can be used as an icon.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ImageDoc {
    code: Code = {
        basic: `<p-dropdown>
    <ng-template pTemplate="dropdownicon">
        <img alt="dropdown icon" src="/assets/icons/arrow_down.png">
    </ng-template>
</p-dropdown>`
    };
}
