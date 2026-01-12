import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'fontawesome-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
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
    <ng-template #dropdownicon>
        <i class="fa-light fa-chevron-down"></i>
    </ng-template>
</p-dropdown>`
    };
}
