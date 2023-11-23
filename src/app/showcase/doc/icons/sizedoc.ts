import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'size-doc',
    template: ` 
        <app-docsectiontext>
            <p>Size of an icon is controlled with the font-size property of the element.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center align-items-center gap-3">
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
