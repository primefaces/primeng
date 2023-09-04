import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'fontawesome-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p><a href="https://fontawesome.com/">Font Awesome</a> is a popular icon library with a wide range of icons.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class FontAwesomeDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `<p-dropdown>
    <ng-template pTemplate="dropdownicon">
        <i class="fa-light fa-chevron-down"></i>
    </ng-template>
</p-dropdown>`
    };
}
