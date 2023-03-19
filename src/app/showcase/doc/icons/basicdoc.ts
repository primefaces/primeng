import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>PrimeIcons use the <i>pi pi-&#123;icon&#125;</i> syntax such as <i>pi pi-check</i>. A standalone icon can be displayed using an element such as <i>i</i> or <i>span</i></p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-3">
            <i class="pi pi-check"></i>
            <i class="pi pi-times"></i>
            <span class="pi pi-search"></span>
            <span class="pi pi-user"></span>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<i class="pi pi-check"></i>
<i class="pi pi-times"></i>
<span class="pi pi-search"></span>
<span class="pi pi-user"></span>`
    };
}
