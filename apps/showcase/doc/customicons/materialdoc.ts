import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'material-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p><a href="https://fonts.google.com/icons">Material icons</a> is the official icon library based on Google Material Design.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class MaterialDoc {
    code: Code = {
        basic: `<p-select>
    <ng-template #dropdownicon>
        <span class="material-icons">arrow_drop_down</span>
    </ng-template>
</p-select>`
    };
}
