import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'color-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Icon color is defined with the <i>color</i> property which is inherited from parent by default.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-3">
            <i class="pi pi-check" style="color: slateblue"></i>
            <i class="pi pi-times" style="color: green"></i>
            <i class="pi pi-search" style="color: 'var(--primary-color)'"></i>
            <i class="pi pi-user" style="color: #708090"></i>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class ColorDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `<i class="pi pi-check" style="color: slateblue"></i>
<i class="pi pi-times" style="color: green"></i>
<i class="pi pi-search" style="color: 'var(--primary-color)'"></i>
<i class="pi pi-user" style="color: #708090"></i>`
    };
}
