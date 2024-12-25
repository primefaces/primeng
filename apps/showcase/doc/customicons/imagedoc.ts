import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'image-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Any type of image can be used as an icon.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ImageDoc {
    code: Code = {
        basic: `<p-select>
    <ng-template #dropdownicon>
        <img alt="dropdown icon" src="/assets/icons/arrow_down.png">
    </ng-template>
</p-select>`
    };
}
