import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'fontawesome-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p><a href="https://fontawesome.com/">Font Awesome</a> is a popular icon library with a wide range of icons.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class FontAwesomeDoc {
    code: Code = {
        basic: `<p-select>
    <ng-template #dropdownicon>
        <i class="fa-light fa-chevron-down"></i>
    </ng-template>
</p-select>`
    };
}
