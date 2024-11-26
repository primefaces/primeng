import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'size-doc',
    template: `
        <app-docsectiontext>
            <p>Size of an icon is controlled with the font-size property of the element.</p>
        </app-docsectiontext>
        <div class="card flex justify-center items-center gap-4">
            <i class="pi pi-check" style="font-size: 1rem"></i>
            <i class="pi pi-times" style="font-size: 1.5rem"></i>
            <i class="pi pi-search" style="font-size: 2rem"></i>
            <i class="pi pi-user" style="font-size: 2.5rem"></i>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class SizeDoc {
    code: Code = {
        basic: `<i class="pi pi-check" style="font-size: 1rem"></i>
<i class="pi pi-times" style="font-size: 1.5rem"></i>
<i class="pi pi-search" style="font-size: 2rem"></i>
<i class="pi pi-user" style="font-size: 2.5rem"></i>`
    };
}
