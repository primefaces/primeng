import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'locale-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Localization information such as page numbers and rows per page options are defined with the <i>locale</i> property which defaults to the user locale.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-user">User Locale</label>
                <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-us">United States Locale</label>
                <p-paginator locale="en-US" (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
            </div>
            <div class="flex-auto">
                <label class="block font-bold mb-2" for="locale-indian">Persian Locale</label>
                <p-paginator locale="fa-IR" (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
            </div>
        </div>
        <app-code [code]="code" selector="paginator-locale-demo"></app-code>
    </section>`
})
export class LocaleDoc {
    @Input() id: string;

    @Input() title: string;

    first: number = 0;

    rows: number = 10;

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }

    code: Code = {
        basic: `
<div class="flex-auto">
    <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
</div>
<div class="flex-auto">
    <p-paginator locale="en-US" (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
</div>
<div class="flex-auto">
    <p-paginator locale="fa-IR" (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
</div>
`,

        html: `
<div class="card flex justify-content-center">
    <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
</div>
<div class="card flex justify-content-center">
    <p-paginator locale="en-US" (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
</div>
<div class="card flex justify-content-center">
    <p-paginator locale="fa-IR" (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"></p-paginator>
</div>
`,

        typescript: `
import { Component } from '@angular/core';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'paginator-locale-demo',
    templateUrl: './paginator-locale-demo.html'
})
export class PaginatorLocaleDemo {
    first: number = 0;

    rows: number = 10;

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }
}`
    };
}
