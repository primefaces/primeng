import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'material-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p><a href="https://fonts.google.com/icons">Material icons</a> is the official icon library based on Google Material Design.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class MaterialDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `<p-dropdown>
    <ng-template pTemplate="dropdownicon">
        <span class="material-icons">arrow_drop_down</span>
    </ng-template>
</p-dropdown>`
    };
}
