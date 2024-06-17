import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'fontawesome-doc',
    template: `
        <app-docsectiontext>
            <p><a href="https://fontawesome.com/">Font Awesome</a> is a popular icon library with a wide range of icons.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class FontAwesomeDoc {
    code: Code = {
        basic: `<p-dropdown>
    <ng-template pTemplate="dropdownicon">
        <i class="fa-light fa-chevron-down"></i>
    </ng-template>
</p-dropdown>`
    };
}
