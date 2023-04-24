import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Paginator is used as a controlled component with <i>first</i>, <i>rows</i> and <i>onPageChange</i> properties to manage the first index and number of records to display per page. Total number of records need to be with
                <i>totalRecords</i> property. Default template includes a dropdown to change the <i>rows</i> so <i>rowsPerPageOptions</i> is also necessary for the dropdown options.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
        </div>
        <app-code [code]="code" selector="paginator-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    first: number = 0;

    rows: number = 10;

    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
    }

    code: Code = {
        basic: `
<p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>`,

        html: `
<div class="card flex justify-content-center">
    <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'paginator-basic-demo',
    templateUrl: './paginator-basic-demo.html'
})
export class PaginatorBasicDemo {
    first: number = 0;

    rows: number = 10;

    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
    }
}`
    };
}
