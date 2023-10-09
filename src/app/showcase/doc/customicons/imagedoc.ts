import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'image-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Any type of image can be used as an icon.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class ImageDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `<p-dropdown>
    <ng-template pTemplate="dropdownicon">
        <img alt="dropdown icon" src="/assets/icons/arrow_down.png">
    </ng-template>
</p-dropdown>`
    };
}
