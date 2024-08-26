import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>PrimeIcons use the <i>pi pi-&#123;icon&#125;</i> syntax such as <i>pi pi-check</i>. A standalone icon can be displayed using an element such as <i>i</i> or <i>span</i></p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <i class="pi pi-check"></i>
            <i class="pi pi-times"></i>
            <span class="pi pi-search"></span>
            <span class="pi pi-user"></span>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<i class="pi pi-check"></i>
<i class="pi pi-times"></i>
<span class="pi pi-search"></span>
<span class="pi pi-user"></span>`
    };
}
