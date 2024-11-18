import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'spin-doc',
    template: `
        <app-docsectiontext>
            <p>Special <i>pi-spin</i> class applies infinite rotation to an icon.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            <i class="pi pi-spin pi-cog" style="font-size: 2rem"></i>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class SpinDoc {
    code: Code = {
        basic: `<i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
<i class="pi pi-spin pi-cog" style="font-size: 2rem"></i>`
    };
}
