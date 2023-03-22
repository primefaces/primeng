import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'spin-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Special <i>pi-spin</i> class applies infinite rotation to an icon.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-3">
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            <i class="pi pi-spin pi-cog" style="font-size: 2rem"></i>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class SpinDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `<i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
<i class="pi pi-spin pi-cog" style="font-size: 2rem"></i>`
    };
}
